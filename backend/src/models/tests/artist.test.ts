import { Artist } from "../artist.model";
import { database } from "../../config/database";

beforeAll(async () => {
  await Artist.sync({ force: true });
});

test("create artist", async () => {
  expect.assertions(1);
  const params = {
    name: "testartist",
  };
  const artist = await Artist.create<Artist>(params).catch((err: Error) =>
    fail("Creating artist failed.")
  );
  expect(artist.id).toEqual(1);
});

test("get artist", async () => {
  expect.assertions(3);
  const artist = await Artist.findByPk(1);
  expect(artist).not.toEqual(null);
  expect(artist!.id).toEqual(1);
  expect(artist!.name).toEqual("testartist");
});

//TODO can we think of more tests to make sure our database works as expected?

afterAll(async () => {
  await database.close();
});
