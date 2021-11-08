import { RawGeometry } from './raw-geometry.type';

export interface RawZip {
  name: string;
}

export interface RawGeoZip extends RawZip {
  the_geom: RawGeometry;
}
