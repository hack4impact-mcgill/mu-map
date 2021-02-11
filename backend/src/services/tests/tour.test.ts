import { Tour } from "../../models/tour.model";
import { TourService } from "../tour.service";

beforeEach(async () => {
  await Tour.sync({ force: true });
});

test("create tour", async () => {
  expect.assertions(2);
  const tourService: TourService = new TourService();
  const params = {
    name: "testtour",
    description: "testtour",
  };
  const create = await tourService
    .create(params, [])
    .catch((err: Error) => fail());
  expect(create.tour.id).toEqual(1);
  expect(create.tour.name).toEqual("testtour");
  expect(create.muralsNotFound);
});

test("show valid tour", async () => {
  expect.assertions(2);
  const tourService: TourService = new TourService();
  const params = {
    name: "testtour",
    description: "testtour",
  };
  const create = await tourService
    .create(params, [])
    .catch((err: Error) => fail());
  const tour = create.tour;

  const show = await tourService.show(tour.id).catch((err: Error) => fail());
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
