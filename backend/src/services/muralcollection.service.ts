import {
  MuralCollection,
  MuralCollectionInterface,
} from "../models/muralcollection.model";

// still trying to find out how to find the IDs that do not correspond to a mural
export class MuralCollectionService {
  public async create(collecton: MuralCollectionInterface) {
    const createdCollection: MuralCollection = await MuralCollection.create<MuralCollection>(
      collecton
    );
    return { success: true, body: createdCollection };
  }
}
