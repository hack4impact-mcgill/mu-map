import { Model, DataTypes } from "sequelize";
import { database } from "../config/database";

export class MuralsInTour extends Model {
  public muralId!: number;
  public tourId!: number;
}

MuralsInTour.init(
  {
    muralId: {
      type: DataTypes.INTEGER,
      references : {model : "murals", key : "id"},
      onDelete: 'CASCADE',
    },
    tourId: {
        type: DataTypes.INTEGER,
        references : {model : "tours", key : "id"},
        onDelete: 'CASCADE',
    },
  },
  {
    tableName: "murals_in_tour",
    sequelize: database,
  }
);

export interface MuralsInTourInterface {
  muralId: number,
  tourId: number,
}
