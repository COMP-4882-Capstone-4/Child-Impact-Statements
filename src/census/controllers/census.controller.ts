import {
  CacheInterceptor,
  Controller,
  Get,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CensusAPIService } from '../services/census-api.service';
import { PopulationStatResponse } from '../responses/population-stat.response';

@Controller('census')
@ApiTags('Census')
@UseInterceptors(CacheInterceptor)
export class CensusController {
  constructor(private censusAPIService: CensusAPIService) {}

  @Get('breakdown')
  @ApiQuery({ name: 'tract', type: String, required: false })
  @ApiQuery({ name: 'zipCode', type: String, required: false })
  @ApiResponse({ type: PopulationStatResponse })
  breakdownRequest(
    @Query('tract') tract: string | number = '*',
    @Query('zipCode') zipCode: string | number = '*',
  ) {
    return this.censusAPIService.breakdownRequest(tract, zipCode);
  }

  @Get('total')
  @ApiQuery({ name: 'tract', type: String, required: false })
  @ApiQuery({ name: 'zipCode', type: String, required: false })
  @ApiResponse({ type: PopulationStatResponse })
  totalRequest(
    @Query('tract') tract: string | number = '*',
    @Query('zipCode') zipCode: string | number = '*',
  ) {
    return this.censusAPIService.totalRequest(tract, zipCode);
  }

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

  @Get('underPovertyLevel')
  @ApiQuery({ name: 'tract', type: String, required: false })
  @ApiQuery({ name: 'zipCode', type: String, required: false })
  @ApiResponse({ type: PopulationStatResponse })
  childrenUnderPovertyLevelRequest(
    @Query('tract') tract: string | number = '*',
    @Query('zipCode') zipCode: string | number = '*',
  ) {
    return this.censusAPIService.childrenUnderPovertyLevelRequest(
      tract,
      zipCode,
    );
  }
}
