import { Module } from '@nestjs/common';
import { ExportController } from './controllers/export.controller';
import { ExcelService, ExportService } from './services/';

@Module({
  controllers: [ExportController],
  providers: [ExcelService, ExportService],
})
export class ExportModule {}
