import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';

@Injectable()
export class ExcelService {
  private static pixelWidth = require('string-pixel-width');

  /**
   * Write an Excel file with the given data, sheetName and schema
   * @param sheetName - Name of the Worksheet in the Workbook
   * @param data - An array of objects
   * @param schema - A schema object
   */
  async writeExcelFile(
    sheetName: string,
    data: any[],
    schema: { type: 'string' | 'number'; column: string }[],
  ): Promise<any> {
    // Create a new worksheet
    const workSheet = XLSX.utils.book_new();

    // Map the headers to an array from the schema
    const headers = schema.map((s) => s.column);

    // Create the sheet headers from the passed schema
    XLSX.utils.sheet_add_aoa(workSheet, [headers]);

    // Append the data line by line
    XLSX.utils.sheet_add_json(workSheet, [data], {
      origin: 'A2',
      skipHeader: true,
    });

    // Auto-fit the column names since Excel sucks
    workSheet['!cols'] = ExcelService.getAutoSizedColumns(headers);

    // Create a new workbook
    const workBook = XLSX.utils.book_new();

    // Append our worksheet to the workbook
    XLSX.utils.book_append_sheet(workBook, workSheet, sheetName);

    // Set the schema for our columns
    schema.forEach((schemaItem, index) => {
      for (let i = 1; i <= data.length + 1; i++) {
        const columnKey = `${ExcelService.numToExcelColumn(index + 1)}${i}`;
        if (schemaItem.type === 'string' || i == 1) {
          workBook.Sheets[sheetName][columnKey].z = '@';
        }
      }
    });

    // Finally, return our buffer
    return XLSX.write(workBook, { type: 'buffer', bookType: 'xlsx' });
  }

  /**
   * Converts a number from 1-99999 into a letter (like Excel does)
   * @param num - Number
   * @private
   */
  private static numToExcelColumn(num: number): string {
    let s = '',
      t;

    while (num > 0) {
      t = (num - 1) % 26;
      s = String.fromCharCode(65 + t) + s;
      num = ((num - t) / 26) | 0;
    }
    return s || undefined;
  }

  private static getAutoSizedColumns(headers: string[]): { width: number }[] {
    const objectMaxLength = [];

    headers.forEach((key) => {
      objectMaxLength.push(
        this.pixelWidth(key, {
          size: 4,
        }),
      );
    });

    return objectMaxLength.map((w) => {
      return { width: w };
    });
  }
}
