import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RawGeoTract } from '../types/raw-tract.type';
import { GeoFeature } from '../types/geo-feature.type';
import { GeoFeaturesResponse } from '../responses/geo-features.response';
import { RawGeoZip, RawZip } from '../types/raw-zip.type';

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

  getZipCodes(count: boolean) {
    return new Promise((resolve) => {
      const baseSelection = MemDataHubAPIService.toCommaSeparated(['name']);

      const stringSelection = count ? "count('name')" : baseSelection;

      this.getConsumer('98jk-gvpk')
        .select(stringSelection)
        .getRows()
        .on('success', (rows: RawZip[] | any[]) => {
          if (count && rows.length > 0) {
            resolve(rows[0]['count_name'] as Number);
          } else {
            resolve((rows as RawZip[]).map((r) => r.name));
          }
        })
        .on('error', (error) => {
          console.error(error);
          resolve(error);
        });
    });
  }

  getPZipCodes(zipcode: string) {
    return new Promise((resolve) => {
      if(zipcode == null){
        this.getConsumer('98jk-gvpk')
        .select('name')
        .getRows()
        .on('success', (rows: RawZip[] | any[]) => {
          resolve((rows as RawZip[]).map((r) => r.name));
        })
        .on('error', (error) => {
          console.error(error);
          resolve(error);
        });
      } else{
        const search = "name like '%" + zipcode + "%'";

        this.getConsumer('98jk-gvpk')
        .select('name')
        .where(search)
        .getRows()
        .on('success', (rows: RawZip[] | any[]) => {
          resolve((rows as RawZip[]).map((r) => r.name));
        })
        .on('error', (error) => {
          console.error(error);
          resolve(error);
        });
      }
      

      
    });
  }

  fetchZipCodesWithGeometry(
    pageNumber = 0,
    pageSize = 30,
  ): Promise<GeoFeaturesResponse> {
    const offset = pageNumber * pageSize;
    const limit = pageSize;

    return this.getZipCodes(true).then(
      (total: number) =>
        new Promise((resolve) => {
          const stringSelection = MemDataHubAPIService.toCommaSeparated([
            'name',
            'the_geom',
          ]);

          const pagesRemaining = Math.ceil((total - offset) / pageSize);

          this.getConsumer('98jk-gvpk')
            .select(stringSelection)
            .limit(limit)
            .offset(offset)
            .order('name desc')
            .getRows()
            .on('success', (rows: RawGeoZip[]) => {
              const features = rows.map((r) =>
                MemDataHubAPIService.toFeature(r.the_geom, r.name),
              );

              resolve({
                batchSize: features.length,
                total,
                pagesRemaining,
                currentPage: Number(pageNumber),
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
  ): Promise<GeoFeaturesResponse> {
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
            .order('tract desc')
            .getRows()
            .on('success', (rows: RawGeoTract[]) => {
              const features = rows.map((r) =>
                MemDataHubAPIService.toFeature(r.the_geom, r.tract),
              );

              resolve({
                batchSize: features.length,
                total,
                pagesRemaining,
                currentPage: Number(pageNumber),
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
