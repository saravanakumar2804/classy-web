import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { usersService } from './users.service';
import { usersModel } from './users.model';
import { userDTO } from './users.dto';
import { usersModule } from './users.module';

@Resolver(() => usersModel)
export class usersResolver {
  constructor(private usersService: usersService) {}

  @Query(() => [usersModel])
  async getUsers(): Promise<usersModel[]> {
    return this.usersService.getUsers();
  }

  @Mutation(() => usersModel)
  async createUsers(@Args('userDTO') userDTO: userDTO) {
    return this.usersService.createUsers(userDTO);
  }

  @Mutation(() => usersModel)
  async updateUsers(
    @Args('id') id: string,
    @Args('userDTO') userDTO: userDTO,
  ): Promise<usersModel> {
    return this.usersService.updateUsers(id, userDTO);
  }

  @Mutation(() => Boolean)
  async deleteUsers(@Args('id') id: string): Promise<boolean> {
    return this.usersService.deleteUsers(id);
  }
}
