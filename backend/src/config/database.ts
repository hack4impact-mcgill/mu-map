import { Sequelize } from "sequelize";

// TODO actually set up a database to connect to...
export const database = new Sequelize('postgres://user:pass@example.com:5432/dbname');