import { database } from "../../config/database";
import { Mural } from "../mural.model";
import { Borough } from "../borough.model";
import { Artist } from "../artist.model";
import { Tour } from "../tour.model";
import { UpdateOptions } from "sequelize";

const params = {
  name: "testmural",
  boroughId: "1",
  artistId: "1",
  year: 1234,
  city: "montreal",
  address: "1234 street",
  partners: ["partner 1", "partner 2"],
  coordinates: {
    type: "Point",
    coordinates: [-87.123123, 41.232454],
  },
};

beforeEach(async () => {
  await database.sync({ force: true });
  //we can assume the following lines work, they are tested in another test suite
  const artist = await Artist.create<Artist>({ name: "testartist" });
  const borough = await Borough.create<Borough>({ name: "testborough" });
});

test("create mural", async () => {
  expect.assertions(1);
  const mural = await Mural.create<Mural>(params).catch((err: Error) =>
    fail("Creating mural failed.")
  );
  expect(mural.id).toEqual(1);
});

test("create mural wrong foreign key", async () => {
  expect.assertions(1);
  const params2 = {
    name: "testmural",
    boroughId: "2",
    artistId: "1",
    year: 1234,
    city: "montreal",
    address: "1234 street",
    partners: ["partner 1", "partner 2"],
  };
  await expect(Mural.create<Mural>(params2)).rejects.toEqual(expect.any(Error));
});

test("create mural missing foreign key", async () => {
  expect.assertions(1);
  const params2 = {
    name: "testmural",
    artistId: "1",
    year: 1234,
    city: "montreal",
    address: "1234 street",
    partners: ["partner 1", "partner 2"],
  };
  await expect(Mural.create<Mural>(params2)).rejects.toEqual(expect.any(Error));
});

test("get mural", async () => {
  expect.assertions(3);
  await Mural.create<Mural>(params).catch((err: Error) =>
    fail("Creating mural failed.")
  );
  const mural = await Mural.findByPk(1);
  expect(mural).not.toEqual(null);
  expect(mural!.id).toEqual(1);
  expect(mural!.name).toEqual("testmural");
});

test("ensure foreign key constraint", async () => {
  expect.assertions(1);
  //make sure it doesnt let us destroy a borough while a mural points to it
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

// The sequelize functions on the mural side should not be used...
// A mural should not "know" its tours, instead, add murals to tours / collections using their functions
test("test virtual sequelize functions for tour association", async () => {
  expect.assertions(4);
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

test("test updating coordinates", async () => {
  expect.assertions(4);
  const mural = await Mural.create<Mural>(params).catch((err: Error) =>
    fail("Creating mural failed.")
  );
  expect(mural.id).toEqual(1);
  expect(mural.coordinates.coordinates).toEqual([-87.123123, 41.232454]);
  const update: UpdateOptions = {
    where: { id: 1 },
  };
  const newcoord = {
    coordinates: {
      type: "Point",
      coordinates: [-69.123123, 69.232454],
    },
  };
  await Mural.update(newcoord, update);
  const mural2 = await Mural.findByPk<Mural>(1).catch((err: Error) =>
    fail("Finding mural failed.")
  );
  expect(mural2!.id).toEqual(1);
  expect(mural2!.coordinates.coordinates).toEqual([-69.123123, 69.232454]);
});

