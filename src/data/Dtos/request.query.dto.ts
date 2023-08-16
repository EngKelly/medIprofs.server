import { IsBoolean, IsInt, IsOptional, IsString, Min } from 'class-validator';

export interface RequestQuery {
  page: number;
  pageSize: number;
  keyword: string;
}

export class PaginationQueryDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  limit: number = 10;

  @IsOptional()
  @IsInt()
  year?: number;

  @IsOptional()
  @IsInt()
  month?: number;

  @IsOptional()
  @IsString()
  IsFetchByMonth: string = 'true';

  @IsOptional()
  @IsString()
  keyword: string = 'true';
}
