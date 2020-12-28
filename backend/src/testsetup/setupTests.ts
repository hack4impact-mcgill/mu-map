import { database } from "../config/database";
import { MuralCollection } from "../models/muralcollection.model";
import { Tour } from "../models/tour.model";
import { Mural } from "../models/mural.model";
import { Borough } from "../models/borough.model";
import { Artist } from "../models/artist.model";

beforeAll(async () => {
  await database.query("CREATE EXTENSION IF NOT EXISTS postgis");
  Mural.belongsTo(Borough, {
    foreignKey: { allowNull: false, name: "boroughId" },
  });
  Mural.belongsTo(Artist, {
    foreignKey: { allowNull: false, name: "artistId" },
  });
  Mural.belongsToMany(MuralCollection, {
    foreignKey: "muralId",
    through: "murals_in_collection",
    as: "collections",
  });
  MuralCollection.belongsToMany(Mural, {
    foreignKey: "collectionId",
    through: "murals_in_collection",
    as: "murals",
  });
  Mural.belongsToMany(Tour, {
    foreignKey: "muralId",
    through: "murals_in_tour",
    as: "tours",
  });
  Tour.belongsToMany(Mural, {
    foreignKey: "tourId",
    through: "murals_in_tour",
    as: "murals",
  });
});

afterAll(async () => {
  await database.close();
});
