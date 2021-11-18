import { Landmark } from '../types/landmarks/landmark.type';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class LandmarksResponse {
  @ApiModelProperty()
  total: number;

  @ApiModelProperty({ isArray: true, type: Landmark })
  data: Landmark[];

  constructor(landmarks: Landmark[]) {
    this.total = landmarks.length;
    this.data = landmarks;
  }
}
