import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CensusAPIService {
  private census = require('citysdk');
  private apiKey: string;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('CENSUS_API_KEY');
  }

  buildRequest(vintage: number, sourcePath: string[], values: string[]) {
    const requestObject = {
      vintage,
      geoHierarchy: {
        // required
        county: {
          lat: 28.2639,
          lng: -80.7214,
        },
      },
      sourcePath,
      values,
      statsKey: this.apiKey,
    };

    return new Promise((resolve) => {
      this.census(requestObject, (censusErr, censusRes) => {
        if (!!censusErr) {
          console.error(censusErr);
          resolve(censusErr);
        } else {
          resolve(censusRes);
        }
      });
    });
  }

  testRequest() {
    return this.buildRequest(
      2000,
      ['pep', 'int_charagegroups'],
      ['POP', 'YEAR', 'AGEGRP', 'RACE_SEX', 'HISP'],
    );
  
    this.census(
      {
        vintage: '2018',
        geoHierarchy: {
          state: "47",
          county: "157"
        },
        sourcePath: ['acs','acs5'],
        values: ['S0101_C06_022E'],
      },
      (err, res) => console.log(res) // [{"B00001_001E": 889,"state": "06","county": "049"}, ...
    )

    };
  }
