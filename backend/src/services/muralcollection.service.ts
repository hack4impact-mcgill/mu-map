import {
  MuralCollection,
  MuralCollectionInterface,
} from "../models/muralcollection.model";
import { Mural } from "../models/mural.model";
import { UpdateOptions } from "sequelize";
import { RED } from "../config/constants";

export class MuralCollectionService {
  /**
   * Create a new collection and optionally connect it with murals
   * @param collection MuralCollectionInterface describing the attributes of the new collection
   * @param murals list of mural IDs to associate with the new collection
   */
  public async create(collection: MuralCollectionInterface, murals: number[]) {
    try {
      const createdCollection: MuralCollection = await MuralCollection.create<MuralCollection>(
        collection
      );
      let muralsNotFound: number[] = [];
      murals.forEach(async (muralId) => {
        try {
          const mural = await Mural.findByPk<Mural>(muralId, {
            rejectOnEmpty: true,
          });
          createdCollection.addMural(mural);
        } catch (e) {
          muralsNotFound.push(muralId);
          console.warn(
            RED,
            "Mural ID not found, could not be added to tour: " + muralId
          );
        }
      });
      return { muralsNotFound: muralsNotFound, body: createdCollection };
    } catch (e) {
      console.error(RED, e);
      throw e;
    }
  }

  /**
   * Displays a single collection by id
   * @param collectionId id of the collection to display
   */
  public async show(collectionId: number): Promise<MuralCollection> {
    try {
      const collection: MuralCollection = await MuralCollection.findByPk<MuralCollection>(
        collectionId,
        {
          rejectOnEmpty: true,
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
        }
      );
      return collection;
    } catch (e) {
      console.error(RED, e);
      throw e;
    }
  }

  /**
   * Updates attributes of a collection by id
   * @param collectionId id of the collection
   * @param params MuralCollectionInterface describing the
   *  attributes to be updated
   */
  public async update(collectionId: number, params: MuralCollectionInterface) {
    try {
      const update: UpdateOptions = {
        where: { id: collectionId },
      };
      await MuralCollection.findByPk<MuralCollection>(collectionId, {
        rejectOnEmpty: true,
      });
      await MuralCollection.update(params, update);
      return;
    } catch (e) {
      console.error(RED, e.message);
      throw e;
    }
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
      console.log(RED, e);
      throw e;
    }
  }
}
