import { Expose, Transform } from 'class-transformer';

export class reportDto {
  @Expose()
  id: string;
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

  @Expose()
  approved: boolean;

  @Transform(({ obj }) => obj.user.id) // Pull out the { id } from the original report entity and assigni it to userId
  @Expose()
  userId: number;
}
