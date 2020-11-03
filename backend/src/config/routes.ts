import { Request, Response } from "express";
import { MuralController } from "../controllers/mural.controller";

export class Routes {
  public muralController: MuralController = new MuralController();

  public routes(app: any): void {
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