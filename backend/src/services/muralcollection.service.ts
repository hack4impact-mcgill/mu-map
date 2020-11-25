import {
  MuralCollection,
  MuralCollectionInterface,
} from "../models/muralcollection.model";
import { UpdateOptions } from "sequelize";

export class MuralCollectionService {
  public async create(collecton: MuralCollectionInterface, muralIDList: Array<number>) {
    const createdCollection: MuralCollection = await MuralCollection.create<MuralCollection>(
      collecton
    );
    muralIDList.forEach((value: number) => {
      createdCollection.addMural(value)
    })
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
}
