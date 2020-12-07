import { Model, DataTypes } from "sequelize";
import { database } from "../config/database";

export class Borough extends Model {
  public id!: number;
  public name!: string;
}

Borough.init(
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
  },
  {
    tableName: "boroughs",
    sequelize:   database,
  }
);

export interface BoroughInterface {
  name: string;
}
