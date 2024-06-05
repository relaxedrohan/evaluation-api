import * as dotenv from "dotenv";
dotenv.config();

export const envConfig = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
};
