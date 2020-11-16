import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import { Routes } from "./api/routes";
import { Borough } from "./models/borough.model";
import { Artist } from "./models/artist.model";
import { Mural } from "./models/mural.model";

class App {
  public app: express.Application;
  public routePrv: Routes = new Routes();

  constructor() {
    this.app = express();
    this.config();
    this.routePrv.routes(this.app);
    //make sure models sync in correct order
    //todo: encapsulate this logic in a class or function, since we don't want force: true in production
    Borough.sync({ force: true });
    Artist.sync({ force: true });
    Mural.sync({ force: true });
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }
}

export default new App().app;
