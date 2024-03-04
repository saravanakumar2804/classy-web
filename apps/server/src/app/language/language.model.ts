import 'reflect-metadata'
import {
  Field,
  ID,
  ObjectType,
} from '@nestjs/graphql'

@ObjectType()
export class LanguageModel {
    @Field(() => ID)
    id?: string;
     
    @Field()
    name: string

    @Field()
    description: string
}