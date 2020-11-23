import { MuralController } from "../controllers/mural.controller";
import { ArtistController } from "../controllers/artist.controller";
import { TourController } from "../controllers/tour.controller";
import { Application } from "express";

export class Routes {
  public muralController: MuralController = new MuralController();
  public artistController: ArtistController = new ArtistController();
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
      .route("/artist")
      .post(this.artistController.create.bind(this.artistController));

    app
      .route("/artist/:id")
      .get(this.artistController.show.bind(this.artistController))
      .put(this.artistController.update.bind(this.artistController));

    app
      .route("/route")
      .post(this.tourController.create.bind(this.tourController));
  }
}
