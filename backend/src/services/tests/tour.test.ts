import { database } from "../../config/database";
import { Tour } from "../../models/tour.model";
import { TourService } from "../tour.service";

beforeEach(async () => {
  await Tour.sync({ force: true });
});

test("create tour", async () => {
  expect.assertions(3);
  const tourService: TourService = new TourService();
  const params = {
    name: "testtour",
    description: "testtour",
  };
  const create = await tourService.create(params, []);
  expect(create.success).toEqual(true);
  expect(create.body!.id).toEqual(1);
  expect(create.body!.name).toEqual("testtour");
});

test("show valid tour", async () => {
  expect.assertions(2);
  const tourService: TourService = new TourService();
  const params = {
    name: "testtour",
    description: "testtour",
  };
  const create = await tourService.create(params, []);
  if (!create.success) {
    fail("Creating tour failed.");
  }
  const tour = create.body!;

  const show = await tourService.show(tour.id);
  expect(show.id).toEqual(tour.id);
  expect(show.name).toEqual(tour.name);
});

test("show invalid tour", async () => {
  expect.assertions(1);
  const tourService: TourService = new TourService();
  await tourService
    .show(1)
    .then(() => fail())
    .catch((err: Error) => expect(true).toEqual(true));
});
