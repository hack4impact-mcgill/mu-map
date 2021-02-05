import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import { Routes } from "./api/routes";
import { AssociationSetup } from "./models/associationSetup";
import cors from "cors";

class App {
  public app: express.Application;
  public routePrv: Routes = new Routes();
  public associationSetup: AssociationSetup = new AssociationSetup();

  constructor() {
    this.app = express();
    this.config();
    this.routePrv.routes(this.app);
    this.associationSetup.sync();
  }

  private config(): void {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
  }
}

export default new App().app;
