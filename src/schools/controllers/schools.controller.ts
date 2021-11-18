import { Controller, Get, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { SchoolsService } from '../services/schools.service';

@Controller('schools')
@ApiTags('Schools')
export class SchoolsController {
  constructor(private schoolsService: SchoolsService) {}

  @Get('breakdown')
  @ApiQuery({ type: Number, name: 'schoolID' })
  getBreakdownForSchool(@Query('schoolID') schoolID: number) {
    return this.schoolsService.getBreakdownForSchool(schoolID);
  }
}
