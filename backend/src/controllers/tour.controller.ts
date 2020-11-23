import { Request, Response } from "express";
import { EmptyResultError } from "sequelize";

import { TourInterface } from "../models/tour.model";
import {TourService} from "../services/tour.service";
// Request by id
// GET, POST, PUT, DELETE
export class TourController {
    public tourService: TourService = new TourService(); // object tourService?
    // POST 
    public async create(req: Request, res: Response) {
        const params: TourInterface = req.body;
        try {
            const createdTour = await this.tourService.create(params);
            res.status(201).json(createdTour); // 201: status success, created
        } catch (e) {
            res.status(500).json(e);
        }
    }
    //GET (get a tour by id)
    public async show(req: Request, res: Response) {
        const tourId: number = Number(req.params.id);
        try {
          const tour = await this.tourService.show(tourId); // tour = {success:boolean; tour: Tour}
          res.status(202).json(tour);
        } catch (e) {
          if (e instanceof EmptyResultError) {
            res.status(404).json({ error: "No tour found with this id" }); // 404 Not found
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
          await this.tourService.delete(tourId,params); // tour = {success:boolean; tour: Tour}
          res.status(202).json({message: "successfully deleted"});
        } catch (e) {
          if (e instanceof EmptyResultError) {
            res.status(404).json({ error: "No tour found with this id" }); // 404 Not found
          } else {
            res.status(500).json(e);
          }
        }
      }

}
