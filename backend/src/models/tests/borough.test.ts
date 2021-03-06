import { Borough } from "../borough.model";
import { database } from "../../config/database";

const params = {
  name: "testborough",
};

beforeEach(async () => {
  await Borough.sync({ force: true });
});

test("create borough", async () => {
  expect.assertions(1);
  const artist = await Borough.create<Borough>(params).catch((err: Error) =>
    fail("Creating borough failed.")
  );
  expect(artist.id).toEqual(1);
});

test("get borough", async () => {
  expect.assertions(3);
  await Borough.create<Borough>(params).catch((err: Error) =>
    fail("Creating borough failed.")
  );
  const artist = await Borough.findByPk(1);
  expect(artist).not.toEqual(null);
  expect(artist!.id).toEqual(1);
  expect(artist!.name).toEqual("testborough");
});

//TODO can we think of more tests to make sure our database works as expected?

