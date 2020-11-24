import { Request, Response } from "express";
import { BoroughInterface } from "../models/borough.model";
import { EmptyResultError } from "sequelize";
import { BoroughService } from "../services/borough.service";

export class BoroughController {
  public boroughService: BoroughService = new BoroughService();

  // POST /borough
  public async create(req: Request, res: Response) {
    const params: BoroughInterface = req.body;
    try {
      const createdBorough = await this.boroughService.create(params);
      res.status(201).json(createdBorough);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  // GET /borough/:id   returns borough by id
  public async show(req: Request, res: Response) {
    const boroughId: number = Number(req.params.id);

    try {
      const borough = await this.boroughService.show(boroughId);
      res.status(202).json(borough);
    } catch (e) {
      if (e instanceof EmptyResultError) {
        res.status(404).json({ error: "Borough not found by id!" });
      } else {
        res.status(500).json(e);
      }
    }
  }

  // PUT /borough/:id   update properties of a borough by id
  public async update(req: Request, res: Response) {
    const boroughId: number = Number(req.params.id);
    const params: BoroughInterface = req.body;
    try {
      await this.boroughService.update(boroughId, params);
      res.status(202).json({ data: "successfully updated" });
    } catch (e) {
      if (e instanceof EmptyResultError) {
        res.status(404).json({ error: "Borough not found by id!" });
      } else {
        res.status(500).json(e);
      }
    }
  }
}
