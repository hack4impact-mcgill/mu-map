import { database } from "../../config/database";
import { Mural } from "../mural.model";
import { Borough } from "../borough.model";
import { Artist } from "../artist.model";
import { MuralCollection } from "../muralcollection.model";

beforeAll(async () => {
  await Mural.belongsTo(Borough, {
    foreignKey: { allowNull: false, name: "boroughId" },
  });
  await Mural.belongsTo(Artist, {
    foreignKey: { allowNull: false, name: "artistId" },
  });
  await Mural.belongsToMany(MuralCollection, {
    foreignKey: "muralId",
    through: "murals_in_collection",
    as: "collections",
  });
  await MuralCollection.belongsToMany(Mural, {
    foreignKey: "collectionId",
    through: "murals_in_collection",
    as: "murals",
  });
});

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
  };
  await Mural.create<Mural>(params);
});

test("create collection", async () => {
  expect.assertions(1);
  const params = {
    name: "testcol",
    description: "asd",
  };
  const coll = await MuralCollection.create<MuralCollection>(
    params
  ).catch((err: Error) => fail("Creating collection failed."));
  expect(coll.id).toEqual(1);
});

test("get collection", async () => {
  expect.assertions(3);
  const params = {
    name: "testCollection",
    description: "asd",
  };
  await MuralCollection.create<MuralCollection>(params).catch((err: Error) =>
    fail("Creating collection failed.")
  );
  const collection = await MuralCollection.findByPk(1);
  expect(collection).not.toEqual(null);
  expect(collection!.id).toEqual(1);
  expect(collection!.name).toEqual("testCollection");
});

test("find collection associated with mural", async () => {
  expect.assertions(3);
  //note how we create a new collection here at same time we create a new mural!
  const mural = await Mural.create<Mural>(
    {
      name: "testmural2",
      boroughId: "1",
      artistId: "1",
      year: 1234,
      city: "montreal",
      address: "1234 street",
      partners: ["partner 1", "partner 2"],
      collections: [{ name: "findme", description: "asdasdasd2" }],
    },
    {
      include: [{ model: MuralCollection, as: "collections" }],
    }
  );

  const collection = await MuralCollection.findOne({
    where: {
      name: "findme",
    },
  });
  expect(collection).not.toEqual(null);
  expect(collection!.description).toEqual("asdasdasd2");
  expect(collection!.name).toEqual("findme");
});

test("associate already existing mural with collection", async () => {
  expect.assertions(8);
  const params = {
    name: "testCollection",
    description: "asd",
  };
  const collection = await MuralCollection.create<MuralCollection>(
    params
  ).catch((err: Error) => fail("Creating collection failed."));
  await collection.addMural(1);
  let res = await collection.getMurals();
  let res2 = await collection.hasMural(1);
  let res3 = await collection.countMurals();
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
  });

  await collection.addMural(2);
  res = await collection.getMurals();
  res2 = await collection.hasMural(2);
  res3 = await collection.countMurals();
  expect(res[1].name).toEqual("testmural2");
  expect(res.length).toEqual(2);
  expect(res2).toEqual(true);
  expect(res3).toEqual(2);
});

test("create and associate new mural to tour", async () => {
  expect.assertions(4);
  const params = {
    name: "testCollection",
    description: "asd",
  };

  const collection = await MuralCollection.create<MuralCollection>(
    params
  ).catch((err: Error) => fail("Creating collection failed."));
  await collection.createMural({
    name: "testmural123",
    boroughId: "1",
    artistId: "1",
    year: 1234,
    city: "montreal",
    address: "1234 street",
    partners: ["partner 1", "partner 2"],
  });
  let res = await collection.getMurals();
  let res2 = await collection.hasMural(2);
  let res3 = await collection.countMurals();
  expect(res[0].name).toEqual("testmural123");
  expect(res.length).toEqual(1);
  expect(res2).toEqual(true);
  expect(res3).toEqual(1);
});

test("remove associated mural", async () => {
  expect.assertions(4);
  const params = {
    name: "testCollection",
    description: "asd",
  };

  const collection = await MuralCollection.create<MuralCollection>(
    params
  ).catch((err: Error) => fail("Creating collection failed."));

  await collection.addMural(1);
  let hasMural = await collection.hasMural(1);
  let muralCnt = await collection.countMurals();
  expect(hasMural).toEqual(true);
  expect(muralCnt).toEqual(1);

  await collection.removeMural(1);
  hasMural = await collection.hasMural(1);
  muralCnt = await collection.countMurals();
  expect(hasMural).toEqual(false);
  expect(muralCnt).toEqual(0);
});

afterAll(async () => {
  await database.close();
});
