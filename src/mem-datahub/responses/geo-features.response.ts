import { GeoFeature } from '../types/geo-feature.type';
import { ApiProperty } from '@nestjs/swagger';

export class GeoFeaturesResponse {
  @ApiProperty()
  data: {
    type: string;
    features: GeoFeature[];
  };

  @ApiProperty()
  total: number;

  @ApiProperty()
  batchSize: number;

  @ApiProperty()
  pagesRemaining: number;

  @ApiProperty({ type: Number })
  currentPage: number;
}
