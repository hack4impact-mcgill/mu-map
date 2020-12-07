import {
  Model,
  DataTypes,
  BelongsToManyCountAssociationsMixin,
  BelongsToManyAddAssociationMixin,
  BelongsToManyCreateAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyHasAssociationMixin,
} from "sequelize";
import { database } from "../config/database";
import { Tour } from "./tour.model";

export class Mural extends Model {
  public id!: number;
  public name!: string;
  public year!: number;
  public address!: string;
  public city!: string;
  public neighbourhood!: string;
  public description!: string;
  public partners!: string[];
  public assistants!: string[];
  public coordinates!: any;
  public imgUrl!: string[];
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  //pure virtual functions so that typescript can detect sequelize's magical runtime association functions at compile time.
  public getTours!: BelongsToManyGetAssociationsMixin<Tour>;
  public addTour!: BelongsToManyAddAssociationMixin<Tour, number>;
  public hasTour!: BelongsToManyHasAssociationMixin<Tour, number>;
  public countTours!: BelongsToManyCountAssociationsMixin;

  public readonly tours?: Tour[];
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
    artistId: {
      type: DataTypes.INTEGER,
      references: { model: "artists", key: "id" },
    },
    boroughId: {
      type: DataTypes.INTEGER,
      references: { model: "boroughs", key: "id" },
    },
    coordinates: {
      type: DataTypes.GEOMETRY('POINT', 4326),
      allowNull: true
    },
    imgUrl: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  },
  {
    tableName: "murals",
    sequelize: database, // this determines the DB you will connect to.
  }
);

// this defines what we can see through api calls
export interface MuralInterface {
  name: string;
  artistId: number;
  year: number;
  address: string;
  city: string;
  boroughId: number;
  neighbourhood?: string;
  description?: string;
  partners?: string[];
  assistants?: string[];
  longitude?: number;
  latitude?: number;
  imgUrl?: string;
}
