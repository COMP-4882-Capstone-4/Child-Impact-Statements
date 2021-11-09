import { JsonProperty, Serializable } from 'typescript-json-serializer';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

@Serializable()
export class PopulationStat {
  @ApiModelProperty({ required: false })
  @JsonProperty({
    name: 'S0101_C01_022E',
    required: false,
    beforeDeserialize: (p) => {
      if (p === 'NAN: null') {
        return 0;
      }

      return p;
    },
  })
  populationUnder18: number;

  @ApiModelProperty({ required: false })
  @JsonProperty({
    name: 'S0101_C03_022E',
    required: false,
    beforeDeserialize: (p) => {
      if (p === 'NAN: null') {
        return 0;
      }

      return p;
    },
  })
  populationUnder18Male: number;

  @ApiModelProperty({ required: false })
  @JsonProperty({
    name: 'S0101_C05_022E',
    required: false,
    beforeDeserialize: (p) => {
      if (p === 'NAN: null') {
        return 0;
      }

      return p;
    },
  })
  populationUnder18Female: number;

  @ApiModelProperty({ required: false })
  @JsonProperty({
    name: 'S0501_C02_034E',
    required: false,
    beforeDeserialize: (p) => {
      if (p === 'NAN: null') {
        return 0;
      }

      return p;
    },
  })
  populationOver3InNurserySchool: number;

  @ApiModelProperty({ required: false })
  @JsonProperty({
    name: 'S0501_C02_035E',
    required: false,
    beforeDeserialize: (p) => {
      if (p === 'NAN: null') {
        return 0;
      }

      return p;
    },
  })
  populationOver3InElementarySchool: number;

  @ApiModelProperty({ required: false })
  @JsonProperty({ name: 'S0501_C02_108E', required: false })
  populationUnder18FamilyPoverty: number;

  @ApiModelProperty({ required: false })
  @JsonProperty({ name: 'zip-code-tabulation-area', required: false })
  zipCode: number;

  @ApiModelProperty({ required: false })
  @JsonProperty({ name: 'tract', required: false })
  censusTract: number;
}
