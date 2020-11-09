import {database} from "../database"
import {Mural} from "../../models/mural.model"

beforeAll(async () => {
    //TODO need serious help how to eliminate errors from this line...
    await database.sync();
})

test('create mural', async () => {
    expect.assertions(1)
    const params = {
            name : "testmural",
            artist : "bobby",
            year : 1234,
            city : "montreal",
            address : "1234 street",
            partners : [
                "partner 1",
                "partner 2"
            ]
    }
    const mural = await Mural.create<Mural>(params)
        .catch((err: Error) => fail("Creating mural failed."))
    expect(mural.id).toEqual(1)
})

test('get mural', async () => {
    expect.assertions(3)
    const mural = await Mural.findByPk(1)
    expect(mural).not.toEqual(null)
    expect(mural!.id).toEqual(1)
    expect(mural!.name).toEqual("testmural")
})

afterAll(async () => {
    await database.close()
})
