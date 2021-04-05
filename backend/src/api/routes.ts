import { MuralController } from "../controllers/mural.controller";
import { MuralCollectionController } from "../controllers/muralcollection.controller";
import { BoroughController } from "../controllers/borough.controller";
import { ArtistController } from "../controllers/artist.controller";
import { TourController } from "../controllers/tour.controller";
import { Application } from "express";
import { authMiddleware } from "../auth/AuthMiddleware"

export class Routes {
  public muralController: MuralController = new MuralController();
  public collectionController: MuralCollectionController = new MuralCollectionController();
  public boroughController: BoroughController = new BoroughController();
  public artistController: ArtistController = new ArtistController();
  public tourController: TourController = new TourController();

  public routes(app: Application): void {
    app
      .route("/mural")
      .get(this.muralController.showAll.bind(this.muralController))
      .post(authMiddleware, this.muralController.create.bind(this.muralController));

    app
      .route("/mural/:id")
      .get(this.muralController.show.bind(this.muralController))
      .put(authMiddleware, this.muralController.update.bind(this.muralController));

    app
      .route("/borough")
      .get(this.boroughController.showAll.bind(this.boroughController))
      .post(authMiddleware, this.boroughController.create.bind(this.boroughController));

    app
      .route("/borough/:id")
      .get(this.boroughController.show.bind(this.boroughController))
      .put(authMiddleware, this.boroughController.update.bind(this.boroughController));

    app
      .route("/artist")
      .get(this.artistController.showAll.bind(this.artistController))
      .post(authMiddleware, this.artistController.create.bind(this.artistController));

    app
      .route("/artist/:id")
      .get(this.artistController.show.bind(this.artistController))
      .put(authMiddleware, this.artistController.update.bind(this.artistController));

    app
      .route("/tour")
      .get(this.tourController.showAll.bind(this.tourController))
      .post(authMiddleware, this.tourController.create.bind(this.tourController));

    app
      .route("/tour/:id")
      .get(this.tourController.show.bind(this.tourController))
      .put(authMiddleware, this.tourController.update.bind(this.tourController));

    app
      .route("/collection")
      .get(this.collectionController.showAll.bind(this.collectionController))
      .post(authMiddleware, this.collectionController.create.bind(this.collectionController));

    app
      .route("/collection/:id")
      .get(this.collectionController.show.bind(this.collectionController))
      .put(authMiddleware, this.collectionController.update.bind(this.collectionController));
  }
}
