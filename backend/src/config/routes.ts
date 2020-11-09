import { Request, Response } from "express";
import { MuralController } from "../controllers/mural.controller";
import { Application } from "express";

export class Routes {
  public muralController: MuralController = new MuralController();

  public routes(app: Application): void {
    app
      .route("/mural")
      .get(this.muralController.index)
      .post(this.muralController.create);

    app
      .route("/mural/:id")
      .get(this.muralController.show)
      .put(this.muralController.update);
  }
}
