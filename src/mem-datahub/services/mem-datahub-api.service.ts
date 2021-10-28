import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RawGeoTract } from '../types/raw-tract.type';
import { GeoFeature } from '../types/geo-feature.type';
import { TractFeaturesResponse } from '../responses/tract-feature.response';

@Injectable()
export class MemDataHubAPIService {
  private soda = require('soda-js');
  private apiKey: string;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('API_KEY');
  }

  testRequest() {
    return new Promise((resolve) => {
      const consumer = new this.soda.Consumer('data.memphistn.gov');

      consumer
        .query()
        .withDataset('ybsi-jur4')
        .limit(100)
        .where(
          this.soda.expr.or(
            this.soda.expr.eq('category', 'Theft'),
            this.soda.expr.eq('category', 'Assault'),
          ),
        )
        // .where({ category: "Property Crime"})
        // .where(this.soda.expr.gte("offense_date", "2021-01"))
        // .where(this.soda.expr.and(this.soda.expr.eq('category', 'Theft'), this.soda.expr.gte("offense_date", "2021-01")))
        .order('offense_date desc')
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

  parks() {
    return new Promise((resolve) => {
      const consumer = new this.soda.Consumer('data.memphistn.gov');

      consumer
        .query()
        .withDataset('aeu5-vwkq')
        .select('park_nam_1, zipcode, point')
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

  libraries() {
    return new Promise((resolve) => {
      const consumer = new this.soda.Consumer('data.memphistn.gov');

      consumer
        .query()
        .withDataset('4kk2-hed2')
        .select('user_name, staddr, the_geom')
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

  zipCodes() {
    return new Promise((resolve) => {
      const consumer = new this.soda.Consumer('data.memphistn.gov');

      consumer
        .query()
        .withDataset('98jk-gvpk')
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

  getCensusTracts(count = false) {
    return new Promise((resolve) => {
      const baseSelection = MemDataHubAPIService.toCommaSeparated([
        'tract',
        'fips',
      ]);

      const stringSelection = count ? "count('tract')" : baseSelection;

      this.getConsumer('e4xa-n94q')
        .select(stringSelection)
        .getRows()
        .on('success', (rows) => {
          if (count && rows.length > 0) {
            const countValue = rows[0]['count_tract'];

            resolve(Number(countValue) || 0);
          } else {
            resolve(rows);
          }
        })
        .on('error', (error) => {
          console.error(error);
          resolve(error);
        });
    });
  }

  fetchTractsWithGeometry(
    pageNumber = 0,
    pageSize = 30,
  ): Promise<TractFeaturesResponse> {
    const offset = pageNumber * pageSize;
    const limit = pageSize;

    return this.getCensusTracts(true).then(
      (total: number) =>
        new Promise((resolve) => {
          const stringSelection = MemDataHubAPIService.toCommaSeparated([
            'tract',
            'the_geom',
          ]);

          const pagesRemaining = Math.ceil((total - offset) / pageSize);

          this.getConsumer('e4xa-n94q')
            .select(stringSelection)
            .limit(limit)
            .offset(offset)
            .getRows()
            .on('success', (rows: RawGeoTract[]) => {
              const features = rows.map((r) =>
                MemDataHubAPIService.toFeature(r.the_geom, r.tract),
              );

              resolve({
                batchSize: features.length,
                total,
                pagesRemaining,
                data: {
                  type: 'FeatureCollection',
                  features,
                },
              });
            })
            .on('error', (error) => {
              console.error(error);
              resolve(error);
            });
        }),
    );
  }

  getTractGeometry(tract: string) {
    return new Promise((resolve) => {
      const stringSelection = MemDataHubAPIService.toCommaSeparated([
        'tract',
        'the_geom',
      ]);

      this.getConsumer('e4xa-n94q')
        .select(stringSelection)
        .limit(1)
        .where(this.soda.expr.eq('tract', tract))
        .getRows()
        .on('success', (rows: RawGeoTract[]) => {
          if (rows.length > 0) {
            resolve(
              MemDataHubAPIService.toFeature(rows[0].the_geom, rows[0].tract),
            );
          } else {
            resolve(null);
          }
        })
        .on('error', (error) => {
          console.error(error);
          resolve(error);
        });
    });
  }

  private static toFeature(
    geometry: { type: string; coordinates: any },
    label: string,
  ): GeoFeature {
    return {
      type: 'Feature',
      properties: {
        name: label,
      },
      geometry,
    };
  }

  private getConsumer(resource: string) {
    const consumer = new this.soda.Consumer('data.memphistn.gov');

    return consumer.query().withDataset(resource);
  }

  private static toCommaSeparated(arr: string[]): string {
    return arr.join(', ');
  }
}
