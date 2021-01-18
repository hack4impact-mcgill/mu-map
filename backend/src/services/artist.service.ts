import { Artist, ArtistInterface } from "../models/artist.model";
import { UpdateOptions } from "sequelize";

export class ArtistService {
  public async create(artist: ArtistInterface) {
    const createdArtist: Artist = await Artist.create<Artist>(artist);
    return { success: true, body: createdArtist };
  }

  public async show(artistId: number) {
    const artist = await Artist.findByPk<Artist>(artistId, {
      rejectOnEmpty: true,
    });
    return { success: true, artist: artist };
  }

  public async update(artistId: number, params: ArtistInterface) {
    const update: UpdateOptions = {
      where: { id: artistId },
    };
    await Artist.findByPk<Artist>(artistId, { rejectOnEmpty: true });
    await Artist.update(params, update);
    return { success: true };
  }

  public async showAll(limit: number, offset: number) {
    const artists = await Artist.findAndCountAll<Artist>({
      limit: limit,
      offset: offset,
    });
    return { success: true, artists: artists };
  }
}
