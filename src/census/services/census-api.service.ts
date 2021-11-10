import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { combineLatestWith, map, merge, Observable } from 'rxjs';
import { PopulationStatResponse } from '../responses/population-stat.response';
import { CensusVariable } from '../enum/census-variable.enum';

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
    let byTract = true;
    let geoObject: any = {
      state: '47',
      county: '157',
      tract,
    };

    if (!!zcta && zcta !== '*') {
      byTract = false;
      if (sourcePath.includes('subject')) {
        geoObject = {
          'zip+code+tabulation+area': zcta,
        };
      } else {
        geoObject = {
          state: '47',
          'zip+code+tabulation+area': zcta,
        };
      }
    }

    const requestObject = {
      vintage,
      geoHierarchy: geoObject,
      sourcePath,
      values,
      statsKey: this.apiKey,
    };

    const finalType = `${type}-by-${byTract ? 'tract' : 'zipcode'}`;

    return new Observable<PopulationStatResponse>((subscriber) => {
      this.census(requestObject, (err, res) => {
        if (!!!err) {
          subscriber.next(PopulationStatResponse.response(finalType, res));
        } else {
          subscriber.error(err);
        }

        subscriber.complete();
      });
    });
  }

  /**
   * Request the total population in Shelby county
   * @param tract
   * @param zipCode
   */
  breakdownRequest(
    tract: string | number = '*',
    zipCode: string | number = '*',
  ) {
    return this.buildRequest(
      ['acs', 'acs5', 'subject'],
      [
        'NAME',
        CensusVariable.TOTAL_POP,
        CensusVariable.TOTAL_UNDER_18_POP,
        CensusVariable.TOTAL_UNDER_18_MALE_POP,
        CensusVariable.TOTAL_UNDER_18_FEMALE_POP,
      ],
      2019,
      tract,
      zipCode,
      'breakdown',
    ).pipe(
      combineLatestWith(this.childrenUnderPovertyLevelRequest(tract, zipCode)),
      map((data: PopulationStatResponse[]) => {
        if (data.length > 1) {
          const by = zipCode !== '*' ? 'zipcode' : 'tract';

          return data[0].combine(data[1], 'breakdown-poverty-population', by);
        }

        return data[0];
      }),
    );
  }

  /**
   * Request the total population in Shelby county
   * @param tract
   * @param zipCode
   */
  totalRequest(tract: string | number = '*', zipCode: string | number = '*') {
    return this.buildRequest(
      ['acs', 'acs5', 'subject'],
      ['NAME', CensusVariable.TOTAL_POP],
      2019,
      tract,
      zipCode,
    );
  }

  /**
   * Request the total population in Shelby county under the age of 18
   * @param tract
   * @param zipCode
   */
  under18Request(tract: string | number = '*', zipCode: string | number = '*') {
    return this.buildRequest(
      ['acs', 'acs5', 'subject'],
      ['NAME', CensusVariable.TOTAL_UNDER_18_POP],
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
      ['NAME', CensusVariable.TOTAL_UNDER_18_MALE_POP],
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
      ['NAME', CensusVariable.TOTAL_UNDER_18_FEMALE_POP],
      2019,
      tract,
      zipCode,
      'under18-female',
    );
  }

  childrenUnderPovertyLevelRequest(
    tract: string | number = '*',
    zipCode: string | number = '*',
  ) {
    return this.buildRequest(
      ['acs', 'acs5'],
      [
        'NAME',
        CensusVariable.TOTAL_POVERTY_STATUS_UNDER_6,
        CensusVariable.TOTAL_POVERTY_STATUS_6_TO_11,
        CensusVariable.TOTAL_POVERTY_STATUS_12_TO_17,
      ],
      2019,
      tract,
      zipCode,
      'under18-poverty-breakdown',
    );
  }
}
