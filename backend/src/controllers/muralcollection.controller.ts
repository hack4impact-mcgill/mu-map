import { Request, Response } from "express";
import { MuralCollectionInterface } from "../models/muralcollection.model";
import { MuralCollectionService } from "../services/muralcollection.service";

export class MuralCollectionController {
  public collectionService: MuralCollectionService = new MuralCollectionService();

  // POST /collection
  public async create(req: Request, res: Response) {
    const params: MuralCollectionInterface = req.body;
    try {
      const createdCollection = await this.collectionService.create(params);
      res.status(201).json(createdCollection);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}
