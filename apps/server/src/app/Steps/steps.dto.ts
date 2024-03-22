import 'reflect-metadata';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class stepsDTO {
  @Field()
  name?: string;

  @Field()
  description?: string;
}
