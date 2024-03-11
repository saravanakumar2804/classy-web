import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('User')
export class usersModel {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  mobileNumber: string;
}