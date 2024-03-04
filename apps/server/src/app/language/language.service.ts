import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { LanguageModel } from './language.model';

@Injectable()
export class LanguageService {
    constructor(private readonly prisma: PrismaService) {}
    async getLanguages(): Promise<LanguageModel[]> {
      return this.prisma.language.findMany();
    }
  
    async addLanguage(id:string, name: string, description: string): Promise<LanguageModel> {
      return this.prisma.language.create({
        data: {
          id,
          name,
          description,
        },
      });
    }
  
    async updateLanguage(id: string, name: string, description: string): Promise<LanguageModel> {
      return this.prisma.language.update({
        where: { id },
        data: {
          name,
          description,
        },
      });
    }
  
    async deleteLanguage(id: string): Promise<boolean> {
      const deleteResult = await this.prisma.language.delete({
        where: { id },
      });
  
      return !!deleteResult;
    }
}
