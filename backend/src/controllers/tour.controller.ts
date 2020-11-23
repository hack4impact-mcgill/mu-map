import { Request, Response } from "express";
import { TourInterface } from "../models/tour.model";
import { TourService } from "../services/tour.service";

export class TourController {
  public tourService: TourService = new TourService();

  // POST /tour
  public async create(req: Request, res: Response) {
    const params: TourInterface = req.body;
    try {
      const createdTour = await this.tourService.create(params);
      res.status(201).json(createdTour);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}