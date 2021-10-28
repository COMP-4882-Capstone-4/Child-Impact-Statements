import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CensusAPIService {
  private census = require('citysdk');
  private apiKey: string;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('CENSUS_API_KEY');
  }

  /**
   * Build a CitySDK/Census request
   * @param sourcePath - Values like 'acs', 'acs5', 'subject' (which builds a URL like /acs/acs5/subject)
   * @param values - Values like 'NAME', 'S0101_C06_022E' (which is apart of the get list)
   * @param vintage - Optionally specify a vintage, defaults to 2018
   * @param tract - Tract code
   */
  buildRequest(
    sourcePath: string[],
    values: string[],
    vintage = 2018,
    tract: string | number = '*',
  ) {
    const requestObject = {
      vintage,
      geoHierarchy: {
        state: '47',
        county: '157',
        tract,
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

  // TOTAL under 18 pop
  under18Request(tract: string | number = '*') {
    return this.buildRequest(
      ['acs', 'acs5', 'subject'],
      ['NAME', 'S0101_C01_022E', 'PLACE', 'GEOCOMP'],
      2019,
      tract
    );
  }

  // MEN under 18 pop
  under18MaleRequest() {
    return this.buildRequest(
      ['acs', 'acs5', 'subject'],
      ['NAME', 'S0101_C03_022E'],
    );
  }

  // WOMEN under 18 POP
  under18FemRequest() {
    return this.buildRequest(
      ['acs', 'acs5', 'subject'],
      ['NAME', 'S0101_C05_022E'],
    );
  }

  // Children 3 and older in Nursery School
  over3InNurserySchoolRequest() {
    return this.buildRequest(
      ['acs', 'acs5', 'subject'],
      ['NAME', 'S0501_C02_034E'],
    );
  }

  // Children 3 and older in K-8
  over3InElementarySchoolRequest() {
    return this.buildRequest(
      ['acs', 'acs5', 'subject'],
      ['NAME', 'S0501_C02_035E'],
    );
  }

  // Children 3 and older in 9-12
  over3InHighSchoolRequest() {
    return this.buildRequest(
      ['acs', 'acs5', 'subject'],
      ['NAME', 'S0501_C02_036E'],
    );
  }

  // Poverty Rates in Families with Children under 18
  under18FamilyPovertyRequest() {
    return this.buildRequest(
      ['acs', 'acs5', 'subject'],
      ['NAME', 'S0501_C02_108E'],
    );
  }
}
