import { Request, Response } from "express";
import { Artist, ArtistInterface } from "../models/artist.model";
import { EmptyResultError } from "sequelize";
import { ArtistService } from "../services/artist.service";

export class ArtistController {
  public artistService: ArtistService = new ArtistService();

  /**
   * POST /artist
   * @param req HTTP request containing ArtistInterface attributes
   * @param res HTTP response
   */
  public async create(req: Request, res: Response) {
    const params: ArtistInterface = req.body;
    try {
      const createdArtist: Artist = await this.artistService.create(params);
      res.status(201).json(createdArtist);
    } catch (e) {
      res.status(500).json({ error: "Something went wrong." });
    }
  }

  /**
   * GET /artist/:id   returns artist by id
   * @param req HTTP request
   * @param res HTTP response
   */
  public async show(req: Request, res: Response) {
    const artistId: number = Number(req.params.id);
    try {
      const artist: Artist = await this.artistService.show(artistId);
      res.status(202).json(artist);
    } catch (e) {
      if (e instanceof EmptyResultError) {
        res.status(404).json({ error: "Artist not found by id!" });
      } else {
        res.status(500).json({ error: "Something went wrong" });
      }
    }
  }

  /**
   *PUT /artist/:id   update properties of a artist by id
   * @param req HTTP request
   * @param res HTTP response
   */
  public async update(req: Request, res: Response) {
    const artistId: number = Number(req.params.id);
    const params: ArtistInterface = req.body;
    try {
      await this.artistService.update(artistId, params);
      res.status(202).json({ data: "successfully updated" });
    } catch (e) {
      if (e instanceof EmptyResultError) {
        res.status(404).json({ error: "Artist not found by id!" });
      } else {
        res.status(500).json({ error: "Something went wrong." });
      }
    }
  }

  /**
   * GET /artist to get all artists (paginated)
   * @param req HTTP request with optional limit and offset query params
   * @param res HTTP response
   */
  public async showAll(req: Request, res: Response) {
    const limit = Number(req.query.limit ?? 40);
    const offset = Number(req.query.page ?? 0) * limit;
    try {
      const artists = await this.artistService.showAll(limit, offset);
      res.status(202).json(artists);
    } catch (e) {
      res.status(500).json({ error: "Something went wrong." });
    }
  }
}
