import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

const YEAR_CACHE_TTL = 60 * 60 * 24 * 365;

@Injectable()
export class CacheConfigService implements CacheOptionsFactory {
  private readonly useRedis: boolean;
  private readonly redisHost: string;
  private readonly redisPort: number;

  constructor(private configService: ConfigService) {
    this.useRedis = configService.get('NODE_ENV') !== 'development'; // Only use redis on non-dev environments
    this.redisHost = configService.get('REDIS_URL') || 'localhost';
    this.redisPort = configService.get('REDIS_PORT') || 6379;
  }

  createCacheOptions(): CacheModuleOptions {
    const baseOptions: CacheModuleOptions = {
      ttl: YEAR_CACHE_TTL,
    };

    if (this.useRedis) {
      return {
        ...baseOptions,
        store: redisStore,
        host: this.redisHost,
        port: this.redisPort,
      };
    }

    return baseOptions;
  }
}
