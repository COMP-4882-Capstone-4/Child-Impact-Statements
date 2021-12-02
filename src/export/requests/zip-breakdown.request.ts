import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class ZipBreakdownRequest {
  @ApiModelProperty({ required: true })
  zipCode: number;

  @ApiModelProperty({ required: true })
  totalPopulation: number;

  @ApiModelProperty({ required: true })
  populationUnder18: number;

  @ApiModelProperty({ required: true })
  populationUnder18Male: number;

  @ApiModelProperty({ required: true })
  populationUnder18Female: number;

  @ApiModelProperty({ required: true })
  populationInPovertyUnder6: number;

  @ApiModelProperty({ required: true })
  populationInPoverty6To11: number;

  @ApiModelProperty({ required: true })
  populationInPoverty12To17: number;

  @ApiModelProperty({ required: true })
  parkCount: number;

  @ApiModelProperty({ required: true })
  libraryCount: number;

  @ApiModelProperty({ required: true })
  communityCenterCount: number;
}
