import { Request, Response } from "express";
import { MuralInterface } from "../models/mural.model";
import { EmptyResultError } from "sequelize";
import { MuralService } from "../services/mural.service";

export class MuralController {
  public muralService: MuralService = new MuralService();

  // POST /mural
  public async create(req: Request, res: Response) {
    const params: MuralInterface = req.body;
    try {
      const createdMural = await this.muralService.create(params);
      res.status(201).json(createdMural);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  // GET /mural/:id     returns mural by id
  public async show(req: Request, res: Response) {
    const muralId: number = Number(req.params.id);

    try {
      const mural = await this.muralService.show(muralId);
      res.status(202).json(mural);
    } catch (e) {
      if (e instanceof EmptyResultError) {
        res.status(404).json(e);
      }
      res.status(500).json(e);
    }
  }

  // PUT /mural/:id   update properties of a mural by id
  public async update(req: Request, res: Response) {
    const muralId: number = Number(req.params.id);
    const params: MuralInterface = req.body;
    try {
      await this.muralService.update(muralId, params);
      res.status(202).json({ data: "successfully updated" });
    } catch (e) {
      if (e instanceof EmptyResultError) {
        res.status(404).json(e);
      }
      res.status(500).json(e);
    }
  }
}
