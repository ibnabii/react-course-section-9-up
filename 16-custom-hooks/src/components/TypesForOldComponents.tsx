export type ImageType = {
  src: string;
  alt: string;
};

export type PlaceType = {
  id: string;
  title: string;
  image: ImageType;
  lat: number;
  lon: number;
};
