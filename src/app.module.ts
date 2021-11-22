import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CensusModule } from './census/census.module';
import { MemDataHubModule } from './mem-datahub/mem-datahub';
import { CacheConfigService } from './config/cache-config.service';
import { GeodataModule } from './geodata/geodata.module';
import { SchoolsModule } from './schools/schools.module';

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
    GeodataModule,
    SchoolsModule,
  ],
})
export class AppModule {}
