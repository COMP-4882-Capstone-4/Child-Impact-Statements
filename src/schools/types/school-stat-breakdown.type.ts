import { BaseSchool } from './base-school.type';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { School } from './school.type';
import { Gender, Grade, Race } from './subtypes';

export class SchoolStatBreakdown implements BaseSchool {
  @ApiModelProperty()
  districtID: number;

  @ApiModelProperty()
  districtName: string;

  @ApiModelProperty()
  schoolID: number;

  @ApiModelProperty()
  schoolName: string;

  @ApiModelProperty()
  gradesTaught: string[] = [];

  @ApiModelProperty()
  racesEnrolled: Race[] = [];

  @ApiModelProperty()
  gendersEnrolled: string[] = [];

  @ApiModelProperty()
  totalEnrolled = 0;

  @ApiModelProperty()
  racialEnrollmentBreakdown: { [key: string]: number } = {};

  @ApiModelProperty()
  genderEnrollmentBreakdown: { [key: string]: number } = {};

  @ApiModelProperty()
  gradeEnrollmentBreakdown: { [key: string]: number } = {};

  constructor(school: BaseSchool) {
    this.districtID = school.districtID;
    this.districtName = school.districtName;
    this.schoolID = school.schoolID;
    this.schoolName = school.schoolName;
  }

  addSchools(schools: School[]) {
    this.gradesTaught = (
      [...new Set(schools.map((s) => s.gradesTaught) as Grade[])] as Grade[]
    ).filter((g) => g !== Grade.ALL);

    this.racesEnrolled = (
      [...new Set(schools.map((s) => s.race))] as Race[]
    ).filter((r) => r !== Race.ALL);

    this.gendersEnrolled = (
      [...new Set(schools.map((s) => s.gender))] as Gender[]
    ).filter((g) => g !== Gender.ALL);

    schools
      .filter(
        (s) =>
          s.gender === Gender.ALL &&
          s.gradesTaught === Grade.ALL &&
          s.race === Race.ALL,
      )
      .map((s) => s.enrollment)
      .forEach((value) => {
        this.totalEnrolled += value;
      });

    this.racesEnrolled.forEach((race) => {
      let racialTotal = 0;

      schools
        .filter(
          (s) =>
            s.gender === Gender.FEMALE &&
            s.gradesTaught === Grade.ALL &&
            s.race === race,
        )
        .forEach((s) => (racialTotal += s.enrollment));

      this.racialEnrollmentBreakdown[race] = racialTotal;
    });

    this.gendersEnrolled.forEach((gender) => {
      let genderTotal = 0;

      schools
        .filter(
          (s) =>
            s.gender === gender &&
            s.gradesTaught === Grade.ALL &&
            s.race === Race.ALL,
        )
        .forEach((s) => (genderTotal += s.enrollment));

      this.genderEnrollmentBreakdown[this.getHumanReadableGender(gender)] =
        genderTotal;
    });

    this.gradesTaught.forEach((grade) => {
      let gradeTotal = 0;

      schools
        .filter(
          (s) =>
            s.gender === Gender.ALL &&
            s.gradesTaught === grade &&
            s.race === Race.ALL,
        )
        .forEach((s) => (gradeTotal += s.enrollment));

      this.gradeEnrollmentBreakdown[this.getHumanReadableGrade(grade)] =
        gradeTotal;
    });

    this.gradesTaught = this.gradesTaught.map((grade) =>
      this.getHumanReadableGrade(grade),
    );

    this.gendersEnrolled = this.gendersEnrolled.map((gender) =>
      this.getHumanReadableGender(gender),
    );
  }

  getHumanReadableGender(gender: Gender | string) {
    switch (gender) {
      case Gender.MALE:
        return 'Male';
      case Gender.FEMALE:
        return 'Female';
      default:
        return gender;
    }
  }

  getHumanReadableGrade(grade: Grade | string) {
    switch (grade) {
      case Grade.ALL:
        return 'All';
      case Grade.PRE_K:
        return 'Pre-K';
      case Grade.KINDERGARTEN:
        return 'Kindergarten';
      default:
        const numericalGrade = Number(grade.toString());

        return `${this.ordinalSuffix(numericalGrade)} Grade`;
    }
  }

  ordinalSuffix(i: number) {
    const j = i % 10,
      k = i % 100;
    if (j == 1 && k != 11) {
      return i + 'st';
    }
    if (j == 2 && k != 12) {
      return i + 'nd';
    }
    if (j == 3 && k != 13) {
      return i + 'rd';
    }
    return i + 'th';
  }
}
