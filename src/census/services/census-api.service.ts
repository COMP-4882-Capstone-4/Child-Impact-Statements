import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CensusAPIService {
  private census = require('citysdk');
  private soda = require('soda-js');
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
    /*return this.buildRequest(
      2000,
      ['pep', 'int_charagegroups'],
      ['POP', 'YEAR', 'AGEGRP', 'RACE_SEX', 'HISP'],
    );*/

    return new Promise((resolve) => {
      const consumer = new this.soda.Consumer('data.memphistn.gov');

      consumer
        .query()
        .withDataset('e4xa-n94q')
        .limit(5)
        .getRows()
        .on('success', (rows) => {
          resolve(rows);
        })
        .on('error', (error) => {
          console.error(error);
          resolve(error);
        });
    });
  }
}
