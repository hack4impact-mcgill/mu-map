import { database } from "../../config/database";
import { EmptyResultError } from "sequelize";
import { ArtistController } from "../artist.controller";

jest.mock("../../services/artist.service");

const mockResponse = () => {
  const res = {} as any;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockPOSTRequest = (artistName: String | undefined) => {
  return {
    body: { name: artistName },
  } as any;
};

const mockGETRequest = (artistId: Number) => {
  return {
    params: { id: artistId },
  } as any;
};

const mockPUTRequest = (artistId: Number, artistName: String | undefined) => {
  return {
    params: { id: artistId },
    body: { name: artistName },
  } as any;
};

test("valid POST request", async () => {
  expect.assertions(2);
  const req = mockPOSTRequest("testartist");
  const res = mockResponse();

  const artistController: ArtistController = new ArtistController();
  artistController.artistService.create = jest.fn().mockResolvedValue({
    body: {
      id: 1,
      name: "testartist",
    },
    success: true,
  });

  await artistController.create(req, res);

  expect(res.status).toHaveBeenCalledWith(201);
  expect(res.json).toHaveBeenCalledWith(
    expect.objectContaining({
      body: expect.objectContaining({
        id: 1,
        name: "testartist",
      }),
    })
  );
});

test("invalid POST request", async () => {
  expect.assertions(1);
  const req = mockPOSTRequest(undefined);
  const res = mockResponse();

  const artistController: ArtistController = new ArtistController();
  artistController.artistService.create = jest.fn().mockImplementation(() => {
    throw new Error();
  });
  await artistController.create(req, res);

  expect(res.status).toHaveBeenCalledWith(500);
});

test("valid GET request", async () => {
  expect.assertions(2);
  const req = mockGETRequest(1);
  const res = mockResponse();

  const artistController: ArtistController = new ArtistController();
  artistController.artistService.show = jest.fn().mockResolvedValue({
    artist: {
      id: 1,
      name: "testartist",
    },
    success: true,
  });

  await artistController.show(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith(
    expect.objectContaining({
      artist: expect.objectContaining({
        id: 1,
        name: "testartist",
      }),
    })
  );
});

test("artist not found GET request", async () => {
  expect.assertions(2);
  const req = mockGETRequest(1);
  const res = mockResponse();

  const artistController: ArtistController = new ArtistController();
  artistController.artistService.show = jest.fn().mockImplementation(() => {
    throw new EmptyResultError();
  });
  await artistController.show(req, res);

  expect(res.status).toHaveBeenCalledWith(404);
  expect(res.json).toHaveBeenCalledWith({
    error: "Artist not found by id!",
  });
});

test("invalid GET request", async () => {
  expect.assertions(1);
  const req = mockGETRequest(1);
  const res = mockResponse();

  const artistController: ArtistController = new ArtistController();
  artistController.artistService.show = jest.fn().mockImplementation(() => {
    throw new Error();
  });
  await artistController.show(req, res);

  expect(res.status).toHaveBeenCalledWith(500);
});

test("valid PUT request", async () => {
  expect.assertions(2);
  const req = mockPUTRequest(1, "testartist");
  const res = mockResponse();

  const artistController: ArtistController = new ArtistController();
  artistController.artistService.update = jest.fn().mockResolvedValue({
    success: true,
  });

  await artistController.update(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({
    data: "successfully updated",
  });
});

test("artist not found PUT request", async () => {
  expect.assertions(2);
  const req = mockPUTRequest(1, "testartist");
  const res = mockResponse();

  const artistController: ArtistController = new ArtistController();
  artistController.artistService.update = jest.fn().mockImplementation(() => {
    throw new EmptyResultError();
  });
  await artistController.update(req, res);

  expect(res.status).toHaveBeenCalledWith(404);
  expect(res.json).toHaveBeenCalledWith({
    error: "Artist not found by id!",
  });
});

test("invalid PUT request", async () => {
  expect.assertions(1);
  const req = mockPUTRequest(1, "testartist");
  const res = mockResponse();

  const artistController: ArtistController = new ArtistController();
  artistController.artistService.update = jest.fn().mockImplementation(() => {
    throw new Error();
  });
  await artistController.update(req, res);

  expect(res.status).toHaveBeenCalledWith(500);
});

afterAll(async () => {
  await database.close();
});
