import { Request, Response } from "express";
import { EmptyResultError } from "sequelize";

import { TourInterface } from "../models/tour.model";
import { TourService } from "../services/tour.service";

// Request by id
// GET, POST, PUT, DELETE
export class TourController {
  public tourService: TourService = new TourService();

  // POST
  public async create(req: Request, res: Response) {
    const tour: TourInterface = req.body.tour;
    const murals: number[] = req.body.murals;
    try {
      const createdTour = await this.tourService.create(tour, murals);
      res.status(201).json(createdTour);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  //GET (get a tour by id)
  public async show(req: Request, res: Response) {
    const tourId: number = Number(req.params.id);
    try {
      const tour = await this.tourService.show(tourId);
      res.status(202).json(tour);
    } catch (e) {
      if (e instanceof EmptyResultError) {
        res.status(404).json({ error: "No tour found with this id" });
      } else {
        res.status(500).json(e);
      }
    }
  }

  // PUT update a mural with a given id
  public async update(req: Request, res: Response) {
    const tourId: number = Number(req.params.id);
    const params: TourInterface = req.body;

    try {
      await this.tourService.update(tourId, params);
      res.status(202).json({ data: "successfully updated" });
    } catch (e) {
      if (e instanceof EmptyResultError) {
        res.status(404).json({ error: "No tour found with this id" });
      } else {
        res.status(500).json(e);
      }
    }
  }

  //DELETE
  public async delete(req: Request, res: Response) {
    const tourId: number = Number(req.params.id);
    const params: TourInterface = req.body;
    try {
      await this.tourService.delete(tourId, params);
      res.status(202).json({ message: "successfully deleted" });
    } catch (e) {
      if (e instanceof EmptyResultError) {
        res.status(404).json({ error: "No tour found with this id" });
      } else {
        res.status(500).json(e);
      }
    }
  }

  //GET /tour to get all tours
  public async showAll(req: Request, res: Response) {
    const limit = Number(req.query.limit ?? 40);
    const offset = Number(req.query.page ?? 0) * limit;
    try {
      const tours = await this.tourService.showAll(limit, offset);
      res.status(202).json(tours);
    } catch (e) {
      res.status(500).json({ error: "Something went wrong." });
    }
  }
}
