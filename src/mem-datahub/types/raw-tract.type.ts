import { RawGeometry } from './raw-geometry.type';

export interface RawTract {
  tract: string;
  fips?: string;
}

export interface RawGeoTract extends RawTract {
  the_geom: RawGeometry;
}
