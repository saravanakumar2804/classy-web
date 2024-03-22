import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { StepsModel } from './steps.model';
import { StepsService } from './steps.service';
import { stepsDTO } from './steps.dto';

@Resolver(() => StepsModel)
export class StepsResolver {
  constructor(private StepsService: StepsService) {}

  @Query(() => [StepsModel])
  async getSteps(): Promise<StepsModel[]> {
    return this.StepsService.getSteps();
  }

  @Mutation(() => StepsModel)
  async createSteps(@Args('stepsDTO') stepsDTO: stepsDTO) {
    return this.StepsService.createSteps(stepsDTO);
  }

  @Mutation(() => StepsModel)
  async updateSteps(
    @Args('id') id: string,
    @Args('name') name: string,
    @Args('description') description: string
  ): Promise<StepsModel> {
    return this.StepsService.updateSteps(id, name, description);
  }

  @Mutation(() => Boolean)
  async deleteSteps(@Args('id') id: string): Promise<boolean> {
    return this.StepsService.deleteSteps(id);
  }
}
