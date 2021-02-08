import { Request, Response } from "express";
import { Borough, BoroughInterface } from "../models/borough.model";
import { EmptyResultError, ValidationError } from "sequelize";
import { BoroughService } from "../services/borough.service";

export class BoroughController {
  public boroughService: BoroughService = new BoroughService();

  /**
   * POST /borough
   * @param req HTTP request containing BoroughInterface attributes:
   *  {
   *    name: string;
   *  }
   * @param res HTTP response containing borough data
   */
  public async create(req: Request, res: Response) {
    const params: BoroughInterface = req.body;
    try {
      const createdBorough: Borough = await this.boroughService.create(params);
      res.status(201).json(createdBorough);
    } catch (e) {
      if (e instanceof ValidationError) {
        res.status(400).json({ error: "Invalid body parameters!" });
      } else {
        res.status(500).json({ error: "Something went wrong." });
      }
    }
  }

  /**
   * GET /borough/:id   returns borough by id
   * @param req HTTP request
   * @param res HTTP response containing borough data
   */
  public async show(req: Request, res: Response) {
    const boroughId: number = Number(req.params.id);
    try {
      const borough: Borough = await this.boroughService.show(boroughId);
      res.status(200).json(borough);
    } catch (e) {
      if (e instanceof EmptyResultError) {
        res.status(404).json({ error: "Borough not found by id!" });
      } else {
        res.status(500).json({ error: "Something went wrong" });
      }
    }
  }

  /**
   * PUT /borough/:id update properties of a borough by id
   * @param req HTTP request containing BoroughInterface attributes to update:
   *  {
   *    name: string;
   *  }
   * @param res HTTP response
   */
  public async update(req: Request, res: Response) {
    const boroughId: number = Number(req.params.id);
    const params: BoroughInterface = req.body;
    try {
      await this.boroughService.update(boroughId, params);
      res.status(200).json({ data: "successfully updated" });
    } catch (e) {
      if (e instanceof EmptyResultError) {
        res.status(404).json({ error: "Borough not found by id!" });
      } else if (e instanceof ValidationError) {
        res.status(400).json({ error: "Invalid body parameters!" });
      } else {
        res.status(500).json({ error: "Something went wrong." });
      }
    }
  }

  /**
   * /GET /borough to get ALL boroughs (paginated)
   * @param req HTTP request with optional limit and offset query params
   * @param res HTTP response
   */
  public async showAll(req: Request, res: Response) {
    const limit = Number(req.query.limit ?? 40);
    const offset = Number(req.query.page ?? 0) * limit;
    try {
      const boroughs = await this.boroughService.showAll(limit, offset);
      res.status(200).json(boroughs);
    } catch (e) {
      res.status(500).json({ error: "Something went wrong." });
    }
  }
}
