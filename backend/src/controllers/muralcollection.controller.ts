import { Request, Response } from "express";
import { EmptyResultError } from "sequelize";
import { MuralCollectionInterface } from "../models/muralcollection.model";
import { MuralCollectionService } from "../services/muralcollection.service";

export class MuralCollectionController {
  public collectionService: MuralCollectionService = new MuralCollectionService();

  // POST /collection
  public async create(req: Request, res: Response) {
    const collection: MuralCollectionInterface = req.body.tour;
    const murals: number[] = req.body.murals;

    try {
      const createdCollection = await this.collectionService.create(
        collection,
        murals
      );
      res.status(201).json(createdCollection);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  // GET /collection/:id   (get a collection by id)
  public async show(req: Request, res: Response) {
    const collectionId: number = Number(req.params.id);
    try {
      const collection = await this.collectionService.show(collectionId);
      res.status(202).json(collection);
    } catch (e) {
      if (e instanceof EmptyResultError) {
        res.status(404).json({ error: "No collection found with this id" });
      } else {
        res.status(500).json(e);
      }
    }
  }

  //PUT /collection/:id (update a collection by id)
  public async update(req: Request, res: Response) {
    const collectionId: number = Number(req.params.id);
    const params: MuralCollectionInterface = req.body;

    try {
      await this.collectionService.update(collectionId, params);
      res.status(202).json({ data: "successfully updated" });
    } catch (e) {
      if (e instanceof EmptyResultError) {
        res.status(404).json({ error: "No collection found with this id" });
      } else {
        res.status(500).json(e);
      }
    }
  }
}
