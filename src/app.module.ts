import { CacheModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CensusModule } from './census/census.module';
import { MemDataHubModule } from './mem-datahub/mem-datahub';
import { CacheConfigService } from './config/cache-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.registerAsync({
      useClass: CacheConfigService,
      isGlobal: true,
    }),
    CensusModule,
    MemDataHubModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
