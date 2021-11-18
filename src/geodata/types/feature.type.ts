import { Geometry } from './geometry.type';

export interface Feature {
  type: string;
  properties: { [key: string]: any };
  geometry: Geometry;
}
