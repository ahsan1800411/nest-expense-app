/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { data, ReportType } from '../data';
import { v4 as uuidv4 } from 'uuid';
import { ReportResponseDto } from '../dtos/reports.dto';

interface ReportData {
  amount: number;
  source: string;
}
interface UpdateReportData {
  amount?: number;
  source?: string;
}
@Injectable()
export class ReportService {
  getAllReports(type: ReportType): ReportResponseDto[] {
    return data.reports
      .filter((report) => report.type === type)
      .map((report) => new ReportResponseDto(report));
  }

  getByReport(type: ReportType, id: string): ReportResponseDto {
    const report = data.reports
      .filter((report) => report.type === type)
      .find((r) => r.id === id);
    if (!report) return;
    return new ReportResponseDto(report);
  }

  createReport(
    { amount, source }: ReportData,
    type: ReportType,
  ): ReportResponseDto {
    const newReport = {
      id: uuidv4(),
      amount,
      source,
      created_at: new Date(),
      updated_at: new Date(),
      type,
    };
    data.reports.push(newReport);
    return new ReportResponseDto(newReport);
  }

  updateReport(
    type: ReportType,
    id: string,
    { amount, source }: UpdateReportData,
  ): ReportResponseDto {
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
    return new ReportResponseDto(data.reports[reportIndex]);
  }

  deleteReport(id: string) {
    const reportIndex = data.reports.findIndex((report) => report.id === id);
    if (reportIndex === -1) return;
    data.reports.splice(reportIndex, 1);
  }
}
