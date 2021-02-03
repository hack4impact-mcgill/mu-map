import {
  MuralCollection,
  MuralCollectionInterface,
} from "../models/muralcollection.model";
import { Mural } from "../models/mural.model";
import { UpdateOptions } from "sequelize";
import { RED } from "../config/constants";

export class MuralCollectionService {
  public async create(collection: MuralCollectionInterface, murals: number[]) {
    const createdCollection: MuralCollection = await MuralCollection.create<MuralCollection>(
      collection
    );
    murals.forEach(async (muralId) => {
      const mural = await Mural.findByPk<Mural>(muralId, {
        rejectOnEmpty: true,
      });
      createdCollection.addMural(mural);
    });
    return { success: true, body: createdCollection };
  }

  public async show(collectionId: number): Promise<MuralCollection> {
    const collection: MuralCollection = await MuralCollection.findByPk<MuralCollection>(
      collectionId,
      { rejectOnEmpty: true }
    );
    return collection;
  }

  public async update(collectionId: number, params: MuralCollectionInterface) {
    const update: UpdateOptions = {
      where: { id: collectionId },
    };
    await MuralCollection.findByPk<MuralCollection>(collectionId, {
      rejectOnEmpty: true,
    });
    await MuralCollection.update(params, update);
    return { success: true };
  }

  /**
   * Finds and returns all collections within specified page number and size
   * @param limit page size
   * @param offset the page number
   */
  public async showAll(
    limit: number,
    offset: number
  ): Promise<MuralCollection[]> {
    try {
      const collections = await MuralCollection.findAll<MuralCollection>({
        limit: limit,
        offset: offset,
        include: [
          {
            model: Mural,
            as: "murals",
            attributes: ["id"],
            through: {
              attributes: [],
            },
          },
        ],
        attributes: { exclude: ["updatedAt", "createdAt"] },
      });
      return collections;
    } catch (e) {
      console.log(RED, e.message);
      throw e;
    }
  }
}
