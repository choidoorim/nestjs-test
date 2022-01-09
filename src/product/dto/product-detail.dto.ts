import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ProductDetailRequestDto {
  @ApiProperty({ description: '성' })
  @IsString()
  readonly name: string;
}

export class ProductDetailResponseDto {
  @ApiProperty({ description: 'Id' })
  readonly id: number;

  @ApiProperty({ description: 'Name' })
  readonly name: string;
}
