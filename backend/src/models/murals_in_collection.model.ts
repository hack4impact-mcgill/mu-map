import { Model, DataTypes } from "sequelize";
import { database } from "../config/database";

export class MuralsInCollection extends Model {
  public muralId!: number;
  public collectionId!: number;
}

MuralsInCollection.init(
  {
    muralId: {
      type: DataTypes.INTEGER,
      references: { model: "murals", key: "id" },
      onDelete: "CASCADE",
    },
    collectionId: {
      type: DataTypes.INTEGER,
      references: { model: "muralcollections", key: "id" },
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "murals_in_collection",
    sequelize: database,
  }
);

export interface MuralsInCollectionInterface {
  muralId: number;
  collectionId: number;
}
