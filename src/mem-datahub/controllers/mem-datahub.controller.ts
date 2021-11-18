import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { MemDataHubAPIService } from '../services/mem-datahub-api.service';

@Controller('mem-datahub')
@ApiTags('MemDataHub')
export class MemDataHubController {
  constructor(private MemDataHubAPIService: MemDataHubAPIService) {}

  @Get('test')
  testRequest() {
    return this.MemDataHubAPIService.testRequest();
  }

  @Get('Parks')
  parks() {
    return this.MemDataHubAPIService.parks();
  }

  @Get('Libraries')
  libraries() {
    return this.MemDataHubAPIService.libraries();
  }

  @Get('zipCodes')
  @ApiQuery({ name: 'getCount', required: false, type: Boolean })
  getZipCodes(@Query('getCount') getCount: boolean = false) {
    return this.MemDataHubAPIService.getZipCodes(getCount);
  }

  @Get('PZipCodes')
  @ApiQuery({ name: 'zipcode', required: false, type: String })
  getPZipCodes(@Query('zipcode') zipcode: string) {
    return this.MemDataHubAPIService.getPZipCodes(zipcode);
  }

  @Get('page/zipGeometry')
  @ApiQuery({ name: 'pageSize', type: Number, required: false })
  @ApiQuery({ name: 'pageNumber', type: Number, required: false })
  paginateZipGeometry(
    @Query('pageSize') pageSize = 30,
    @Query('pageNumber') pageNumber = 0,
  ) {
    return this.MemDataHubAPIService.fetchZipCodesWithGeometry(
      pageNumber,
      pageSize,
    );
  }


  @Get('tracts')
  @ApiQuery({ name: 'getCount', required: false, type: Boolean })
  getTracts(@Query('getCount') getCount: boolean = false) {
    return this.MemDataHubAPIService.getCensusTracts(getCount);
  }

  @Get('tractGeometry')
  @ApiQuery({ name: 'tract', type: String })
  getTractGeometry(@Query('tract') tract: string) {
    return this.MemDataHubAPIService.getTractGeometry(tract);
  }

  @Get('page/tractGeometry')
  @ApiQuery({ name: 'pageSize', type: Number, required: false })
  @ApiQuery({ name: 'pageNumber', type: Number, required: false })
  paginateTractGeometry(
    @Query('pageSize') pageSize = 30,
    @Query('pageNumber') pageNumber = 0,
  ) {
    return this.MemDataHubAPIService.fetchTractsWithGeometry(
      pageNumber,
      pageSize,
    );
  }
}
