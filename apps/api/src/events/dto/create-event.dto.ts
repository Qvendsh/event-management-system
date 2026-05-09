import { EventCategory } from '@prisma/client';
import {
    IsEnum,
    IsISO8601,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    MaxLength,
} from 'class-validator';

export class CreateEventDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(120)
    title!: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(2000)
    description!: string;

    @IsISO8601()
    date!: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    location!: string;

    @IsEnum(EventCategory)
    category!: EventCategory;

    @IsOptional()
    @IsNumber()
    latitude?: number;

    @IsOptional()
    @IsNumber()
    longitude?: number;
}