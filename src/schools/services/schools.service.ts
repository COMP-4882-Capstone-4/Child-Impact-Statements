// noinspection ExceptionCaughtLocallyJS

import { Injectable, Logger } from '@nestjs/common';
import { School } from '../types';
import { CachedSchools } from '../types/cached-schools.type';
import { SchoolStatBreakdown } from '../types/school-stat-breakdown.type';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SchoolsService {
  private schema = require('../data/membership.schema');
  private excel = require('fast-xlsx-reader');
  private schools: School[] = [];

  private readonly logger: Logger = new Logger('SchoolsService');

  constructor() {
    if (this.schools.length === 0) {
      this.fetchMembershipData();
    }
  }

  public getBreakdownForSchool(id: number) {
    const schools = this.schools.filter((s) => s.schoolID === id);
    console.log(schools);
    const breakdown = new SchoolStatBreakdown(schools[0]);

    breakdown.addSchools(schools);

    return breakdown;
  }

  private fetchMembershipData() {
    const dataPath = path.join(__dirname, '../', 'data/', 'membership.xlsx');
    const cachedDataPath = path.join(
      __dirname,
      '../',
      'data/',
      'membership.json',
    );

    fs.readFile(cachedDataPath, 'utf-8', (err, data) => {
      try {
        if (err) throw err;
        const cachedSchools: CachedSchools = JSON.parse(data);

        if (!cachedSchools || cachedSchools.schools.length === 0) {
          throw new Error('No data');
        } else {
          this.logger.verbose(
            'Successfully retrieved cached school data from',
            cachedDataPath,
          );
          this.schools.push(...cachedSchools.schools);
        }
      } catch (e) {
        // noinspection TypeScriptValidateJSTypes
        const reader = this.excel.createReader({
          input: dataPath,
          format: 'json',
          schema: this.schema,
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        reader.on('record', (data, _) => {
          const school = new School(data);
          if (school.districtID === 792) {
            this.schools.push(new School(data));
          }
        });

        reader.readAll(true);

        this.writeCachedOutput(cachedDataPath);
        reader.destroy();
      }
    });
  }

  private writeCachedOutput(path: string) {
    const cachedSchools: CachedSchools = {
      schools: this.schools,
      total: this.schools.length,
    };

    fs.writeFile(path, JSON.stringify(cachedSchools), 'utf8', (err) => {
      if (!!err) {
        this.logger.error(err);
      } else {
        this.logger.verbose('Wrote cached data successfully', path);
      }
    });
  }
}
