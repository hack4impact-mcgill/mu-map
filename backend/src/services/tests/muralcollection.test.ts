import { database } from "../../config/database";
import { MuralCollection } from "../../models/muralcollection.model";
import { MuralCollectionService } from "../muralcollection.service";
import { Mural } from "../../models/mural.model";
import { Borough } from "../../models/borough.model";
import { Artist } from "../../models/artist.model";

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
  await MuralCollection.sync({ force: true });
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

  const params2 = {
    name: "testmural2",
    boroughId: "1",
    artistId: "1",
    year: 1234,
    city: "montreal",
    address: "1234 street",
    partners: ["partner 1", "partner 2"],
  };
  await Mural.create<Mural>(params2);
});

test("create mural collection", async () => {
  expect.assertions(4);
  const collectionService: MuralCollectionService = new MuralCollectionService();
  const params = {
    name: "testCollection",
    description: "des",
  };
  const murals: number[] = [1, 2];
  const create = await collectionService.create(params, murals);
  expect(create.success).toEqual(true);
  expect(create.body.id).toEqual(1);
  expect(create.body.name).toEqual("testCollection");
  expect(create.body.description).toEqual("des");
});

test("show valid mural collection", async () => {
  expect.assertions(4);
  const collectionService: MuralCollectionService = new MuralCollectionService();
  const params = {
    name: "testCollection",
    description: "des",
  };
  const murals: number[] = [1, 2];
  const create = await collectionService.create(params, murals);
  if (!create.success) {
    fail("Creating mural collection failed.");
  }

  const show = await collectionService.show(create.body.id);
  expect(show.success).toEqual(true);
  expect(show.collection.id).toEqual(create.body.id);
  expect(show.collection.name).toEqual(create.body.name);
  expect(show.collection.description).toEqual(create.body.description);
});

test("show invalid collection", async () => {
  expect.assertions(1);
  const collectionService: MuralCollectionService = new MuralCollectionService();
  await collectionService
    .show(1)
    .then(() => fail())
    .catch((err: Error) => expect(true).toEqual(true));
});

test("update mural collection", async () => {
  expect.assertions(4);
  const collectionService: MuralCollectionService = new MuralCollectionService();
  const params = {
    name: "testCollection",
    description: "des",
  };
  const murals: number[] = [1, 2];
  const create = await collectionService.create(params, murals);
  if (!create.success) {
    fail("Creating mural collection failed.");
  }
  const collection = create.body;

  const updateParams = {
    name: "testCollection2",
    description: "cri",
  };
  const update = await collectionService.update(collection.id, updateParams);
  expect(update.success).toEqual(true);

  const show = await collectionService
    .show(collection.id)
    .catch((err: Error) => {
      fail("Could not find the mural collection by ID");
    });

  const updateCollection = show.collection;
  expect(updateCollection.id).toEqual(collection.id);
  expect(updateCollection.name).toEqual("testCollection2");
  expect(updateCollection.description).toEqual("cri");
});

test("update invalid mural collection", async () => {
  expect.assertions(1);
  const collectionService: MuralCollectionService = new MuralCollectionService();
  const params = {
    name: "testCollection",
    description: "des",
  };
  await collectionService
    .update(1, params)
    .then(() => fail())
    .catch((err: Error) => expect(true).toEqual(true));
});

afterAll(async () => {
  await database.close();
});
