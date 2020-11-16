import { Model, DataTypes } from "sequelize";
import { database } from "../config/database";

export class Tour extends Model {
    public id!: number;
    public name!: string;
    public description!: string;
  }

Tour.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  }
  ,
  {
    tableName: "tours",
    sequelize: database, // this determines the DB you will connect to.
  }
)
 

export interface TourInterface {
  name: string,
  description: string;
}