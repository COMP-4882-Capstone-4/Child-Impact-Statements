import { BaseSchool } from './base-school.type';
import { Gender, Grade, Race } from './subtypes';

export class School implements BaseSchool {
  districtID: number;
  districtName: string;
  schoolID: number;
  schoolName: string;
  gradesTaught: Grade;
  race: Race;
  gender: Gender;
  enrollment: number;

  constructor(raw: any[]) {
    this.districtID = raw[0] as number;
    this.districtName = raw[1] as string;
    this.schoolID = raw[2] as number;
    this.schoolName = raw[3] as string;
    this.gradesTaught = raw[4] as Grade;
    this.race = raw[5] as Race;
    this.gender = raw[6] as Gender;
    this.enrollment = raw[7] as number;
  }
}
