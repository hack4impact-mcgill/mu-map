import { Mural, MuralInterface } from "../models/mural.model";
import { UpdateOptions } from "sequelize";

export class MuralService {
  public async create(mural: MuralInterface) {
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
    return { success: true, body: createdMural };
  }

  public async showAll(limit: number, offset: number) {
    const murals = await Mural.findAndCountAll<Mural>({
      limit: limit,
      offset: offset
    });
    return { success: true, murals: murals };
  }

  public async show(muralId: number) {
    const mural = await Mural.findByPk<Mural>(muralId, { rejectOnEmpty: true });
    return { success: true, mural: mural };
  }

  public async update(muralId: number, params: MuralInterface) {
    const update: UpdateOptions = {
      where: { id: muralId },
    };
    await Mural.findByPk<Mural>(muralId, { rejectOnEmpty: true });
    await Mural.update(params, update);
    return { success: true };
  }
}
