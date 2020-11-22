import { Sequelize } from "sequelize";

export const database = new Sequelize(
  process.env.DB_SCHEMA || "postgres",
  process.env.DB_USER || "docker",
  process.env.DB_PASSWORD || "docker",
  {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5301,
    dialect: "postgres",
    dialectOptions: {
      ssl: { require: process.env.DB_SSL == "true", rejectUnauthorized: false },
    },
  }
);
