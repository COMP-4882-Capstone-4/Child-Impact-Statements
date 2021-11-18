import { Landmark } from '../types/landmarks/landmark.type';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class LandmarksSummaryResponse {
  @ApiModelProperty()
  totalParks: number;

  @ApiModelProperty()
  totalCommunityCenters: number;

  @ApiModelProperty()
  totalLibraries: number;

  @ApiModelProperty({ isArray: true, type: Landmark })
  parks: Landmark[];

  @ApiModelProperty({ isArray: true, type: Landmark })
  communityCenters: Landmark[];

  @ApiModelProperty({ isArray: true, type: Landmark })
  libraries: Landmark[];

  constructor(
    parks: Landmark[],
    communityCenters: Landmark[],
    libraries: Landmark[],
  ) {
    this.totalParks = parks.length;
    this.parks = parks;

    this.totalCommunityCenters = communityCenters.length;
    this.communityCenters = communityCenters;

    this.totalLibraries = libraries.length;
    this.libraries = libraries;
  }
}
