import { Borough } from "./borough.model";
import { Artist } from "./artist.model";
import { Tour } from "./tour.model";
import { Mural } from "./mural.model";
import { MuralCollection } from "./muralcollection.model";
import { database } from "../config/database";

export class AssociationSetup {
  public async sync() {
    await Mural.belongsTo(Borough, {
      foreignKey: { allowNull: false, name: "boroughId" },
    });
    await Mural.belongsTo(Artist, {
      foreignKey: { allowNull: false, name: "artistId" },
    });
    await Mural.belongsToMany(MuralCollection, {
      foreignKey: "muralId",
      through: "murals_in_collection",
      as: "collections",
    });
    await MuralCollection.belongsToMany(Mural, {
      foreignKey: "collectionId",
      through: "murals_in_collection",
      as: "murals",
    });
    await Mural.belongsToMany(Tour, {
      foreignKey: "muralId",
      through: "murals_in_tour",
      as: "tours",
    });
    await Tour.belongsToMany(Mural, {
      foreignKey: "tourId",
      through: "murals_in_tour",
      as: "murals",
    });
    await database.sync({ force: true });
  }

  public close() {
    database.close();
  }
}
