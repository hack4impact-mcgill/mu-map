import { Sequelize, Model, DataTypes, BuildOptions } from "sequelize";
import { database } from "../config/database";

// Example of how to make a model with the sequelize ORM.
// Obviously we will have to scrap / modify this as the requirements get clearer.

export class Mural extends Model {
  public id!: number;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Mural.init(
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
      tableName: "murals",
      sequelize: database, // this determines the DB you will connect to.
    }
  );
  
  Mural.sync({ force: true }).then(() => console.log("Mural table created"));

  // this defines what we can see through api calls
  export interface MuralInterface {
      name: string;
  }