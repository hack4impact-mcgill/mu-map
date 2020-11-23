import { Tour, TourInterface } from "../models/tour.model";
import { UpdateOptions } from "sequelize";

export class TourService {
    public async create(tour: TourInterface) {
        const createdTour = await Tour.create<Tour>(tour);
        return { success: true, body: createdTour };
    }
    public async show(tourId: number) {
        const tour = await Tour.findByPk<Tour>(tourId, { rejectOnEmpty: true });
        return { success: true, tour: tour };
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
            where: { id: tourId }
        });
        return { success: true };
    }
}

