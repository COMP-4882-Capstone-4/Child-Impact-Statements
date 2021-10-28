import { RawGeometry } from './raw-geometry.type';

export interface GeoFeature {
  type: string;
  properties: {
    name: string,
  };
  geometry: RawGeometry;
}
