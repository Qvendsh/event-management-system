import { EventCategory } from '@prisma/client';
import { IsEnum, IsIn, IsISO8601, IsOptional } from 'class-validator';

export class GetEventsQueryDto {
    @IsOptional()
    @IsEnum(EventCategory)
    category?: EventCategory;

    @IsOptional()
    @IsISO8601()
    dateFrom?: string;

    @IsOptional()
    @IsISO8601()
    dateTo?: string;

    @IsOptional()
    @IsIn(['date', 'createdAt', 'title', 'category'])
    sortBy?: 'date' | 'createdAt' | 'title' | 'category';

    @IsOptional()
    @IsIn(['asc', 'desc'])
    order?: 'asc' | 'desc';
}