import { Feature } from './feature.type';

export interface FeatureCollection {
  type: string;
  features: Feature[];
}
