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

  static response(
    type: string,
    rawStats: any[],
    tractOrZip: number,
    dataType: 'poverty' | 'gender',
    byType: 'tract' | 'zipcode',
  ) {
    const stats = (rawStats as any[]).map((r) => {
      return deserialize<PopulationStat>(r, PopulationStat);
    });

    if (stats.length === 0) {
      stats.push(PopulationStat.emptyStat(tractOrZip, byType, dataType));
    }

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

      return { ...stat, ...otherStat };
    });

    return new PopulationStatResponse(type, newStats);
  }
}
