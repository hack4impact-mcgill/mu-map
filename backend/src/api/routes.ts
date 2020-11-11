import { MuralController } from "../controllers/mural.controller";
import { Application } from "express";

export class Routes {
  public muralController: MuralController = new MuralController();

  public routes(app: Application): void {
    app
      .route("/mural")
      .post(this.muralController.create.bind(this.muralController));

    app
      .route("/mural/:id")
      .get(this.muralController.show.bind(this.muralController))
      .put(this.muralController.update.bind(this.muralController));
  }
}
