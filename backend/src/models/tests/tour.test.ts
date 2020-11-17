import { database } from "../../config/database";
import { Mural } from "../mural.model";
import { Borough } from "../borough.model";
import { Artist } from "../artist.model";
import { Tour } from "../tour.model"
import {MuralsInTour} from "../murals_in_tour.model"

beforeAll(async () => {

    await Mural.belongsTo(Borough, { foreignKey: { allowNull: false } });
    await Mural.belongsTo(Artist, { foreignKey: { allowNull: false } });
    Mural.belongsToMany(Tour, {
        foreignKey: "muralId",
        through: "murals_in_tour",
        as: "tours"
        });
    Tour.belongsToMany(Mural, {
        foreignKey: "tourId",
        through: "murals_in_tour",
        as: "murals"
        });
    await database.sync({force : true})

    //we can assume the following lines work, they are tested in another test suite
    const artist = await Artist.create<Artist>({ name: "testartist" });
    const borough = await Borough.create<Borough>({ name: "testborough" });
    const params = {
        name: "testmural",
        BoroughId: "1",
        ArtistId: "1",
        year: 1234,
        city: "montreal",
        address: "1234 street",
        partners: ["partner 1", "partner 2"],
      };
      const mural = await Mural.create<Mural>(params)
  });

  test("create tour", async () => {
    expect.assertions(1);
    const params = {
      name: "testtour",
      description: "asd"
    };
    const tour = await Tour.create<Tour>(params).catch((err: Error) =>
    fail("Creating tour failed.")
  );
  expect(tour.id).toEqual(1);
  });

  test("get tour", async () => {
    expect.assertions(3);
    const artist = await Tour.findByPk(1);
    expect(artist).not.toEqual(null);
    expect(artist!.id).toEqual(1);
    expect(artist!.name).toEqual("testtour");
  });

  test("find tour associated with mural", async () => {

    //note how we create a new tour here at same time we create a new mural!
      const mural = await Mural.create<Mural>({
        name: "testmural2",
        BoroughId: "1",
        ArtistId: "1",
        year: 1234,
        city: "montreal",
        address: "1234 street",
        partners: ["partner 1", "partner 2"],
        tours: [
            {name: "findme", description: "asdasdasd2"}
        ],
      },{
          include:[{model:Tour, as : 'tours'}]
      })

      const tour = await Tour.findOne({where : {
          name : "findme"
      }})
      expect(tour).not.toEqual(null);
      expect(tour!.description).toEqual("asdasdasd2");
      expect(tour!.name).toEqual("findme");

  })

  //TODO more tests!!

afterAll(async () => {
await database.close();
});


