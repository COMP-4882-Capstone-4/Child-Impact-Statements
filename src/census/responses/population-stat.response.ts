import { PopulationStat } from '../types/population-stat.type';
import { deserialize } from 'typescript-json-serializer';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class PopulationStatResponse {
  @ApiModelProperty()
  type = 'under18';

  @ApiModelProperty({ type: PopulationStat, isArray: true })
  stats: PopulationStat[] = [];

  @ApiModelProperty({ required: false })
  error: string | null = null;

  constructor(type: string, stats: PopulationStat[], error: string = null) {
    this.type = type;
    this.stats = stats;
    this.error = error;
  }

  static errorResponse(type: string, error: string): PopulationStatResponse {
    return new PopulationStatResponse(type, [], error);
  }

  static response(type: string, rawStats: any[]) {
    const stats = (rawStats as any[]).map((r) => {
      return deserialize<PopulationStat>(r, PopulationStat);
    });

    return new PopulationStatResponse(type, stats);
  }
}
