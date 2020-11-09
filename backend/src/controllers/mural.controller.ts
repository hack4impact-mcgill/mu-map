import { Request, Response } from "express";
import { Mural, MuralInterface } from "../models/mural.model";
import { UpdateOptions } from "sequelize";

export class MuralController {
  // GET /mural
  public index(req: Request, res: Response) {
    res.json({
      message: "Hello from the mural controller.",
    });
  }

  // POST /mural
  public create(req: Request, res: Response) {
    const params: MuralInterface = req.body;

    Mural.create<Mural>(params)
      .then((mural: Mural) => res.status(201).json(mural))
      .catch((err: Error) => res.status(500).json(err));
  }

  // GET /mural/:id     returns mural by id
  public show(req: Request, res: Response) {
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

  // PUT /mural/:id   update properties of a mural by id
  public update(req: Request, res: Response) {
    const muralId: number = Number(req.params.id);
    const params: MuralInterface = req.body;

    const update: UpdateOptions = {
      where: { id: muralId },
    };

    //TODO first check if that id exists

    Mural.update(params, update)
      .then(() => res.status(202).json({ data: "successfully updated" }))
      .catch((err: Error) => res.status(500).json(err));
  }
}
