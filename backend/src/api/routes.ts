import { MuralController } from "../controllers/mural.controller";
import { Application } from "express";
import {TourController} from "../controllers/tour.controller"

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
      .route("/tour/:id")
      .get(this.tourController.show.bind(this.tourController))
      .put(this.tourController.update.bind(this.tourController));
  }
}
