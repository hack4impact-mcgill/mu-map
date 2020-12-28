import { Borough } from "../../models/borough.model";
import { BoroughService } from "../borough.service";

beforeEach(async () => {
  await Borough.sync({ force: true });
});

test("create borough", async () => {
  expect.assertions(3);
  const boroughService: BoroughService = new BoroughService();
  const params = {
    name: "testBorough",
  };
  const create = await boroughService.create(params);
  expect(create.success).toEqual(true);
  expect(create.body.id).toEqual(1);
  expect(create.body.name).toEqual("testBorough");
});

test("show valid borough", async () => {
  expect.assertions(3);
  const boroughService: BoroughService = new BoroughService();
  const params = {
    name: "testBorough",
  };
  const create = await boroughService.create(params);
  if (!create.success) {
    fail("Creating borough failed.");
  }
  const show = await boroughService.show(create.body.id);
  expect(show.success).toEqual(true);
  expect(show.borough.id).toEqual(create.body.id);
  expect(show.borough.name).toEqual(create.body.name);
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
  expect.assertions(3);
  const boroughService: BoroughService = new BoroughService();
  const params = {
    name: "testBorough",
  };

  const create = await boroughService.create(params);
  if (!create.success) {
    fail("Creating borough failed.");
  }
  const borough = create.body;

  const updateParams = {
    name: "testBorough2",
  };
  const update = await boroughService.update(borough.id, updateParams);
  expect(update.success).toEqual(true);

  const show = await boroughService
    .show(borough.id)
    .catch((err: Error) => fail("Could not find the borough by ID"));
  const updatedBorough = show.borough;
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
