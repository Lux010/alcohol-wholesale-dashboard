// import express from "express";
// import "express-async-errors";
// import http from "http";
// import { Server } from "socket.io";
// import { json } from "body-parser";
// import cookieSession from "cookie-session";
// import cookieParser from "cookie-parser";
// import { authController } from "./controllers/auth-controller";
// import { userController } from "./controllers/user-controller";
// import { roleController } from "./controllers/role-controller";
// import { permissionController } from "./controllers/permission-controller";
// import { uploadController } from "./controllers/upload-controller";
// import { downloadController } from "./controllers/download-controller";

// const app = express();
// app.set("trust proxy", true);
// app.use(json());
// app.use(
//   cookieSession({
//     signed: false,
//     secure: process.env.NODE_ENV != "test",
//   })
// );

// app.use(cookieParser("secret"));

// app.use(currentUser);

// app.use(authController);
// app.use(userController);
// app.use(roleController);
// app.use(permissionController);
// app.use(uploadController);
// app.use(generalController);

// app.all("*", async () => {
//   throw new NotFoundError("Route Not Found!");
// });

// app.use(errorHandler);

// // Setup Server and Socket instance then Export #
// const server = http.createServer(app);
// const io = new Server(server, {
//   path: "/api/socket.io",
// });

// export { app, server, io };
