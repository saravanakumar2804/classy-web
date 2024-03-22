import 'reflect-metadata';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LanguageModel {
  @Field(() => String)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;
}
