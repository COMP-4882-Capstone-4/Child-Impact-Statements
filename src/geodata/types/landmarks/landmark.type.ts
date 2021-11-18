import { LandmarkType } from './landmark-type.enum';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Geometry } from '../geometry.type';

export class Landmark {
  @ApiModelProperty()
  zipCode: string;

  @ApiModelProperty()
  displayName: string;

  @ApiModelProperty({ enum: Object.keys(LandmarkType) })
  type: LandmarkType;

  @ApiModelProperty()
  geometry: Geometry;

  constructor(
    type: LandmarkType,
    displayName: string,
    zipCode: string | number,
    geometry: Geometry,
  ) {
    this.type = type;
    this.displayName = displayName;
    this.zipCode = `${zipCode}`;
    this.geometry = geometry;
  }
}
