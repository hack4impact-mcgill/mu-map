import { MuralController } from "../controllers/mural.controller";
import { TourController } from "../controllers/tour.controller";
import { Application } from "express";

export class Routes {
  public muralController: MuralController = new MuralController();
  public tourController: TourController = new TourController();

  public routes(app: Application): void {
    app
      .route("/mural")
      .post(this.muralController.create.bind(this.muralController));

    app
      .route("/mural/:id")
      .get(this.muralController.show.bind(this.muralController))
      .put(this.muralController.update.bind(this.muralController));

    app
      .route("/route")
      .post(this.tourController.create.bind(this.tourController));

    app
      .route("/route")
      .get(this.tourController.get.bind(this.tourController))
  }
}
