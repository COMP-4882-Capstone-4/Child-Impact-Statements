import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class SchoolBreakdownRequest {
  @ApiModelProperty({ required: true })
  schoolName: string;

  @ApiModelProperty({ required: true })
  schoolType: string;

  @ApiModelProperty({ required: true })
  schoolPrincipal: string;

  @ApiModelProperty({ required: true })
  zipCode: string;

  @ApiModelProperty({ required: true })
  totalStudents: number;

  @ApiModelProperty({ required: true })
  totalMaleStudents: number;

  @ApiModelProperty({ required: true })
  totalFemaleStudents: number;

  @ApiModelProperty({ required: true })
  gradesTaught: string;

  @ApiModelProperty({ required: true })
  studentGradeBreakdown: { [key: string]: number };
}
