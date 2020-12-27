import { database } from "../../config/database";
import { Artist } from "../../models/artist.model";
import { ArtistService } from "../artist.service";

beforeEach(async () => {
  await Artist.sync({ force: true });
});

test("create artist", async () => {
  expect.assertions(3);
  const artistService: ArtistService = new ArtistService();
  const params = {
    name: "testartist",
  };
  const create = await artistService.create(params);
  expect(create.success).toEqual(true);
  expect(create.body!.id).toEqual(1);
  expect(create.body!.name).toEqual("testartist");
});

// create() does not accept params if name is missing

test("show valid artist", async () => {
  expect.assertions(3);
  const artistService: ArtistService = new ArtistService();
  const params = {
    name: "testartist",
  };
  const create = await artistService.create(params);
  if (!create.success) {
    fail("Creating artist failed.");
  }
  const artist = create.body!;

  const show = await artistService.show(artist.id);
  expect(show.success).toEqual(true);
  expect(show.artist!.id).toEqual(artist.id);
  expect(show.artist!.name).toEqual(artist.name);
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
  expect.assertions(3);
  const artistService: ArtistService = new ArtistService();
  const params = {
    name: "testartist",
  };
  const create = await artistService.create(params);
  if (!create.success) {
    fail("Creating artist failed.");
  }
  const artist = create.body!;

  const newparams = {
    name: "newartist",
  };

  const update = await artistService.update(artist.id, newparams);
  expect(update.success).toEqual(true);

  const show = await artistService
    .show(artist.id)
    .catch((err: Error) => fail("Could not find this artist by ID."));
  const updatedArtist = show.artist!;
  expect(updatedArtist.id).toEqual(artist.id);
  expect(updatedArtist.name).toEqual("newartist");
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
