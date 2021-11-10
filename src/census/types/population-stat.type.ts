import { JsonProperty, Serializable } from 'typescript-json-serializer';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import {CensusVariable} from "../enum/census-variable.enum";

@Serializable()
export class PopulationStat {
  @ApiModelProperty({ required: false })
  @JsonProperty({
    name: CensusVariable.TOTAL_POP,
    required: false,
    beforeDeserialize: (p) => {
      if (p === 'NAN: null') {
        return -1;
      }

      return p;
    },
  })
  totalPopulation: number;

  @ApiModelProperty({ required: false })
  @JsonProperty({
    name: CensusVariable.TOTAL_UNDER_18_POP,
    required: false,
    beforeDeserialize: (p) => {
      if (p === 'NAN: null') {
        return -1;
      }

      return p;
    },
  })
  populationUnder18: number;

  @ApiModelProperty({ required: false })
  @JsonProperty({
    name: CensusVariable.TOTAL_UNDER_18_MALE_POP,
    required: false,
    beforeDeserialize: (p) => {
      if (p === 'NAN: null') {
        return -1;
      }

      return p;
    },
  })
  populationUnder18Male: number;

  @ApiModelProperty({ required: false })
  @JsonProperty({
    name: CensusVariable.TOTAL_UNDER_18_FEMALE_POP,
    required: false,
    beforeDeserialize: (p) => {
      if (p === 'NAN: null') {
        return -1;
      }

      return p;
    },
  })
  populationUnder18Female: number;

  @ApiModelProperty({ required: false })
  @JsonProperty({
    name: CensusVariable.TOTAL_POVERTY_STATUS_UNDER_6,
    required: false,
    beforeDeserialize: (p) => {
      if (p === 'NAN: null') {
        return -1;
      }

      return p;
    },
  })
  populationInPovertyUnder6: number;

  @ApiModelProperty({ required: false })
  @JsonProperty({
    name: CensusVariable.TOTAL_POVERTY_STATUS_6_TO_11,
    required: false,
    beforeDeserialize: (p) => {
      if (p === 'NAN: null') {
        return -1;
      }

      return p;
    },
  })
  populationInPoverty6To11: number;

  @ApiModelProperty({ required: false })
  @JsonProperty({
    name: CensusVariable.TOTAL_POVERTY_STATUS_12_TO_17,
    required: false,
    beforeDeserialize: (p) => {
      if (p === 'NAN: null') {
        return -1;
      }

      return p;
    },
  })
  populationInPoverty12To17: number;

  @ApiModelProperty({ required: false })
  @JsonProperty({ name: 'zip-code-tabulation-area', required: false })
  zipCode: number;

  @ApiModelProperty({ required: false })
  @JsonProperty({ name: 'tract', required: false })
  censusTract: number;
}
