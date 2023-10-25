import { Exclude, Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class RestaurantsPayloadDto {
  @IsOptional()
  @Transform(({ value }) => value.trim())
  search: string;

  @Exclude()
  longitude: string;
  @Exclude()
  latitude: string;
}
