import { Borough } from "./borough.model";
import { Artist } from "./artist.model";
import { Tour } from "./tour.model";
import { Mural } from "./mural.model";
import { MuralCollection } from "./muralcollection.model";
import { database } from "../config/database";

export class AssociationSetup {
  public async sync() {
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
    await database.sync({ force: true });
    if (process.env.MIGRATE == "true") {
      await this.sampleMigrations();
    }
  }

  // Creates some initial data in database for dev purposes.
  private async sampleMigrations() {
    console.log("Creating some data...");
    const artistNames = ["Michaelangelo", "Banksy"];
    const boroughNames = ["Cote des Neiges", "Plateau"];
    artistNames.forEach(function (name) {
      Artist.create<Artist>({
        name: name,
      });
    });
    boroughNames.forEach(function (name) {
      Borough.create<Borough>({
        name: name,
      });
    });
    const muralParams = {
      name: "example mural",
      boroughId: "1",
      artistId: "1",
      year: 2020,
      city: "Montreal",
      address: "1234 street",
      partners: ["partner 1", "partner 2"],
      coordinates: {
        type: "Point",
        coordinates: [-87.123123, 41.232454],
      },
    };
    await Mural.create<Mural>(muralParams);
    const muralParams2 = {
      name: "example mural 2",
      boroughId: "2",
      artistId: "2",
      year: 2022,
      city: "Montreal",
      address: "4444 street",
      partners: ["partner 1"],
      coordinates: {
        type: "Point",
        coordinates: [-73.5772, 45.5048],
      },
    };
    await Mural.create<Mural>(muralParams2);
    const createdTour = await Tour.create<Tour>({
      name: "big tour",
      description: "its lit",
    });
    await createdTour.addMural(1);
    await createdTour.addMural(2);
    const createdCollection = await MuralCollection.create<MuralCollection>({
      name: "basic collection",
      description: "cool murals",
    });
    await createdCollection.addMural(1);
    console.log("Finished creating data");
  }

  public close() {
    database.close();
  }
}
