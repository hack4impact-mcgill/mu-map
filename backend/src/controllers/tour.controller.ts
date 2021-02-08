import { Request, Response } from "express";
import { EmptyResultError } from "sequelize";
import { TourInterface, Tour } from "../models/tour.model";
import { TourService } from "../services/tour.service";

export class TourController {
  public tourService: TourService = new TourService();

  /**
   * POST /tour to create a new tour associated with murals by id
   * @param req HTTP request containing a "tour" attribute containing TourInterface attributes
   *  describing the tour, and a list of mural IDs "murals".
   * @param res HTTP response
   */
  public async create(req: Request, res: Response) {
    const tour: TourInterface = req.body.tour;
    const murals: number[] = req.body.murals;
    try {
      const createdTour = await this.tourService.create(tour, murals);
      res.status(201).json(createdTour);
    } catch (e) {
      res.status(500).json({ error: "Something went wrong." });
    }
  }

  /**
   * GET /tour/:id to get a tour by id
   * @param req HTTP request
   * @param res HTTP response
   */
  public async show(req: Request, res: Response) {
    const tourId: number = Number(req.params.id);
    try {
      const tour: Tour = await this.tourService.show(tourId);
      res.status(200).json(tour);
    } catch (e) {
      if (e instanceof EmptyResultError) {
        res.status(404).json({ error: "No tour found with this id" });
      } else {
        res.status(500).json({ error: "Something went wrong." });
      }
    }
  }

  // PUT update a mural with a given id
  public async update(req: Request, res: Response) {
    const tourId: number = Number(req.params.id);
    const params: TourInterface = req.body;
    try {
      await this.tourService.update(tourId, params);
      res.status(200).json({ data: "Successfully updated." });
    } catch (e) {
      if (e instanceof EmptyResultError) {
        res.status(404).json({ error: "No tour found with this id." });
      } else {
        res.status(500).json({ error: "Something went wrong." });
      }
    }
  }

  /**
   * DELETE /tour to delete a tour by id
   * @param req HTTP request containing tour id to delete
   * @param res HTTP response
   */
  public async delete(req: Request, res: Response) {
    const tourId: number = Number(req.params.id);
    try {
      await this.tourService.delete(tourId);
      res.status(200).json({ message: "successfully deleted" });
    } catch (e) {
      if (e instanceof EmptyResultError) {
        res.status(404).json({ error: "No tour found with this id" });
      } else {
        res.status(500).json({ error: "Something went wrong." });
      }
    }
  }

  /**
   * GET /tour to get all tours
   * @param req HTTP request
   * @param res HTTP response containing all tours
   */
  public async showAll(req: Request, res: Response) {
    const limit = Number(req.query.limit ?? 40);
    const offset = Number(req.query.page ?? 0) * limit;
    try {
      const tours: Tour[] = await this.tourService.showAll(limit, offset);
      res.status(200).json({ tours: tours });
    } catch (e) {
      res.status(500).json({ error: "Something went wrong." });
    }
  }
}
