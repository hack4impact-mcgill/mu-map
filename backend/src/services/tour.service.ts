import { Tour, TourInterface } from "../models/tour.model";
import { Mural } from "../models/mural.model";
import { UpdateOptions } from "sequelize";
import { RED } from "../config/constants";

export class TourService {
  public async create(tour: TourInterface, murals: number[]) {
    const createdTour = await Tour.create<Tour>(tour);
    murals.forEach(async (muralId) => {
      const mural = await Mural.findByPk<Mural>(muralId, {
        rejectOnEmpty: true,
      });
      createdTour.addMural(mural);
    });
    return { success: true, body: createdTour };
  }
  public async show(tourId: number) {
    const tour = await Tour.findByPk<Tour>(tourId, { rejectOnEmpty: true });
    const murals = await tour.getMurals();
    return { success: true, tour: tour, murals: murals };
  }

  public async update(tourId: number, params: TourInterface) {
    const update: UpdateOptions = {
      where: { id: tourId },
    };
    await Tour.findByPk<Tour>(tourId, { rejectOnEmpty: true });
    await Tour.update(params, update);
    return { success: true };
  }

  public async delete(tourId: number, params: TourInterface) {
    await Tour.findByPk<Tour>(tourId, { rejectOnEmpty: true });
    await Tour.destroy({
      where: { id: tourId },
    });
    return { success: true };
  }

  /**
   * Finds and returns all tours within specified page number and size
   * @param limit page size
   * @param offset the page number
   */
  public async showAll(limit: number, offset: number) {
    try {
      const tours: Tour[] = await Tour.findAll<Tour>({
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
      return { success: true, tours: tours };
    } catch (e) {
      console.error(RED, e.message);
      throw e;
    }
  }
}
