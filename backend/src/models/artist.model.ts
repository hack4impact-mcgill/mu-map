import { Model, DataTypes } from "sequelize";
import { database } from "../config/database";

export class Artist extends Model {
  public id!: number;
  public name!: string;
}

Artist.init(
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
    tableName: "artists",
    sequelize: database,
  }
);

export interface ArtistInterface {
  name: string;
}
