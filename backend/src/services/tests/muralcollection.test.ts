import { database } from "../../config/database";
import { MuralCollection } from "../../models/muralcollection.model";
import { MuralCollectionService } from "../muralcollection.service";

beforeEach(async () => {
  await MuralCollection.sync({ force: true });
});

test("create mural collection", async () => {
  expect.assertions(4);
  const collectionService: MuralCollectionService = new MuralCollectionService();
  const params = {
    name: "testCollection",
    description: "des",
  };
  const murals = [1, 2, 3];
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
  const murals = [1, 2, 3];
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
  const murals = [1, 2, 3];
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
