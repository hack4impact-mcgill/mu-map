import { Mural, MuralInterface } from "models/mural.model";
import { Tour, TourInterface } from "../models/tour.model";

export class TourService {
  public async create(tour: TourInterface) {
    const createdTour: Tour = await Tour.create<Tour>(tour);
    return { success: true, body: createdTour };
  }
}