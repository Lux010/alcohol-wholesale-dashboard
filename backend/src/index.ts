import { app, server, io } from "./app";
import config from "./config/config";
import { mysqlService } from "common";
import { natsWrapper } from "./config/nats-wrapper";
import { FileImportedListener } from "./events/listeners/file-imported-listener";
import { logger } from "common";
import { DealsLoadedListener } from "./events/listeners/deals-loaded-listener";
import { JobCompletedListener } from "./events/listeners/job-completed-listener";
import { SystemNotificationListener } from "./events/listeners/system-notification-listener";
import { SystemActionListener } from "./events/listeners/system-action-listener";
import { Socket } from "socket.io";
import { getMapKeyByValue } from "./utilities/getMapKeyByValue";

const start = async () => {
  logger.info("Starting...");
  logger.info("Config:", config);
  try {
    await natsWrapper.connect(
      config.nats.clusterId,
      config.nats.clientId,
      config.nats.url
    );
    natsWrapper.client.on("close", () => {
      logger.info("NATS connection closed!");
      process.exit();
    });

    new DealsLoadedListener(natsWrapper.client).listen();
    new FileImportedListener(natsWrapper.client).listen();
    new JobCompletedListener(natsWrapper.client).listen();
    new SystemNotificationListener(natsWrapper.client).listen();
    new SystemActionListener(natsWrapper.client).listen();

    // Connect to MySQL
    const params = {
      user: config.mysql.user,
      password: config.mysql.pass,
      host: config.mysql.host,
      database: config.mysql.database,
      connectionLimit: config.mysql.connectionLimit,
      multipleStatements: config.mysql.multipleStatements,
    };
    await mysqlService.connect(params);

    const userSockets = new Map();
    io.on("connection", (socket: Socket) => {
      logger.info("New client connected " + socket.id);

      // Socket session manager for concurrent session handler
      socket.on("user_connect", (user_id) => {
        // Disconnect existing socket for this user
        console.log(
          `User(${user_id}) connected via socket session manager! ${socket.id}`
        );
        const existingSocketId = userSockets.get(user_id);
        if (existingSocketId) {
          if (existingSocketId === socket.id) {
            return;
          }
          const existingSocket = io.sockets.sockets.get(existingSocketId);
          if (existingSocket) {
            existingSocket.emit("force_logout", { user_id });
            existingSocket.disconnect(true);
          }
        } else {
          // Store new socket
          userSockets.set(user_id, socket.id);
        }

        // Handle disconnection
        socket.on("disconnect", () => {
          if (userSockets.get(user_id) === socket.id) {
            userSockets.delete(user_id);
          }
          console.log(
            `User(${user_id}) disconnected via socket session manager!`
          );
        });
      });

      // disconnect is fired when a client leaves the server
      socket.on("disconnect", () => {
        // remove user from userSockets associated with this socket
        const user_id = getMapKeyByValue(userSockets, socket.id);
        if (user_id) {
          userSockets.delete(user_id);
          logger.info(
            `User(${user_id}) disconnected via client leaving the server!`
          );
        }
      });
    });

    server.listen(config.server.port, () => {
      logger.info(`Listening on port ${config.server.port}!!`);
    });

    process.on("SIGINT", () => {
      logger.info("SIGINT signal received.");
      logger.info("Closing http server.");
      server.close((err: any) => {
        logger.info("Http server closed.");
        process.exit(err ? 1 : 0);
      });
      natsWrapper.client.close();
    });
    process.on("SIGTERM", () => {
      logger.info("SIGTERM signal received.");
      logger.info("Closing http server.");
      server.close((err: any) => {
        logger.info("Http server closed.");
        process.exit(err ? 1 : 0);
      });
      natsWrapper.client.close();
    });
  } catch (err) {
    if (err instanceof Error) {
      logger.error(err.stack);
    }
  }
};

start();
