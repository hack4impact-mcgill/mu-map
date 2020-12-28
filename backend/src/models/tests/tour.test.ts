import { database } from "../../config/database";
import { Mural } from "../mural.model";
import { Borough } from "../borough.model";
import { Artist } from "../artist.model";
import { Tour } from "../tour.model";

beforeEach(async () => {
  await database.sync({ force: true });
  //we can assume the following lines work, they are tested in another test suite
  await Artist.create<Artist>({ name: "testartist" });
  await Borough.create<Borough>({ name: "testborough" });
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
  await Mural.create<Mural>(params);
});

test("create tour", async () => {
  expect.assertions(1);
  const params = {
    name: "testtour",
    description: "asd",
  };
  const tour = await Tour.create<Tour>(params).catch((err: Error) =>
    fail("Creating tour failed.")
  );
  expect(tour.id).toEqual(1);
});

test("get tour", async () => {
  expect.assertions(3);
  const params = {
    name: "testtour",
    description: "asd",
  };
  await Tour.create<Tour>(params).catch((err: Error) =>
    fail("Creating tour failed.")
  );
  const artist = await Tour.findByPk(1);
  expect(artist).not.toEqual(null);
  expect(artist!.id).toEqual(1);
  expect(artist!.name).toEqual("testtour");
});

test("find tour associated with mural", async () => {
  expect.assertions(3);
  //note how we create a new tour here at same time we create a new mural!
  const mural = await Mural.create<Mural>(
    {
      name: "testmural2",
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
      tours: [{ name: "findme", description: "asdasdasd2" }],
    },
    {
      include: [{ model: Tour, as: "tours" }],
    }
  );

  const tour = await Tour.findOne({
    where: {
      name: "findme",
    },
  });
  expect(tour).not.toEqual(null);
  expect(tour!.description).toEqual("asdasdasd2");
  expect(tour!.name).toEqual("findme");
});

test("associate already existing mural with tour", async () => {
  expect.assertions(8);
  const params = {
    name: "testtour",
    description: "asd",
  };
  const tour = await Tour.create<Tour>(params).catch((err: Error) =>
    fail("Creating tour failed.")
  );
  await tour.addMural(1);
  let res = await tour.getMurals();
  let res2 = await tour.hasMural(1);
  let res3 = await tour.countMurals();
  expect(res[0].name).toEqual("testmural");
  expect(res.length).toEqual(1);
  expect(res2).toEqual(true);
  expect(res3).toEqual(1);

  const mural = await Mural.create<Mural>({
    name: "testmural2",
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
  });

  await tour.addMural(2);
  res = await tour.getMurals();
  res2 = await tour.hasMural(2);
  res3 = await tour.countMurals();
  expect(res[1].name).toEqual("testmural2");
  expect(res.length).toEqual(2);
  expect(res2).toEqual(true);
  expect(res3).toEqual(2);
});

test("create and associate new mural to tour", async () => {
  expect.assertions(4);
  const params = {
    name: "testtour",
    description: "asd",
  };

  const tour = await Tour.create<Tour>(params).catch((err: Error) =>
    fail("Creating tour failed.")
  );
  await tour.createMural({
    name: "testmural123",
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
  });
  let res = await tour.getMurals();
  let res2 = await tour.hasMural(2);
  let res3 = await tour.countMurals();
  expect(res[0].name).toEqual("testmural123");
  expect(res.length).toEqual(1);
  expect(res2).toEqual(true);
  expect(res3).toEqual(1);
});

test("remove associated mural", async () => {
  expect.assertions(4);
  const params = {
    name: "testTour",
    description: "asd",
  };

  const tour = await Tour.create<Tour>(params).catch((err: Error) =>
    fail("Creating tour failed.")
  );

  await tour.addMural(1);
  let hasMural = await tour.hasMural(1);
  let muralCnt = await tour.countMurals();
  expect(hasMural).toEqual(true);
  expect(muralCnt).toEqual(1);

  await tour.removeMural(1);
  hasMural = await tour.hasMural(1);
  muralCnt = await tour.countMurals();
  expect(hasMural).toEqual(false);
  expect(muralCnt).toEqual(0);
});

