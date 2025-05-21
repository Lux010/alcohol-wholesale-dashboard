import dotenv from "dotenv";
dotenv.config();

// Environment Config
const NODE_ENV = process.env.NODE_ENV || "local";
const LOG_LEVEL = process.env.LOG_LEVEL || "debug";

const ENV = {
  nodeEnv: NODE_ENV,
  logLevel: LOG_LEVEL,
};

// Auth Config
const JWT_KEY = process.env.JWT_KEY || "random";

const AUTH = {
  jwt: JWT_KEY,
};

// MySQL Config
const MYSQL_HOST = process.env.MYSQL_HOST || "localhost";
const MYSQL_DATABASE = process.env.MYSQL_DATABASE || "WLS-DB";
const MYSQL_USER = process.env.MYSQL_USER || "root";
const MYSQL_PASS = process.env.MYSQL_PASSWORD || "password";
const MYSQL_CONN_LIMIT = process.env.MYSQL_CONNECTION_LIMIT || 100;

const MYSQL = {
  host: MYSQL_HOST,
  database: MYSQL_DATABASE,
  user: MYSQL_USER,
  pass: MYSQL_PASS,
  connectionLimit: MYSQL_CONN_LIMIT,
  multipleStatements: true,
};

// Server config
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
const SERVER_PORT = process.env.SERVER_PORT || 8080;

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
};

const config = {
  env: ENV,
  auth: AUTH,
  mysql: MYSQL,
  server: SERVER,
};

export default config;
