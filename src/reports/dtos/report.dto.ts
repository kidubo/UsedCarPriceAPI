import { Expose, Transform } from 'class-transformer';
import {
  IsString,
  IsNumber,
  Min,
  Max,
  IsLongitude,
  IsLatitude,
} from 'class-validator';

export class reportDto {
  @Expose()
  make: string;
  @Expose()
  model: string;
  @Expose()
  year: number;
  @Expose()
  lng: number;
  @Expose()
  lat: number;
  @Expose()
  mileage: number;
  @Expose()
  price: number;

  @Transform(({ obj }) => obj.user.id) // Pull out the { id } from the original report entity and assigni it to userId 
  @Expose()
  userId: number;
}
