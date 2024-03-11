import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { LanguageModel } from './language.model';
import { languageDTO } from './language.dto';

@Injectable()
export class LanguageService {
    constructor(private readonly prisma: PrismaService) {}
    async getLanguages(): Promise<LanguageModel[]> {
      return this.prisma.language.findMany();
    }
  
    async createLanguage(languageDto: languageDTO){
      return (await this.prisma.language.create({
        data: {
          name: languageDto?.name,
          description: languageDto?.description
        },
      })) 
    }
  
    // async updateLanguage(id: string, name: string, description: string): Promise<LanguageModel> {
    //   return this.prisma.language.update({
    //     where: { id },
    //     data: {
    //       name,
    //       description,
    //     },
    //   });
    // }
  
    // async deleteLanguage(id: string): Promise<boolean> {
    //   const deleteResult = await this.prisma.language.delete({
    //     where: { id },
    //   });
  
    //   return !!deleteResult;
    // }
}
