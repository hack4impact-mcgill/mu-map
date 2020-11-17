import { Borough } from "../borough.model";
import { database } from "../../config/database";

beforeEach(async () => {
  await Borough.sync({ force: true });
});

test("create borough", async () => {
  expect.assertions(1);
  const params = {
    name: "test",
  };
  const artist = await Borough.create<Borough>(params).catch((err: Error) =>
    fail("Creating borough failed.")
  );
  expect(artist.id).toEqual(1);
});

test("get borough", async () => {
  expect.assertions(3);
  const params = {
    name: "test",
  };
  await Borough.create<Borough>(params)
  const artist = await Borough.findByPk(1);
  expect(artist).not.toEqual(null);
  expect(artist!.id).toEqual(1);
  expect(artist!.name).toEqual("test");
});

//TODO can we think of more tests to make sure our database works as expected?

afterAll(async () => {
  await database.close();
});
