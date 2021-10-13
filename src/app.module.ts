import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CensusModule } from './census/census.module';
import { MemDataHubModule } from './mem-datahub/mem-datahub';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CensusModule,
    MemDataHubModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
