import { Borough } from "../../models/borough.model";
import { BoroughService } from "../borough.service";

beforeEach(async () => {
  await Borough.sync({ force: true });
});

test("create borough", async () => {
  expect.assertions(2);
  const boroughService: BoroughService = new BoroughService();
  const params = {
    name: "testBorough",
  };
  const create: Borough = await boroughService.create(params);
  expect(create.id).toEqual(1);
  expect(create.name).toEqual("testBorough");
});

test("show valid borough", async () => {
  expect.assertions(2);
  const boroughService: BoroughService = new BoroughService();
  const params = {
    name: "testBorough",
  };
  const create: Borough = await boroughService
    .create(params)
    .catch((err: Error) => fail());
  const show: Borough = await boroughService
    .show(create.id)
    .catch((err: Error) => fail());
  expect(show.id).toEqual(create.id);
  expect(show.name).toEqual(create.name);
});

test("Show invalid borough", async () => {
  expect.assertions(1);
  const boroughService: BoroughService = new BoroughService();
  await boroughService
    .show(1)
    .then(() => fail())
    .catch((err: Error) => expect(true).toEqual(true));
});

test("update borough", async () => {
  expect.assertions(2);
  const boroughService: BoroughService = new BoroughService();
  const params = {
    name: "testBorough",
  };

  const borough: Borough = await boroughService
    .create(params)
    .catch((err: Error) => fail());
  const updateParams = {
    name: "testBorough2",
  };
  await boroughService
    .update(borough.id, updateParams)
    .catch((err: Error) => fail());

  const updatedBorough: Borough = await boroughService
    .show(borough.id)
    .catch((err: Error) => fail("Could not find the borough by ID"));
  expect(updatedBorough.id).toEqual(borough.id);
  expect(updatedBorough.name).toEqual("testBorough2");
});

test("update invalid borough", async () => {
  expect.assertions(1);
  const boroughService: BoroughService = new BoroughService();
  const params = {
    name: "testBorough",
  };
  await boroughService
    .update(1, params)
    .then(() => fail())
    .catch((err: Error) => expect(true).toEqual(true));
});
