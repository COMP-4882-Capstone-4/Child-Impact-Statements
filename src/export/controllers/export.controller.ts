import {
  Body,
  Controller,
  Post,
  Response,
  StreamableFile,
} from '@nestjs/common';
import {
  SchoolBreakdownRequest,
  TractBreakdownRequest,
  ZipBreakdownRequest,
} from '../requests/';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import {
  SchoolBreakdownSchema,
  TractBreakdownSchema,
  ZIPBreakdownSchema,
} from '../schemas';
import { ExportService } from '../services';

@ApiTags('Export')
@Controller('export')
export class ExportController {
  constructor(private exportService: ExportService) {}

  @Post('/zip')
  @ApiBody({ type: ZipBreakdownRequest })
  zipExport(
    @Response({ passthrough: true }) res,
    @Body() zipBreakdownRequest: ZipBreakdownRequest,
  ): Promise<StreamableFile> {
    const sheetName = `${zipBreakdownRequest.zipCode}`;
    const fileName = ExportService.buildFileName(
      `zip code ${zipBreakdownRequest.zipCode}`,
      'xlsx',
    );

    return this.exportService.exportExcel(
      fileName,
      sheetName,
      zipBreakdownRequest,
      ZIPBreakdownSchema,
      res,
    );
  }

  @Post('/tract')
  @ApiBody({ type: TractBreakdownRequest })
  tractExport(
    @Response({ passthrough: true }) res,
    @Body() tractBreakdownRequest: TractBreakdownRequest,
  ): Promise<StreamableFile> {
    const sheetName = `${tractBreakdownRequest.tract}`;
    const fileName = ExportService.buildFileName(
      `tract ${tractBreakdownRequest.tract}`,
      'xlsx',
    );

    return this.exportService.exportExcel(
      fileName,
      sheetName,
      tractBreakdownRequest,
      TractBreakdownSchema,
      res,
    );
  }

  @Post('/school')
  @ApiBody({ type: SchoolBreakdownRequest })
  schoolExport(
    @Response({ passthrough: true }) res,
    @Body() schoolBreakdownRequest: SchoolBreakdownRequest,
  ): Promise<StreamableFile> {
    const sheetName = 'School Information';
    const fileName = ExportService.buildFileName(
      `school ${schoolBreakdownRequest.schoolName}`,
      'xlsx',
    );

    const studentGradeBreakdown = schoolBreakdownRequest.studentGradeBreakdown;
    delete schoolBreakdownRequest.studentGradeBreakdown;

    const flattenedRequest = {
      ...schoolBreakdownRequest,
      ...studentGradeBreakdown,
    };

    return this.exportService.exportExcel(
      fileName,
      sheetName,
      flattenedRequest,
      SchoolBreakdownSchema(studentGradeBreakdown),
      res,
    );
  }
}
