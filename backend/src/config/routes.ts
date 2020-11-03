import { Request, Response } from "express";
import { TestApi } from "../controllers/testApi.controller";

export class Routes {
  public testApi: TestApi = new TestApi();

  public routes(app: any): void {
    app.route("/").get(this.testApi.index);

    app.route("/testapi").get(this.testApi.index);
  }
}