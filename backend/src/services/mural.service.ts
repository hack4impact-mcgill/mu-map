import { Mural, MuralInterface } from "../models/mural.model";
import { UpdateOptions } from "sequelize";

export class MuralService {

  public async create(mural : MuralInterface) {
    const createdMural : Mural = await Mural.create<Mural>(mural)
    return { success: true, body: createdMural}
  }

  public async show(muralId : number) {
    const mural = await Mural.findByPk<Mural>(muralId, {rejectOnEmpty: true})
    return {success: true, mural: mural}
  }

  public async update(muralId: number, params: MuralInterface) {
    const update: UpdateOptions = {
      where: { id: muralId },
    };
      await Mural.findByPk<Mural>(muralId, {rejectOnEmpty: true})
      await Mural.update(params, update)
      return {success : true}
  }  

}