import { EmptyResultError } from "sequelize";
import { TourController } from "../tour.controller";

jest.mock("../../services/tour.service");

const mockResponse = () => {
  const res = {} as any;
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const mockPOSTRequest = (tourName: String | undefined) => {
  return {
    body: { name: tourName },
  } as any;
};

const mockGETRequest = (tourId: Number) => {
  return {
    params: { id: tourId },
  } as any;
};

test("valid POST request", async () => {
  expect.assertions(2);
  const req = mockPOSTRequest("testtour");
  const res = mockResponse();

  const tourController: TourController = new TourController();
  tourController.tourService.create = jest.fn().mockResolvedValue({
    body: {
      id: 1,
      name: "testtour",
    },
    success: true,
  });

  await tourController.create(req, res);

  expect(res.status).toHaveBeenCalledWith(201);
  expect(res.json).toHaveBeenCalledWith(
    expect.objectContaining({
      body: expect.objectContaining({
        id: 1,
        name: "testtour",
      })
    })
  )
});

test("invalid POST request", async () => {
  expect.assertions(1);
  const req = mockPOSTRequest(undefined);
  const res = mockResponse();

  const tourController: TourController = new TourController();
  tourController.tourService.create = jest.fn().mockImplementation(() => {
    throw new Error();
  });
  await tourController.create(req, res);

  expect(res.status).toHaveBeenCalledWith(500);
});

test("valid GET request", async () => {
  expect.assertions(2);
  const req = mockGETRequest(1);
  const res = mockResponse();

  const tourController: TourController = new TourController();
  tourController.tourService.show = jest.fn().mockResolvedValue({
    tour: {
      id: 1,
      name: "testtour",
    },
    success: true,
  });

  await tourController.show(req, res);

  expect(res.status).toHaveBeenCalledWith(202);
  expect(res.json).toHaveBeenCalledWith(
    expect.objectContaining({
      tour: expect.objectContaining({
        id: 1,
        name: "testtour",
      }),
    })
  );
});

test("tour not found GET request", async () => {
  expect.assertions(2);
  const req = mockGETRequest(1);
  const res = mockResponse();

  const tourController: TourController = new TourController();
  tourController.tourService.show = jest.fn().mockImplementation(() => {
    throw new EmptyResultError();
  });
  await tourController.show(req, res);

  expect(res.status).toHaveBeenCalledWith(404);
  expect(res.json).toHaveBeenCalledWith({
    error: "No tour found with this id",
  });
});

test("invalid GET request", async () => {
  expect.assertions(1);
  const req = mockGETRequest(1);
  const res = mockResponse();

  const tourController: TourController = new TourController();
  tourController.tourService.show = jest.fn().mockImplementation(() => {
    throw new Error();
  });
  await tourController.show(req, res);

  expect(res.status).toHaveBeenCalledWith(500);
});