import { Request, Response } from "express";
import { MuralInterface } from "../models/mural.model";
import { EmptyResultError } from "sequelize";
import { MuralService } from "../services/mural.service";

export class MuralController {
  public muralService: MuralService = new MuralService();

  /**
   * GET /mural to get all murals (paginated)
   * @param req HTTP request optionally containing page count and size in querystring:
   * limit: number (default 40)
   * page: number (default 0)
   * @param res
   */
  public async showAll(req: Request, res: Response) {
    try {
      const limit = Number(req.query.limit ?? 40);
      const offset = Number(req.query.page ?? 0) * limit;
      const murals = await this.muralService.showAll(limit, offset);
      res.status(202).json(murals);
    } catch (e) {
      res.status(500).json({ error: "Something went wrong." });
    }
  }

  /**
   * POST /mural to create a new mural based on MuralInterface parameters
   * @param req HTTP request with body:
   *  {
      name: string;
      artistId: number;
      year: number;
      address: string;
      city: string;
      boroughId: number;
      neighbourhood?: string;
      description?: string;
      partners?: string[];
      assistants?: string[];
      longitude: number;
      latitude: number;
      imgURLs?: string[];
      socialMediaURLs?: string[];
    }
   * @param res HTTP response
   */
  public async create(req: Request, res: Response) {
    const params: MuralInterface = req.body;
    try {
      //TODO: potentially validate if longitude and latitude are valid in Montreal?
      if ("longitude" in params && "latitude" in params) {
        const createdMural = await this.muralService.create(params);
        res.status(201).json(createdMural);
      } else {
        res.status(400).json({ error: "Pass a longitude and latitude." });
      }
    } catch (e) {
      res.status(500).json({ error: "Something went wrong." });
    }
  }

  /**
   * GET /mural/:id to return a mural by id
   * @param req HTTP request
   * @param res HTTP response
   */
  public async show(req: Request, res: Response) {
    const muralId: number = Number(req.params.id);
    try {
      const mural = await this.muralService.show(muralId);
      res.status(200).json(mural);
    } catch (e) {
      if (e instanceof EmptyResultError) {
        res.status(404).json({ error: "Mural not found by id!" });
      } else {
        res.status(500).json({ error: "Something went wrong." });
      }
    }
  }

  /**
   * PUT /mural/:id  update properties of a mural by id based on MuralInterface attributes
   * @param req HTTP request containing any of the mural attributes to update:
   *  {
      name: string;
      artistId: number;
      year: number;
      address: string;
      city: string;
      boroughId: number;
      neighbourhood?: string;
      description?: string;
      partners?: string[];
      assistants?: string[];
      longitude: number;
      latitude: number;
      imgURLs?: string[];
      socialMediaURLs?: string[];
    }
   * @param res HTTP response
   */
  public async update(req: Request, res: Response) {
    const muralId: number = Number(req.params.id);
    const params: MuralInterface = req.body;
    try {
      await this.muralService.update(muralId, params);
      res.status(200).json({ data: "successfully updated" });
    } catch (e) {
      if (e instanceof EmptyResultError) {
        res.status(404).json({ error: "Mural not found by id!" });
      } else {
        res.status(500).json({ error: "Something went wrong." });
      }
    }
  }
}
