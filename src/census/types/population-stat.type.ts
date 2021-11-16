import { JsonProperty, Serializable } from 'typescript-json-serializer';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { CensusVariable } from '../enum/census-variable.enum';

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

  static emptyStat(
    tractOrZip: number,
    byType: 'tract' | 'zipcode',
    dataType: 'poverty' | 'gender',
  ): PopulationStat {
    const newStat = new PopulationStat();

    if (dataType === 'gender') {
      newStat.populationUnder18 = 0;
      newStat.populationUnder18Female = 0;
      newStat.populationUnder18Male = 0;
    } else if (dataType === 'poverty') {
      newStat.populationInPovertyUnder6 = 0;
      newStat.populationInPoverty6To11 = 0;
      newStat.populationInPoverty12To17 = 0;
    }

    if (byType === 'tract') {
      newStat.censusTract = tractOrZip;
    } else if (byType === 'zipcode') {
      newStat.zipCode = tractOrZip;
    }

    return newStat;
  }
}
