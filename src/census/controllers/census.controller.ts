import { Controller, Get, Query } from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { CensusAPIService } from '../services/census-api.service';

@Controller('census')
@ApiTags('Census')
export class CensusController {
  constructor(private censusAPIService: CensusAPIService) {}

  @Get('under18')
  @ApiQuery({ name: 'tract', type: String, required: false })
  @ApiQuery({ name: 'zipCode', type: String, required: false })
  under18Request(@Query('tract') tract: string | number = '*',
    @Query('zipCode') zipCode: string | number = '*',
  ) {
    return this.censusAPIService.under18Request(tract, zipCode);
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
