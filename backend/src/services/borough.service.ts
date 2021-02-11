import { Borough, BoroughInterface } from "../models/borough.model";
import { UpdateOptions } from "sequelize";
import { RED } from "../config/constants";

export class BoroughService {
  /**
   * Creates a new Borough in db
   * @param borough BoroughInterface describing new borough to be created
   */
  public async create(borough: BoroughInterface): Promise<Borough> {
    try {
      const createdBorough: Borough = await Borough.create<Borough>(borough);
      return createdBorough;
    } catch (e) {
      console.error(RED, e);
      throw e;
    }
  }

  /**
   * show a borough by id
   * @param boroughId  id of borough to show
   */
  public async show(boroughId: number): Promise<Borough> {
    try {
      const borough = await Borough.findByPk<Borough>(boroughId, {
        rejectOnEmpty: true,
      });
      return borough;
    } catch (e) {
      console.error(RED, e);
      throw e;
    }
  }

  /**
   * update an existing borough by id
   * @param boroughId borough id
   * @param params BoroughInterface describing fields to be updated
   */
  public async update(
    boroughId: number,
    params: BoroughInterface
  ): Promise<void> {
    try {
      const update: UpdateOptions = {
        where: { id: boroughId },
      };
      await Borough.findByPk<Borough>(boroughId, { rejectOnEmpty: true });
      await Borough.update(params, update);
      return;
    } catch (e) {
      console.error(RED, e);
      throw e;
    }
  }

  /**
   * Show all boroughs (paginated) without their associated murals
   * @param limit page size
   * @param offset page number
   */
  public async showAll(limit: number, offset: number) {
    try {
      const boroughs = await Borough.findAndCountAll<Borough>({
        limit: limit,
        offset: offset,
      });
      return boroughs;
    } catch (e) {
      console.error(RED, e);
      throw e;
    }
  }
}
