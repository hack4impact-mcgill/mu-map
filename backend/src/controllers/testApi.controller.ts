import { Request, Response } from "express";

export class TestApi {
  public index(req: Request, res: Response) {
    res.json({
      message: "hello hello hello!!!!",
    });
  }
}