import {
  CacheModuleOptions,
  CacheOptionsFactory,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as redisStore from 'cache-manager-redis-store';

const YEAR_CACHE_TTL = 60 * 60 * 24 * 365;

@Injectable()
export class CacheConfigService implements CacheOptionsFactory {
  private readonly logger: Logger = new Logger('CacheConfigService');
  private readonly useRedis: boolean;
  private readonly redisURL: string;

  constructor(private configService: ConfigService) {
    this.useRedis = configService.get('NODE_ENV') !== 'development'; // Only use redis on non-dev environments
    this.redisURL = configService.get('REDIS_URL');

    if (this.redisURL === undefined || this.redisURL === null) {
      this.logger.debug(
        'Not using Redis for caching as the URL was not configured. Please check "REDIS_URL" and try again',
      );
      this.useRedis = false;
    } else if (this.useRedis) {
      this.logger.debug('Using Redis as the URL was configured properly');
    }
  }

  createCacheOptions(): CacheModuleOptions {
    const baseOptions: CacheModuleOptions = {
      ttl: YEAR_CACHE_TTL,
    };

    if (this.useRedis) {
      return {
        ...baseOptions,
        store: redisStore,
        url: this.redisURL,
      };
    }

    return baseOptions;
  }
}
