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
  private readonly redisAuthPassword: string;

  constructor(private configService: ConfigService) {
    this.useRedis = configService.get('NODE_ENV') !== 'development'; // Only use redis on non-dev environments
    this.redisHost = configService.get('REDIS_HOST') || 'localhost';
    this.redisPort = configService.get('REDIS_PORT') || 6379;
    this.redisAuthPassword = configService.get('REDIS_AUTH_PASS') || null;
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
        auth_pass: this.redisAuthPassword,
      };
    }

    return baseOptions;
  }
}
