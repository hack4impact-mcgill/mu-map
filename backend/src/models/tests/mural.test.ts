import { database } from "../../config/database";
import { Mural } from "../mural.model";
import { Borough } from "../borough.model";
import { Artist } from "../artist.model";

beforeAll(async () => {
  //order is important as mural relies on the other 2
  await Borough.sync({force: true});
  await Artist.sync({force: true});
  await Mural.sync({force: true});
  //we can assume the following lines work, they are tested in another test suite
  const artist = await Artist.create<Artist>({name:"testartist"})
  const borough = await Borough.create<Borough>({name:"testborough"})
});

test("create mural", async () => {
  expect.assertions(1);
  const params = {
    name: "testmural",
    BoroughId: "1",
    ArtistId: "1",
    year: 1234,
    city: "montreal",
    address: "1234 street",
    partners: ["partner 1", "partner 2"],
  };
  const mural = await Mural.create<Mural>(params).catch((err: Error) =>
    fail("Creating mural failed.")
  );
  expect(mural.id).toEqual(1);
});

test("get mural", async () => {
  //TODO
});

//TODO: more tests for other fucntions and edge cases

afterAll(async () => {
  await database.close();
});