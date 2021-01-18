import { Borough, BoroughInterface } from "../models/borough.model";
import { UpdateOptions } from "sequelize";

export class BoroughService {
  public async create(borough: BoroughInterface) {
    const createdBorough: Borough = await Borough.create<Borough>(borough);
    return { success: true, body: createdBorough };
  }

  public async show(boroughId: number) {
    const borough = await Borough.findByPk<Borough>(boroughId, {
      rejectOnEmpty: true,
    });
    return { success: true, borough: borough };
  }

  public async update(boroughId: number, params: BoroughInterface) {
    const update: UpdateOptions = {
      where: { id: boroughId },
    };
    await Borough.findByPk<Borough>(boroughId, { rejectOnEmpty: true });
    await Borough.update(params, update);
    return { success: true };
  }

  public async showAll(limit: number, offset: number) {
    const boroughs = await Borough.findAndCountAll<Borough>({
      limit: limit,
      offset: offset,
    });
    return { success: true, boroughs: boroughs };
  }
}
