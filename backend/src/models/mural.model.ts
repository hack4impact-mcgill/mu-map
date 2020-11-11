import { Model, DataTypes } from "sequelize";
import { database } from "../config/database";

// Example of how to make a model with the sequelize ORM.
// Obviously we will have to scrap / modify this as the requirements get clearer.
// Definitely consider making stuff like neighbourhood its own model, but idk if its required for what we need
export class Mural extends Model {
  public id!: number;
  public name!: string;
  public artist!: string;
  public year!: number;
  public address!: string;
  public city!: string;
  public borough!: string;
  public neighbourhood!: string;
  public description!: string;
  public partners!: string[];
  public assistants!: string[];
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
    artist: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    year: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    city: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    borough: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    neighbourhood: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    partners: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true,
    },
    assistants: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: true,
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
  artist: string;
  year: number;
  address: string;
  city: string;
  borough?: string;
  neighbourhood?: string;
  description?: string;
  partners?: string[];
  assistants?: string[];
}
