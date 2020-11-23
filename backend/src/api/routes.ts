import { MuralController } from "../controllers/mural.controller";
import { BoroughController } from "../controllers/borough.controller";
import { TourController } from "../controllers/tour.controller";
import { Application } from "express";

export class Routes {
  public muralController: MuralController = new MuralController();
  public boroughController: BoroughController = new BoroughController();
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
      .route("/borough")
      .post(this.boroughController.create.bind(this.boroughController));

    app
      .route("/borough/:id")
      .get(this.boroughController.show.bind(this.boroughController))
      .put(this.boroughController.update.bind(this.boroughController));

    app
      .route("/route")
      .post(this.tourController.create.bind(this.tourController));
  }
}
