import { Mural, MuralInterface } from "../models/mural.model";
import { UpdateOptions } from "sequelize";
import { RED } from "../config/constants";

export class MuralService {
  /**
   * Creates a new mural in db
   * @param mural MuralInterface describing the new mural to be created
   */
  public async create(mural: MuralInterface): Promise<Mural> {
    try {
      const coordinates = {
        coordinates: {
          type: "Point",
          coordinates: [mural.longitude, mural.latitude],
        },
      };
      const createdMural: Mural = await Mural.create<Mural>({
        ...mural,
        ...coordinates,
      });
      return createdMural;
    } catch (e) {
      console.error(RED, e);
      throw e;
    }
  }

  /**
   * gets all murals (paginated)
   * @param limit page size
   * @param offset page number
   */
  public async showAll(limit: number, offset: number) {
    try {
      const murals = await Mural.findAndCountAll<Mural>({
        limit: limit,
        offset: offset,
      });
      return murals;
    } catch (e) {
      console.error(RED, e);
      throw e;
    }
  }

  /**
   * get a mural by id
   * @param muralId id of the mural
   */
  public async show(muralId: number): Promise<Mural> {
    try {
      const mural: Mural = await Mural.findByPk<Mural>(muralId, {
        rejectOnEmpty: true,
      });
      return mural;
    } catch (e) {
      console.error(RED, e);
      throw e;
    }
  }

  /**
   * update an existing mural by id
   * @param muralId mural id
   * @param params MuralInterface describing fields to be updated
   */
  public async update(muralId: number, params: MuralInterface): Promise<void> {
    try {
      const update: UpdateOptions = {
        where: { id: muralId },
      };
      await Mural.findByPk<Mural>(muralId, { rejectOnEmpty: true });
      await Mural.update(params, update);
      return;
    } catch (e) {
      console.error(RED, e);
      throw e;
    }
  }
}
