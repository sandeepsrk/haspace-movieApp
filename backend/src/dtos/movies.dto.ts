import {  IsString, IsNumber } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  public title: string;

  @IsString()
  public description: string;

 @IsNumber()
  public duration: number;

   @IsString()
  public genre: number;

  //@IsString()
  public image: object;
  
}
