import { Artist } from "../../models/artist.model";
import { ArtistService } from "../artist.service";

beforeEach(async () => {
  await Artist.sync({ force: true });
});

test("create artist", async () => {
  expect.assertions(2);
  const artistService: ArtistService = new ArtistService();
  const params = {
    name: "testartist",
  };
  const create: Artist = await artistService.create(params);
  expect(create.id).toEqual(1);
  expect(create.name).toEqual("testartist");
});

// create() does not accept params if name is missing

test("show valid artist", async () => {
  expect.assertions(2);
  const artistService: ArtistService = new ArtistService();
  const params = {
    name: "testartist",
  };
  const artist: Artist = await artistService.create(params);

  const showArtist: Artist = await artistService.show(artist.id);
  expect(showArtist.id).toEqual(artist.id);
  expect(showArtist.name).toEqual(artist.name);
});

test("show invalid artist", async () => {
  expect.assertions(1);
  const artistService: ArtistService = new ArtistService();
  await artistService
    .show(1)
    .then(() => fail())
    .catch((err: Error) => expect(true).toEqual(true));
});

test("update artist", async () => {
  expect.assertions(2);
  const artistService: ArtistService = new ArtistService();
  const params = {
    name: "testartist",
  };
  const artist: Artist = await artistService.create(params);

  const newparams = {
    name: "newartist",
  };

  await artistService.update(artist.id, newparams);

  const show: Artist = await artistService
    .show(artist.id)
    .catch((err: Error) => fail("Could not find this artist by ID."));
  expect(show.id).toEqual(artist.id);
  expect(show.name).toEqual("newartist");
});

test("update invalid artist", async () => {
  expect.assertions(1);
  const artistService: ArtistService = new ArtistService();
  const params = {
    name: "newartist",
  };
  await artistService
    .update(1, params)
    .then(() => fail())
    .catch((err: Error) => expect(true).toEqual(true));
});
