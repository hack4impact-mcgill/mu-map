import { Borough } from "./borough.model";
import { Artist } from "./artist.model";
import { Tour } from "./tour.model";
import { Mural } from "./mural.model";
import { MuralCollection } from "./muralcollection.model";
import { database } from "../config/database";

export class AssociationSetup {
    public async sync() {
        Mural.belongsTo(Borough, { foreignKey: { allowNull: false } });
        Mural.belongsTo(Artist, { foreignKey: { allowNull: false } });
        Mural.belongsToMany(MuralCollection, {
          foreignKey: "muralId",
          through: "murals_in_collection"
        })
        MuralCollection.belongsToMany(Mural, {
          foreignKey: "collectionId",
          through: "murals_in_collection"
        })
        Mural.belongsToMany(Tour, {
            foreignKey: "muralId",
            through: "murals_in_tour"
          })
          Tour.belongsToMany(Mural, {
            foreignKey: "tourId",
            through: "murals_in_tour"
          })
        database.sync({force:true})
    }

  public close() {
    database.close();
  }
}
