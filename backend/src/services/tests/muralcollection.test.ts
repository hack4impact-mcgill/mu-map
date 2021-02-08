import { MuralCollection } from "../../models/muralcollection.model";
import { MuralCollectionService } from "../muralcollection.service";
import { Mural } from "../../models/mural.model";

const params = {
  name: "testCollection",
  description: "des",
};

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
    coordinates: {
      type: "Point",
      coordinates: [-87.123123, 41.232454],
    },
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
    coordinates: {
      type: "Point",
      coordinates: [-87.123123, 41.232454],
    },
  };
  await Mural.create<Mural>(params2);
});

test("create mural collection", async () => {
  expect.assertions(3);
  const collectionService: MuralCollectionService = new MuralCollectionService();

  const murals: number[] = [1, 2];
  const create = await collectionService
    .create(params, murals)
    .catch((err: Error) => fail());
  expect(create.body.id).toEqual(1);
  expect(create.body.name).toEqual("testCollection");
  expect(create.body.description).toEqual("des");
});

test("show valid mural collection", async () => {
  expect.assertions(3);
  const collectionService: MuralCollectionService = new MuralCollectionService();

  const murals: number[] = [1, 2];
  const create = await collectionService
    .create(params, murals)
    .catch((err: Error) => fail());

  const show = await collectionService
    .show(create.body.id)
    .catch((err: Error) => fail());
  expect(show.id).toEqual(create.body.id);
  expect(show.name).toEqual(create.body.name);
  expect(show.description).toEqual(create.body.description);
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
  expect.assertions(3);
  const collectionService: MuralCollectionService = new MuralCollectionService();

  const murals: number[] = [1, 2];
  const create = await collectionService
    .create(params, murals)
    .catch((err: Error) => fail());
  const collection = create.body;

  const updateParams = {
    name: "testCollection2",
    description: "cri",
  };
  await collectionService
    .update(collection.id, updateParams)
    .catch((err: Error) => fail());

  const show = await collectionService
    .show(collection.id)
    .catch((err: Error) => {
      fail("Could not find the mural collection by ID");
    });

  expect(show.id).toEqual(collection.id);
  expect(show.name).toEqual("testCollection2");
  expect(show.description).toEqual("cri");
});

test("update invalid mural collection", async () => {
  expect.assertions(1);
  const collectionService: MuralCollectionService = new MuralCollectionService();

  await collectionService
    .update(1, params)
    .then(() => fail())
    .catch((err: Error) => expect(true).toEqual(true));
});
