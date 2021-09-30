import { Module } from '@nestjs/common';
import { CensusController } from './controllers/census.controller';
import { CensusAPIService } from './services/census-api.service';

@Module({
  controllers: [CensusController],
  providers: [CensusAPIService],
  exports: [CensusAPIService],
})
export class CensusModule {}
