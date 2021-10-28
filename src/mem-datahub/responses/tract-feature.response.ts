import { GeoFeature } from '../types/geo-feature.type';
import { ApiProperty } from '@nestjs/swagger';

export class TractFeaturesResponse {

  @ApiProperty()
  data: {
    type: string;
    features: GeoFeature[],
  };

  @ApiProperty()
  total: number;

  @ApiProperty()
  batchSize: number;

  @ApiProperty()
  pagesRemaining: number;
}
