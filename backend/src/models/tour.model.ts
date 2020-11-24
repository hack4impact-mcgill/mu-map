import {
  Model,
  DataTypes,
  BelongsToManyCountAssociationsMixin,
  Association,
  BelongsToManyAddAssociationMixin,
  BelongsToManyCreateAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyHasAssociationMixin,
} from "sequelize";
import { Mural } from "./mural.model";
import { database } from "../config/database";

export class Tour extends Model {
  public id!: number;
  public name!: string;
  public description!: string;

  //pure virtual functions so that typescript can detect sequelize's magical runtime association functions at compile time.
  public getMurals!: BelongsToManyGetAssociationsMixin<Mural>;
  public addMural!: BelongsToManyAddAssociationMixin<Mural, number>;
  public hasMural!: BelongsToManyHasAssociationMixin<Mural, number>;
  public countMurals!: BelongsToManyCountAssociationsMixin;
  public createMural!: BelongsToManyCreateAssociationMixin<Mural>;

  public readonly murals?: Mural[];

  public static associations: {
    murals: Association<Tour, Mural>;
  };
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
    },
  },
  {
    tableName: "tours",
    sequelize: database, // this determines the DB you will connect to.
  }
);

export interface TourInterface {
  name: string;
  description: string;
}
