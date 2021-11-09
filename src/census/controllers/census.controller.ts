import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CensusAPIService } from '../services/census-api.service';
import { PopulationStatResponse } from '../responses/population-stat.response';

@Controller('census')
@ApiTags('Census')
export class CensusController {
  constructor(private censusAPIService: CensusAPIService) {}

  @Get('under18')
  @ApiQuery({ name: 'tract', type: String, required: false })
  @ApiQuery({ name: 'zipCode', type: String, required: false })
  @ApiResponse({ type: PopulationStatResponse })
  under18Request(
    @Query('tract') tract: string | number = '*',
    @Query('zipCode') zipCode: string | number = '*',
  ) {
    return this.censusAPIService.under18Request(tract, zipCode);
  }

  @Get('under18Male')
  @ApiQuery({ name: 'tract', type: String, required: false })
  @ApiQuery({ name: 'zipCode', type: String, required: false })
  @ApiResponse({ type: PopulationStatResponse })
  under18MaleRequest(
    @Query('tract') tract: string | number = '*',
    @Query('zipCode') zipCode: string | number = '*',
  ) {
    return this.censusAPIService.under18MaleRequest(tract, zipCode);
  }

  @Get('under18Female')
  @ApiQuery({ name: 'tract', type: String, required: false })
  @ApiQuery({ name: 'zipCode', type: String, required: false })
  @ApiResponse({ type: PopulationStatResponse })
  under18FemRequest(
    @Query('tract') tract: string | number = '*',
    @Query('zipCode') zipCode: string | number = '*',
  ) {
    return this.censusAPIService.under18FemaleRequest(tract, zipCode);
  }

  @Get('over3InNurserySchool')
  @ApiQuery({ name: 'tract', type: String, required: false })
  @ApiQuery({ name: 'zipCode', type: String, required: false })
  @ApiResponse({ type: PopulationStatResponse })
  over3InNurserySchoolRequest(
    @Query('tract') tract: string | number = '*',
    @Query('zipCode') zipCode: string | number = '*',
  ) {
    return this.censusAPIService.over3InNurserySchoolRequest(tract, zipCode);
  }

  @Get('over3InElementarySchool')
  @ApiQuery({ name: 'tract', type: String, required: false })
  @ApiQuery({ name: 'zipCode', type: String, required: false })
  @ApiResponse({ type: PopulationStatResponse })
  over3InElementarySchoolRequest(
    @Query('tract') tract: string | number = '*',
    @Query('zipCode') zipCode: string | number = '*',
  ) {
    return this.censusAPIService.over3InElementarySchoolRequest(tract, zipCode);
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
