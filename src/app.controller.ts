/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { data, ReportType } from './data';
import { v4 as uuidv4 } from 'uuid';

@Controller('report/:type')
export class AppController {
  @Get()
  getAllReports(@Param('type') type: string) {
    return data.reports.filter((report) => report.type === type);
  }

  @Get(':id')
  getByReport(@Param('type') type: string, @Param('id') id: string) {
    return data.reports
      .filter((report) => report.type === type)
      .find((r) => r.id === id);
  }

  @Post()
  createReport(
    @Body() { amount, source }: { amount: number; source: string },
    @Param('type') type: string,
  ) {
    const newReport = {
      id: uuidv4(),
      amount,
      source,
      created_at: new Date(),
      updated_at: new Date(),
      type: type === 'income' ? ReportType.INCOME : ReportType.EXPENSE,
    };
    data.reports.push(newReport);
    return newReport;
  }

  @Put(':id')
  updateReport(
    @Param('type') type: string,
    @Param('id') id: string,
    @Body()
    { amount, source }: { amount: number; source: string },
  ) {
    const reportToUpdate = data.reports
      .filter((report) => report.type === type)
      .find((r) => r.id === id);
    if (!reportToUpdate) {
      return;
    }
    const reportIndex = data.reports.findIndex(
      (report) => report.id === reportToUpdate.id,
    );

    data.reports[reportIndex] = {
      ...data.reports[reportIndex],
      amount,
      source,
    };
    return data.reports[reportIndex];
  }

  @Delete(':id')
  deleteReport(@Param('type') type: string, @Param('id') id: string) {
    const reportToUpdate = data.reports
      .filter((report) => report.type === type)
      .find((r) => r.id === id);
    if (!reportToUpdate) {
      return;
    }
    const reportIndex = data.reports.findIndex(
      (report) => report.id === reportToUpdate.id,
    );
    data.reports.splice(reportIndex, 1);
    return 'Deleted Successfully';
  }
}
