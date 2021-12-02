import { Injectable, StreamableFile } from '@nestjs/common';
import { ExcelService } from './excel.service';

@Injectable()
export class ExportService {
  constructor(private excelService: ExcelService) {}

  async exportExcel(
    fileName: string,
    sheetName: string,
    data: any,
    schema: { type: 'string' | 'number'; column: string }[],
    res: any,
  ) {
    const buffer = await this.excelService.writeExcelFile(
      sheetName,
      data,
      schema,
    );

    res.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="${fileName}"`,
      'Attachment-Filename': fileName,
    });

    return new StreamableFile(buffer);
  }

  /**
   * Builds an Excel file name like ZIPCode-export-2012-11-04-14:55:45
   * @param primaryID - Like zipcode
   * @param extension
   */
  public static buildFileName(primaryID: string, extension = 'xlsx'): string {
    const safePrimaryID = primaryID.split(' ').join('-');
    const formattedExtension = extension.replace('.', '');

    const exportDateString = new Date()
      .toISOString()
      .replace(/T/, '-')
      .replace(/\..+/, '');

    return `${safePrimaryID}-export-${exportDateString}.${formattedExtension}`;
  }
}
