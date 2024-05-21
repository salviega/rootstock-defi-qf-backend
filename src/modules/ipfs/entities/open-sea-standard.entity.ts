import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsNumber,
  ValidateNested,
  IsArray,
  IsDefined,
} from 'class-validator';
import { Type } from 'class-transformer';
import { IsStringOrNumber } from '../../../validators/is-string-or-number.validator';

export class Attribute {
  @ApiProperty()
  @IsString()
  trait_type: string;

  @ApiProperty({
    oneOf: [{ type: 'string' }, { type: 'string' }],
    description: 'The value field can be either a string or a number',
  })
  @IsStringOrNumber()
  @IsDefined()
  value: string | number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  display_type?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  max_value?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  trait_count?: number;
}

export class OpenSeaStandard {
  @ApiProperty()
  @IsString()
  image: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  image_data?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  external_url?: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  background_color?: string;

  @ApiPropertyOptional({ type: [Attribute] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Attribute)
  attributes?: Attribute[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  animation_url?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  youtube_url?: string;
}
