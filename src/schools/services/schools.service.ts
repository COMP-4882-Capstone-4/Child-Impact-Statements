// noinspection ExceptionCaughtLocallyJS

import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { RawSchool } from '../types/raw-school.type';
import { map } from 'rxjs';

@Injectable()
export class SchoolsService {
  private readonly logger: Logger = new Logger('SchoolsService');

  constructor(private httpService: HttpService) {}

  public getBreakdownForSchool(id: number) {
    return this.httpService
      .get<RawSchool[]>(
        `https://districtinformation.tnedu.gov/api/attendance/district/792/schools?selectedDate=11-01-2021&schoolId=0`,
      )
      .pipe(map((response) => response.data.find((s) => s.schoolId === id)));
  }
}
