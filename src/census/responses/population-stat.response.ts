import { PopulationStat } from '../types/population-stat.type';
import { deserialize } from 'typescript-json-serializer';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class PopulationStatResponse {
  @ApiModelProperty()
  type = 'under18';

  @ApiModelProperty({ type: PopulationStat, isArray: true })
  stats: PopulationStat[] = [];

  constructor(type: string, stats: PopulationStat[]) {
    this.type = type;
    this.stats = stats;
  }

  static response(type: string, rawStats: any[]) {
    const stats = (rawStats as any[]).map((r) => {
      return deserialize<PopulationStat>(r, PopulationStat);
    });

    return new PopulationStatResponse(type, stats);
  }

  combine(
    other: PopulationStatResponse,
    type: string,
    by: 'zipcode' | 'tract' = 'tract',
  ) {
    const byTract = by === 'tract';
    const newStats = this.stats.map((stat) => {
      const otherStat = other.stats.find((s) => {
        if (byTract) {
          return s.censusTract === stat.censusTract;
        } else {
          return s.zipCode === stat.zipCode;
        }
      });

      console.log('STAT', stat);
      console.log('OTHER', otherStat);
      return { ...stat, ...otherStat };
    });

    return new PopulationStatResponse(type, newStats);
  }
}
