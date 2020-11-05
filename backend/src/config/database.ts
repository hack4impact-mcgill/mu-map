import { Sequelize } from "sequelize";

//TODO properly load these variables from config or env
export const database = new Sequelize(process.env.DB_SCHEMA || 'postgres',
                                process.env.DB_USER || 'docker',
                                process.env.DB_PASSWORD || 'docker',
                                {
                                    host: process.env.DB_HOST || '192.168.99.100',
                                    port: 5301 || process.env.DB_PORT,
                                    dialect: 'postgres',
                                    dialectOptions: {
                                        ssl: process.env.DB_SSL == "true"
                                    }
                                });