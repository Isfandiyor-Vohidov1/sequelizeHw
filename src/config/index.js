import { config } from "dotenv";
config();

export default {
  PORT: process.env.PORT,
  PG_HOST: process.env.PG_HOST,
  PG_PORT: +process.env.PORT,
  PG_USER: process.env.PG_USER,
  PG_PASS: process.env.PG_PASS,
  PG_DB: process.env.PG_DB,
  DB_DIALECT: "postgres"
};
