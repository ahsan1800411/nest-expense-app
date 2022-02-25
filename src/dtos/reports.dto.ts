/* eslint-disable prettier/prettier */

import { Exclude, Expose } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { ReportType } from 'src/data';

export class CreateReportDto {
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsString()
  @IsNotEmpty()
  source: string;
}
export class UpdateReportDto {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  amount: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  source: string;
}

export class ReportResponseDto {
  id: string;
  amount: number;
  source: string;
  type: ReportType;

  @Expose({ name: 'createdAt' })
  transformCreatedAt() {
    return this.created_at;
  }

  @Exclude()
  created_at: Date;

  @Exclude()
  updated_at: Date;

  constructor(partial: Partial<ReportResponseDto>) {
    Object.assign(this, partial);
  }
}

// >>>>>>>>>>>>Just for demonstration how to create a custom Interceptor

// import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
// import { map } from 'rxjs';

// export class CustomInterceptor implements NestInterceptor {
//   intercept(context: ExecutionContext, handler: CallHandler) {
//     return handler.handle().pipe(
//       map((data) => {
//         const response = {
//           ...data,
//           createdAt: data.createdAt,
//         };
//         delete response.created_at;
//         delete response.updated_at;

//         return response;
//       }),
//     );
//   }
// }
