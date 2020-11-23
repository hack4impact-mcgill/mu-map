import { MuralController } from "../controllers/mural.controller";
import { BoroughController } from "../controllers/borough.controller";
import { ArtistController } from "../controllers/artist.controller";
import { TourController } from "../controllers/tour.controller";
import { Application } from "express";

export class Routes {
  public muralController: MuralController = new MuralController();
  public boroughController: BoroughController = new BoroughController();
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
      .route("/borough")
      .post(this.boroughController.create.bind(this.boroughController));

    app
      .route("/borough/:id")
      .get(this.boroughController.show.bind(this.boroughController))
      .put(this.boroughController.update.bind(this.boroughController));

    app
      .route("/artist")
      .post(this.artistController.create.bind(this.artistController));

    app
      .route("/artist/:id")
      .get(this.artistController.show.bind(this.artistController))
      .put(this.artistController.update.bind(this.artistController));

    app
      .route("/tour")
      .post(this.tourController.create.bind(this.tourController));

    app
      .route("/tour/:id")
      .get(this.tourController.show.bind(this.tourController))
      .put(this.tourController.update.bind(this.tourController));
  }
}