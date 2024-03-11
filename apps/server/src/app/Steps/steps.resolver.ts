import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { StepsModel } from './steps.model';
import { StepsService } from './steps.service';
import { stepsDTO } from './steps.dto';

@Resolver(() => StepsModel)

export class StepsResolver {
    prisma: any;
    constructor(private  StepsService: StepsService) {}

    @Query(() => [StepsModel])
    async getSteps(): Promise<StepsModel[]> {
      return this.StepsService.getSteps();
    }
  
    async createSteps(languageDto: stepsDTO){
      return (await this.prisma.steps.create({
        data: {
          name: languageDto?.name,
          description: languageDto?.description
        },
      })) 
    }
  
    // @Mutation(() => StepsModel)
    // async updateSteps(
    //   @Args('id') id: string,
    //   @Args('name') name: string,
    //   @Args('description') description: string,
    // ): Promise<StepsModel> {
    //   return this.StepsService.updateSteps(id, name, description);
    // }
  
    // @Mutation(() => Boolean)
    // async deleteSteps(@Args('id') id: string): Promise<boolean> {
    //   return this.StepsService.deleteSteps(id);
    // }
}
