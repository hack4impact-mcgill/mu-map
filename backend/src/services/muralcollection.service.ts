import {
  MuralCollection,
  MuralCollectionInterface,
} from "../models/muralcollection.model";
import { Mural } from "../models/mural.model";
import { UpdateOptions } from "sequelize";

export class MuralCollectionService {
  public async create(collecton: MuralCollectionInterface, murals: number[]) {
    const createdCollection: MuralCollection = await MuralCollection.create<MuralCollection>(
      collecton
    );
    murals.forEach(async (muralId) => {
      const mural = await Mural.findByPk<Mural>(muralId, {
        rejectOnEmpty: true,
      });
      createdCollection.addMural(mural);
    });
    return { success: true, body: createdCollection };
  }

  public async show(collectionId: number) {
    const collection: MuralCollection = await MuralCollection.findByPk<MuralCollection>(
      collectionId,
      { rejectOnEmpty: true }
    );
    return { success: true, collection: collection };
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

  public async showAll(limit: number, offset: number) {
    const collections = await MuralCollection.findAndCountAll<MuralCollection>({
      limit: limit,
      offset: offset,
    });
    return { success: true, collections: collections };
  }
}
