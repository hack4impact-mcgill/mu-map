import { database } from "../../config/database";
import { EmptyResultError } from "sequelize";
import { MuralCollectionController } from "../muralcollection.controller";

jest.mock("../../services/muralcollection.service");

const mockResponse = () => {
  const res = {} as any;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockPOSTRequest = (
  collectionName: String | undefined,
  collectionDescription: String | undefined,
  collectionMurals: number[]
) => {
  return {
    body: {
      collection: {
        name: collectionName,
        description: collectionDescription,
      },
      murals: collectionMurals,
    },
  } as any;
};

const mockGETRequest = (collectionId: Number) => {
  return {
    params: { id: collectionId },
  } as any;
};

const mockPUTRequest = (collectionId: Number, collectionName: String) => {
  return {
    params: { id: collectionId },
    body: { name: collectionName },
  } as any;
};

test("valid POST request", async () => {
  expect.assertions(2);
  const req = mockPOSTRequest("testCollection", "des", [1, 2, 3]);
  const res = mockResponse();

  const collectionController: MuralCollectionController = new MuralCollectionController();
  collectionController.collectionService.create = jest.fn().mockResolvedValue({
    body: {
      id: 1,
      collection: {
        name: "testCollectoin",
        description: "des",
      },
      murals: [1, 2, 3],
    },
    success: true,
  });

  await collectionController.create(req, res);

  expect(res.status).toHaveBeenCalledWith(201);

  expect(res.json).toHaveBeenCalledWith(
    expect.objectContaining({
      body: expect.objectContaining({
        id: 1,
        collection: {
          name: "testCollectoin",
          description: "des",
        },
        murals: [1, 2, 3],
      }),
    })
  );
});

test("invalid POST request", async () => {
  expect.assertions(1);
  const req = mockPOSTRequest(undefined, "des", [1, 2, 3]);
  const res = mockResponse();

  const collectionController: MuralCollectionController = new MuralCollectionController();
  collectionController.collectionService.create = jest
    .fn()
    .mockImplementation(() => {
      throw new Error();
    });
  await collectionController.create(req, res);

  expect(res.status).toHaveBeenLastCalledWith(500);
});

test("valid GET request", async () => {
  expect.assertions(2);
  const req = mockGETRequest(1);
  const res = mockResponse();

  const collectionController: MuralCollectionController = new MuralCollectionController();

  collectionController.collectionService.show = jest.fn().mockResolvedValue({
    collection: {
      id: 1,
      name: "testCollection",
    },
    success: true,
  });

  await collectionController.show(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith(
    expect.objectContaining({
      collection: expect.objectContaining({
        id: 1,
        name: "testCollection",
      }),
    })
  );
});

test("collection not found in GET request", async () => {
  expect.assertions(2);
  const req = mockGETRequest(1);
  const res = mockResponse();
  const collectionController: MuralCollectionController = new MuralCollectionController();

  collectionController.collectionService.show = jest
    .fn()
    .mockImplementation(() => {
      throw new EmptyResultError();
    });
  await collectionController.show(req, res);

  expect(res.status).toHaveBeenCalledWith(404);
  expect(res.json).toHaveBeenCalledWith({
    error: "No collection found with this id",
  });
});

test("valid PUT request", async () => {
  expect.assertions(2);
  const req = mockPUTRequest(1, "testCollection");
  const res = mockResponse();

  const collectionController: MuralCollectionController = new MuralCollectionController();
  collectionController.collectionService.update = jest.fn().mockResolvedValue({
    success: true,
  });

  await collectionController.update(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({
    data: "Successfully updated",
  });
});

test("collection not found PUT request", async () => {
  expect.assertions(1);
  const req = mockPUTRequest(1, "testCollection");
  const res = mockResponse();

  const collectionController: MuralCollectionController = new MuralCollectionController();
  collectionController.collectionService.update = jest
    .fn()
    .mockImplementation(() => {
      throw new Error();
    });
  await collectionController.update(req, res);

  expect(res.status).toHaveBeenCalledWith(500);
});

afterAll(async () => {
  await database.close();
});
