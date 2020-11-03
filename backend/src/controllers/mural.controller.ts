import { Request, Response } from "express";
import { Mural, MuralInterface } from "../models/mural.model"
import { UpdateOptions } from "sequelize";

export class MuralController {

  public index(req: Request, res: Response) {
    res.json({
      message: "hello hello hello!!!!",
    });
  }

  public create(req: Request, res:  Response) {
    const params: MuralInterface = req.body;

    Mural.create<Mural>(params)
    .then((mural: Mural) => res.status(201).json(mural))
    .catch((err: Error) => res.status(500).json(err));
  }

  //function to return mural by id
  public show(req: Request, res: Response) {
    // todo add middleware to route so this comes in as number, or add another check?
    const muralId: number = Number(req.params.id);

    Mural.findByPk<Mural>(muralId)
      .then((mural: Mural | null) => {
        if (mural) {
          res.json(mural);
        } else {
          res.status(404).json({ errors: ["Mural not found by id!"] });
        }
      })
      .catch((err: Error) => res.status(500).json(err));
  }

  //function to update "name" of mural by id
  public update(req: Request, res: Response) {
    // todo add middleware to route so this comes in as number, or add another check?
    const muralId: number = Number(req.params.id);
    const params: MuralInterface = req.body;

    const update: UpdateOptions = {
      where: { id: muralId },
      limit: 1,
    };

    Mural.update(params, update)
      .then(() => res.status(202).json({ data: "successfully updated" }))
      .catch((err: Error) => res.status(500).json(err));
  }
}