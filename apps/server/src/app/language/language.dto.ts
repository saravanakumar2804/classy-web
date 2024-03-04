import 'reflect-metadata'
import { Field, InputType } from '@nestjs/graphql'



@InputType()

export class languageDTO{
   
    @Field()
    name: string

    @Field()
    description: string;
}