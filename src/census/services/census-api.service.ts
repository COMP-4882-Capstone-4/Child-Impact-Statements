import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';
import { PopulationStatResponse } from '../responses/population-stat.response';

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
   * @param zcta
   * @param type
   */
  buildRequest(
    sourcePath: string[],
    values: string[],
    vintage = 2019,
    tract: string | number = '*',
    zcta: string | number = '*',
    type = 'under18',
  ) {
    let geoObject: any = {
      state: '47',
      county: '157',
      tract,
    };

    if (!!zcta && zcta !== '*') {
      geoObject = {
        'zip-code-tabulation-area': zcta,
      };
    }

    const requestObject = {
      vintage,
      geoHierarchy: geoObject,
      sourcePath,
      values,
      statsKey: this.apiKey,
    };

    return new Observable<PopulationStatResponse>((subscriber) => {
      this.census(requestObject, (err, res) => {
        let response = PopulationStatResponse.errorResponse(type, err);

        if (!!!err) {
          response = PopulationStatResponse.response(type, res);
        }

        subscriber.next(response);
        subscriber.complete();
      });
    });
  }

  /**
   * Request the total population in Shelby county under the age of 18
   * @param tract
   * @param zipCode
   */
  under18Request(tract: string | number = '*', zipCode: string | number = '*') {
    return this.buildRequest(
      ['acs', 'acs5', 'subject'],
      ['NAME', 'S0101_C01_022E'],
      2019,
      tract,
      zipCode,
    );
  }

  /**
   * Request the population in Shelby county under the age of 18 and also male
   * @param tract - The US Census Tract Number
   * @param zipCode - ZIP Code
   */
  under18MaleRequest(
    tract: string | number = '*',
    zipCode: string | number = '*',
  ) {
    return this.buildRequest(
      ['acs', 'acs5', 'subject'],
      ['NAME', 'S0101_C03_022E'],
      2019,
      tract,
      zipCode,
      'under18-male',
    );
  }

  /**
   * Request the population in Shelby county under the age of 18 and also female
   * @param tract - The US Census Tract Number
   * @param zipCode - ZIP Code
   */
  under18FemaleRequest(
    tract: string | number = '*',
    zipCode: string | number = '*',
  ) {
    return this.buildRequest(
      ['acs', 'acs5', 'subject'],
      ['NAME', 'S0101_C05_022E'],
      2019,
      tract,
      zipCode,
      'under18-female',
    );
  }

  /**
   * Request the population in Shelby county ages 3 and up that are enrolled in nursery school
   * @param tract - The US Census Tract Number
   * @param zipCode - ZIP Code
   */
  over3InNurserySchoolRequest(
    tract: string | number = '*',
    zipCode: string | number = '*',
  ) {
    return this.buildRequest(
      ['acs', 'acs5', 'subject'],
      ['NAME', 'S0501_C02_034E'],
      2019,
      tract,
      zipCode,
      'over3-nursery-school',
    );
  }

  /**
   * Request the population in Shelby county ages 3 and up that are enrolled in K-8 school
   * @param tract - The US Census Tract Number
   * @param zipCode - ZIP Code
   */
  over3InElementarySchoolRequest(
    tract: string | number = '*',
    zipCode: string | number = '*',
  ) {
    return this.buildRequest(
      ['acs', 'acs5', 'subject'],
      ['NAME', 'S0501_C02_035E'],
      2016,
      tract,
      zipCode,
      'over3-k8-school',
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
