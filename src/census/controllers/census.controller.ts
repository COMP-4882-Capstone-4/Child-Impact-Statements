import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CensusAPIService } from '../services/census-api.service';

@Controller('census')
@ApiTags('Census')
export class CensusController {
  constructor(private censusAPIService: CensusAPIService) {}

  @Get('test')
  testRequest() {
    return this.censusAPIService.testRequest();
  }
}
