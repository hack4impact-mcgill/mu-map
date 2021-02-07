import { Tour, TourInterface } from "../models/tour.model";
import { Mural } from "../models/mural.model";
import { UpdateOptions } from "sequelize";
import { RED } from "../config/constants";

export class TourService {
  /**
   * Create a new tour interface and optionally connect it with murals
   * @param tour TourInterface describing the attributes of the new tour
   * @param murals list of mural IDs to connect with the tour
   */
  public async create(tour: TourInterface, murals: number[]) {
    try {
      const createdTour = await Tour.create<Tour>(tour);
      let muralsNotFound: number[] = [];
      murals.forEach(async (muralId) => {
        try {
          const mural: Mural = await Mural.findByPk<Mural>(muralId, {
            rejectOnEmpty: true,
          });
          createdTour.addMural(mural);
        } catch (e) {
          muralsNotFound.push(muralId);
          console.warn(
            RED,
            "Mural ID not found, could not be added to tour: " + muralId
          );
        }
      });
      return { muralsNotFound: muralsNotFound, tour: createdTour };
    } catch (e) {
      console.error(RED, e);
      throw e;
    }
  }

  /**
   * Displays a single tour by id
   * @param tourId the id of the tour to display
   */
  public async show(tourId: number): Promise<Tour> {
    try {
      const tour = await Tour.findByPk<Tour>(tourId, {
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
      });
      return tour;
    } catch (e) {
      console.error(RED, e);
      throw e;
    }
  }

  /**
   * Updates attributes of a tour by id
   * @param tourId id of the tour
   * @param params TourInterface describing attrtibutes to be updated
   */
  public async update(tourId: number, params: TourInterface): Promise<void> {
    try {
      const update: UpdateOptions = {
        where: { id: tourId },
      };
      await Tour.findByPk<Tour>(tourId, { rejectOnEmpty: true });
      await Tour.update(params, update);
      return;
    } catch (e) {
      console.error(RED, e.message);
      throw e;
    }
  }

  /**
   * deletes a tour by id
   * @param tourId tour's id
   */
  public async delete(tourId: number): Promise<void> {
    try {
      await Tour.findByPk<Tour>(tourId, { rejectOnEmpty: true });
      await Tour.destroy({
        where: { id: tourId },
      });
      return;
    } catch (e) {
      console.error(RED, e.message);
      throw e;
    }
  }

  /**
   * Finds and returns all tours within specified page number and size
   * @param limit page size
   * @param offset the page number
   */
  public async showAll(limit: number, offset: number): Promise<Tour[]> {
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
      return tours;
    } catch (e) {
      console.error(RED, e.message);
      throw e;
    }
  }
}
