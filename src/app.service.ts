/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { data, ReportType } from './data';
import { v4 as uuidv4 } from 'uuid';

interface ReportData {
  amount: number;
  source: string;
}
@Injectable()
export class AppService {
  getAllReports(type: ReportType) {
    return data.reports.filter((report) => report.type === type);
  }

  getByReport(type: ReportType, id: string) {
    return data.reports
      .filter((report) => report.type === type)
      .find((r) => r.id === id);
  }

  createReport({ amount, source }: ReportData, type: ReportType) {
    const newReport = {
      id: uuidv4(),
      amount,
      source,
      created_at: new Date(),
      updated_at: new Date(),
      type,
    };
    data.reports.push(newReport);
    return newReport;
  }

  updateReport(type: ReportType, id: string, { amount, source }: ReportData) {
    const reportToUpdate = data.reports
      .filter((report) => report.type === type)
      .find((r) => r.id === id);
    if (!reportToUpdate) return;

    const reportIndex = data.reports.findIndex(
      (report) => report.id === reportToUpdate.id,
    );

    data.reports[reportIndex] = {
      ...data.reports[reportIndex],
      amount,
      source,
      updated_at: new Date(),
    };
    return data.reports[reportIndex];
  }

  deleteReport(id: string) {
    const reportIndex = data.reports.findIndex((report) => report.id === id);
    if (reportIndex === -1) return;
    data.reports.splice(reportIndex, 1);
  }
}
