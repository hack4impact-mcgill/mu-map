import {database} from "../../config/database";
import {EmptyResultError} from "sequelize";
import {BoroughController} from "../borough.controller";


/**
 * Mock the business logic from the service borough
 */
jest.mock("../../services/borough.service");


const mockResponse = () => {
    const res = {} as any;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };
  
  const mockPOSTRequest = (boroughName: String | undefined) => {
    return {
      body: { name: boroughName },
    } as any;
  };
  
  const mockGETRequest = (boroughId: Number) => {
    return {
      params: { id: boroughId },
    } as any;
  };

  const mockPUTRequest = (boroughId: Number, boroughName: String | undefined) => {
    return {
      params: { id: boroughId },
      body: { name: boroughName },
    } as any;
  };


  test("valid POST request", async () => {
      expect.assertions(2);
      const req = mockPOSTRequest("testBorough"); // make fake request to server
      const res = mockResponse(); //Make fake response back to client 

      const boroughController: BoroughController = new BoroughController();
        //return value from the service to controller
      boroughController.boroughService.create = jest.fn().mockResolvedValue({
          body: {
              id : 1,
              name: "testBorough",
          },
          success: true,
      });
      // Request the controller from client and output response 
      await boroughController.create(req,res);
      
      expect(res.status).toHaveBeenCalledWith(201);
      //expect to return the same object as saved in mocked database
      expect(res.json).toHaveBeenCalledWith(
          expect.objectContaining({
              body: expect.objectContaining(
                  {
                      id: 1,
                      name: "testBorough",
                  }
              ),
          })
      )
  })


  test("invalid POST request", async () => {
    expect.assertions(1);
    const req = mockPOSTRequest(undefined);
    const res = mockResponse();
  
    const boroughController: BoroughController = new BoroughController();
      //return value from the service to controller
    boroughController.boroughService.create = jest.fn().mockImplementation(() => {
      throw new Error();
    });
    await boroughController.create(req, res);
  
    expect(res.status).toHaveBeenCalledWith(500);

  });

  test("valid GET request", async () => {
    expect.assertions(2);
    const req = mockGETRequest(1);
    const res = mockResponse();
  
    const boroughController: BoroughController = new BoroughController();
    
    //Simulate return from service.ts
    boroughController.boroughService.show = jest.fn().mockResolvedValue({
      borough: {
        id: 1,
        name: "testBorough",
      },
      success: true,
    });
  
    await boroughController.show(req, res);
  
    expect(res.status).toHaveBeenCalledWith(202);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        borough: expect.objectContaining({
          id: 1,
          name: "testBorough",
        }),
      })
    );
  });


  test("borough not found in GET request", async () => {
      expect.assertions(2);
      const req = mockGETRequest(1);
      const res = mockResponse();

      const boroughController: BoroughController = new BoroughController();
      boroughController.boroughService.show = jest.fn().mockImplementation(() => {
        throw new EmptyResultError();
      });
      await boroughController.show(req, res);
    
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: "Borough not found by id!",
      });
  })


  test("invalid GET request", async () => {
    expect.assertions(1);
    const req = mockGETRequest(1);
    const res = mockResponse();
  
    const boroughController: BoroughController = new BoroughController();
    boroughController.boroughService.show = jest.fn().mockImplementation(() => {
      throw new Error();
    });
    await boroughController.show(req, res);
  
    expect(res.status).toHaveBeenCalledWith(500);
  });

  
   //Update request
  test("valid PUT request", async () => {
    expect.assertions(2);
    const req = mockPUTRequest(1, "testBorough");
    const res = mockResponse();
  
    const boroughController: BoroughController = new BoroughController();
    //return value from the service to controller
    boroughController.boroughService.update = jest.fn().mockResolvedValue({
      success: true,
    });
  
    await boroughController.update(req, res);
  
    expect(res.status).toHaveBeenCalledWith(202);
    expect(res.json).toHaveBeenCalledWith({
      data: "successfully updated",
    });
  });
  

 
  test("artist not found PUT request", async () => {
    expect.assertions(2);
    const req = mockPUTRequest(1, "testartist");
    const res = mockResponse();
  
    const boroughController: BoroughController = new BoroughController();
    boroughController.boroughService.update = jest.fn().mockImplementation(() => {
      throw new EmptyResultError();
    });
    await boroughController.update(req, res);
  
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: "Borough not found by id!",
    });
  });
  
  test("invalid PUT request", async () => {
    expect.assertions(1);
    const req = mockPUTRequest(1, "testartist");
    const res = mockResponse();
  
    const boroughController: BoroughController = new BoroughController();
    boroughController.boroughService.update = jest.fn().mockImplementation(() => {
      throw new Error();
    });
    await boroughController.update(req, res);
  
    expect(res.status).toHaveBeenCalledWith(500);
  });
  
  afterAll(async () => {
    await database.close();
  });
  


