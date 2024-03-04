import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LanguageModel } from './language.model';
import { LanguageService } from './language.service';

@Resolver(() => LanguageModel)

export class LanguageResolver {
    constructor(private  languageService: LanguageService) {}

    @Query(() => [LanguageModel])
    async getLanguages(): Promise<LanguageModel[]> {
      return this.languageService.getLanguages();
    }
  
    @Mutation(() => LanguageModel)
    async addLanguage(
      @Args('id') id: string,
      @Args('name') name: string,
      @Args('description') description: string,
    ): Promise<LanguageModel> {
      return this.languageService.addLanguage(id,name, description);
    }
  
    @Mutation(() => LanguageModel)
    async updateLanguage(
      @Args('id') id: string,
      @Args('name') name: string,
      @Args('description') description: string,
    ): Promise<LanguageModel> {
      return this.languageService.updateLanguage(id, name, description);
    }
  
    @Mutation(() => Boolean)
    async deleteLanguage(@Args('id') id: string): Promise<boolean> {
      return this.languageService.deleteLanguage(id);
    }
}
