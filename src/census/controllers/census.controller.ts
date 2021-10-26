import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CensusAPIService } from '../services/census-api.service';

@Controller('census')
@ApiTags('Census')
export class CensusController {
  constructor(private censusAPIService: CensusAPIService) {}

  @Get('under18')
  under18Request() {
    return this.censusAPIService.under18Request();
  }
  @Get('under18Male')
  under18MaleRequest() {
    return this.censusAPIService.under18MaleRequest();
  }
  @Get('under18Fem')
  under18FemRequest() {
    return this.censusAPIService.under18FemRequest();
  }

  @Get('over3InNurserySchool')
  over3InNurserySchoolRequest() {
    return this.censusAPIService.over3InNurserySchoolRequest();
  }

  @Get('over3InElementarySchool')
  over3InElementarySchoolRequest() {
    return this.censusAPIService.over3InElementarySchoolRequest();
  }

  @Get('over3InHighSchool')
  over3InHighSchoolRequest() {
    return this.censusAPIService.over3InHighSchoolRequest();
  }

  @Get('under18FamilyPoverty')
  under18FamilyPovertyRequest() {
    return this.censusAPIService.under18FamilyPovertyRequest();
  }
}
