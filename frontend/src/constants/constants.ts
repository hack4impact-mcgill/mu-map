export const DEFAULT_LONGITUDE = -73.58;
export const DEFAULT_LATITUDE = 45.51;
export const DEFAULT_ZOOM = 10;
export const PRIMARY = "#6546F4";
export const SECONDARY = "#E5037E";
export const SUCCESS = "#3BF5C1";
export const WARNING = "#FEEB23";
export const ERROR = "#FC303E";
export const CONTRAST = "#FFF";
export const LIGHTBLUE = "#4ED6E2";
export const MTL_MIN_LONGITUDE = -73.85123;
export const MTL_MIN_LATITUDE = 45.370932;
export const MTL_MAX_LONGITUDE = -73.33952;
export const MTL_MAX_LATITUDE = 45.752154;
export const MAPBOX_GEOCODING_API =
  "https://api.mapbox.com/geocoding/v5/mapbox.places/";
export const MAPBOX_STYLE_URL =
  "mapbox://styles/mumap/ckhb8l6je01ki1ao4tabh8e2q";
export const GET_ALL_ARTISTS_API = `${process.env.REACT_APP_BACKEND_URL}/artist`;
export const GET_ALL_BOROUGH_API = `${process.env.REACT_APP_BACKEND_URL}/borough`;
export const CREATE_MURAL_API = `${process.env.REACT_APP_BACKEND_URL}/mural`;
export const GET_ALL_COLLECTION = `${process.env.REACT_APP_BACKEND_URL}/collection`;
export const GET_ALL_TOUR = `${process.env.REACT_APP_BACKEND_URL}/tour`;
export enum FORM {
  MURAL = "Mural",
  COLLECTION = "Collection",
  TOUR = "Tour",
}
