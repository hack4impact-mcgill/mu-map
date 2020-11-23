import { database } from "../../config/database";
import { Mural } from "../mural.model";
import { Borough } from "../borough.model";
import { Artist } from "../artist.model";
import { Tour } from "../tour.model";

beforeAll(async () => {
  await Mural.belongsTo(Borough, {
    foreignKey: { allowNull: false, name: "boroughId" },
  });
  await Mural.belongsTo(Artist, {
    foreignKey: { allowNull: false, name: "artistId" },
  });
  Mural.belongsToMany(Tour, {
    foreignKey: "muralId",
    through: "murals_in_tour",
    as: "tours",
  });
  Tour.belongsToMany(Mural, {
    foreignKey: "tourId",
    through: "murals_in_tour",
    as: "murals",
  });
});

beforeEach(async () => {
  await database.sync({ force: true });
  //we can assume the following lines work, they are tested in another test suite
  const artist = await Artist.create<Artist>({ name: "testartist" });
  const borough = await Borough.create<Borough>({ name: "testborough" });
});

test("create mural", async () => {
  expect.assertions(1);
  const params = {
    name: "testmural",
    boroughId: "1",
    artistId: "1",
    year: 1234,
    city: "montreal",
    address: "1234 street",
    partners: ["partner 1", "partner 2"],
  };
  const mural = await Mural.create<Mural>(params).catch((err: Error) =>
    fail("Creating mural failed.")
  );
  expect(mural.id).toEqual(1);
});

test("create mural wrong foreign key", async () => {
  expect.assertions(1);
  const params = {
    name: "testmural",
    boroughId: "2",
    artistId: "1",
    year: 1234,
    city: "montreal",
    address: "1234 street",
    partners: ["partner 1", "partner 2"],
  };
  await expect(Mural.create<Mural>(params)).rejects.toEqual(expect.any(Error));
});

test("create mural missing foreign key", async () => {
  expect.assertions(1);
  const params = {
    name: "testmural",
    artistId: "1",
    year: 1234,
    city: "montreal",
    address: "1234 street",
    partners: ["partner 1", "partner 2"],
  };
  await expect(Mural.create<Mural>(params)).rejects.toEqual(expect.any(Error));
});

test("get mural", async () => {
  expect.assertions(3);
  const params = {
    name: "testmural",
    boroughId: "1",
    artistId: "1",
    year: 1234,
    city: "montreal",
    address: "1234 street",
    partners: ["partner 1", "partner 2"],
  };
  await Mural.create<Mural>(params).catch((err: Error) =>
    fail("Creating mural failed.")
  );
  const mural = await Mural.findByPk(1);
  expect(mural).not.toEqual(null);
  expect(mural!.id).toEqual(1);
  expect(mural!.name).toEqual("testmural");
});

test("ensure foreign key constraint", async () => {
  //make sure it doesnt let us destroy a borough while a mural points to it
  const params = {
    name: "testmural",
    boroughId: "1",
    artistId: "1",
    year: 1234,
    city: "montreal",
    address: "1234 street",
    partners: ["partner 1", "partner 2"],
  };
  await Mural.create<Mural>(params).catch((err: Error) =>
    fail("Creating mural failed.")
  );
  await expect(
    Borough.destroy({
      where: {
        id: 1,
      },
    })
  ).rejects.toEqual(expect.any(Error));
});

test("test virtual sequelize functions for tour association", async () => {
  const params = {
    name: "testmural",
    boroughId: "1",
    artistId: "1",
    year: 1234,
    city: "montreal",
    address: "1234 street",
    partners: ["partner 1", "partner 2"],
  };
  const mural = await Mural.create<Mural>(params).catch((err: Error) =>
    fail("Creating mural failed.")
  );
  const tourparams = {
    name: "testtour",
    description: "asd",
  };
  const tour = await Tour.create<Tour>(tourparams).catch((err: Error) =>
    fail("Creating tour failed.")
  );
  await mural.addTour(1);
  let tourarray = await mural.getTours();
  let hasTour = await mural.hasTour(1);
  let tourCnt = await mural.countTours();
  expect(tourarray[0].name).toEqual("testtour");
  expect(tourarray.length).toEqual(1);
  expect(hasTour).toEqual(true);
  expect(tourCnt).toEqual(1);
});

//TODO can we think of more tests to make sure our database works as expected?

afterAll(async () => {
  await database.close();
});
