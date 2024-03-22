import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class userDTO {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  mobileNumber: string;

  @Field()
  uid: string;
}
