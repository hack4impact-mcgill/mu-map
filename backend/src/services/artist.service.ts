import { Artist, ArtistInterface } from "../models/artist.model";
import { UpdateOptions } from "sequelize";
import { RED } from "../config/constants";

export class ArtistService {
  /**
   * Creates a new artist
   * @param artist ArtistInterface describing newly created artist
   */
  public async create(artist: ArtistInterface): Promise<Artist> {
    try {
      const createdArtist: Artist = await Artist.create<Artist>(artist);
      return createdArtist;
    } catch (e) {
      console.error(RED, e);
      throw e;
    }
  }

  /**
   * show an artist by id
   * @param artistId id of artist to show
   */
  public async show(artistId: number): Promise<Artist> {
    try {
      const artist: Artist = await Artist.findByPk<Artist>(artistId, {
        rejectOnEmpty: true,
      });
      return artist;
    } catch (e) {
      console.error(RED, e);
      throw e;
    }
  }

  /**
   * update an existing artist
   * @param artistId id of artist to update
   * @param params updated fields of artist
   */
  public async update(
    artistId: number,
    params: ArtistInterface
  ): Promise<void> {
    try {
      const update: UpdateOptions = {
        where: { id: artistId },
      };
      await Artist.findByPk<Artist>(artistId, { rejectOnEmpty: true });
      await Artist.update(params, update);
      return;
    } catch (e) {
      console.error(RED, e);
      throw e;
    }
  }

  /**
   * Show all artists (paginated) without their associated murals
   * @param limit page size
   * @param offset page number
   */
  public async showAll(limit: number, offset: number) {
    try {
      const artists = await Artist.findAndCountAll<Artist>({
        limit: limit,
        offset: offset,
      });
      return artists;
    } catch (e) {
      console.error(RED, e);
      throw e;
    }
  }
}
