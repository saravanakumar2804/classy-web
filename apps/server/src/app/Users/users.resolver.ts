import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { usersService } from './users.service';
import { usersModel } from './users.model';
import { userDTO } from './users.dto';

@Resolver()
export class usersResolver {
  constructor(private usersService: usersService) {}

  @Query(() => [usersModel])
  async getUsers() {
    return this.usersService.getUsers();
  }

  @Mutation(() => usersModel)
  async createUsers(@Args('input') input: userDTO) {
    return this.usersService.createUsers(input);
  }

  // @Mutation(() => usersModel)
  //   async updateUsers(
  //     @Args('id') id: string,
  //     @Args('name') name: string,
  //     @Args('description') description: string,
  //   ): Promise<usersModel> {
  //     return this.usersService.updateUsers(id, name, description);
  //   }
  
  //   @Mutation(() => Boolean)
  //   async deleteUsers(@Args('id') id: string): Promise<boolean> {
  //     return this.usersService.deleteUsers(id);
  //   }
}