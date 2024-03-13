import { Injectable, StreamableFile } from '@nestjs/common';
import { createReadStream, existsSync, mkdirSync, statSync, unlink } from 'fs';
import { join } from 'path';
import { Response } from 'express';
import { Workbook, stream } from 'exceljs';
import { EmployeeService } from 'src/employee/employee.service';
import { TABLE, columns } from 'src/common/constants';
import { CreateEmployeeDto } from 'src/employee/dto/create-employee.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReportService {
  constructor(
    private employeeService: EmployeeService,
    private prisma: PrismaService,
  ) {}
  async downloadFileTemplate(res: Response) {
    const fileName = 'Employee';
    const sheetName = 'employee';
    const fileLocationPath = `reports/${fileName}.xlsx`;
    if (!existsSync('reports')) {
      mkdirSync('reports', { recursive: true });
    }
    const workbook = new Workbook();
    const sheet = workbook.addWorksheet(sheetName);
    sheet.columns = columns;
    await workbook.xlsx.writeFile(fileLocationPath);
    const options = {
      filename: fileLocationPath,
    };
    const newWorkBook = new stream.xlsx.WorkbookWriter(options);
    const newWorksheet = newWorkBook.addWorksheet(sheetName);
    newWorksheet.columns = columns;
    await newWorkBook.commit();

    const filePath = join(process.cwd(), fileLocationPath);
    const file = createReadStream(filePath);
    const fileSize = statSync(filePath).size;
    res.setHeader('Content-Length', fileSize);
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=${fileName}.xlsx`,
    );
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    file.pipe(res);
    res.on('finish', () => {
      unlink(filePath, (error) => {
        console.error('error :: ', error);
      });
    });
    return new StreamableFile(file);
  }

  async uploadFile(file: any) {
    const workBook = new Workbook();
    const fileData = [];
    const empData = [];
    const message = [];
    await workBook.xlsx.readFile(file?.path).then(() => {
      const sheet = workBook?.getWorksheet('employee');
      sheet.eachRow({ includeEmpty: false }, (row) => {
        fileData.push(row?.values);
      });
    });
    const fileHeader = columns
      ?.filter((data) => fileData?.[0]?.includes(data?.header))
      ?.map((data) => data?.key);

    const fileValues = fileData
      ?.splice(1, fileData?.length)
      ?.map((data) => data?.filter((item) => item));

    await fileValues?.forEach((value) => {
      const obj: CreateEmployeeDto | any = {};
      fileHeader?.forEach((key, idx) => {
        if (typeof value?.[idx] === 'object') {
          obj[key] = value?.[idx]?.text.toString();
        } else {
          obj[key] = value?.[idx]?.toString();
        }
      });
      empData.push(obj);
    });
    await empData.forEach(async (obj, idx) => {
      const isEmpExists = await this.prisma.findUnique(TABLE.EMPLOYEE, {
        where: { employeeId: obj?.employeeId },
      });
      const isEmailExists = await this.prisma.findUnique(TABLE.EMPLOYEE, {
        where: { email: obj?.email },
      });

      const isPhoneNumberExists = await this.prisma.findUnique(TABLE.EMPLOYEE, {
        where: { phoneNumber: obj?.phoneNumber },
      });
      if (!isEmpExists && !isEmailExists && !isPhoneNumberExists) {
        await this.employeeService.CreateEmployee(obj as CreateEmployeeDto);
        message.push({ message: 'uploaded successfully' });
      } else {
        if (isEmpExists) {
          message.push({
            message: `Employee at row ${idx + 1} is already exists, Rename and upload again`,
          });
        } else if (isEmailExists) {
          message.push({
            message: `Email at row ${idx + 1} is already exists, Rename and upload again`,
          });
        } else if (isPhoneNumberExists) {
          message.push({
            message: `Phone Number at row ${idx + 1} is already exists, Rename and upload again`,
          });
        }
      }
    });
    unlink(file?.path, (error) => {
      console.error('error :: ', error);
    });
    if (empData?.length === 0) {
      return { message: 'The Uploaded file is empty' };
    }
    if (message?.length > 0) {
      return message;
    }
  }
}
