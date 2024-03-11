import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { StepsModel } from './steps.model';

@Injectable()
export class StepsService {
    constructor(private readonly prisma: PrismaService) {}
    async getSteps(): Promise<StepsModel[]> {
      return this.prisma.steps.findMany();
    }
  
    async createSteps(id:string, name: string, description: string): Promise<StepsModel> {
      return this.prisma.steps.create({
        data: {
          id,
          name,
          description,
        },
      });
    }
  
    // async updateSteps(id: string, name: string, description: string): Promise<StepsModel> {
    //   return this.prisma.steps.update({
    //     where: { id },
    //     data: {
    //       name,
    //       description,
    //     },
    //   });
    // }
  
    // async deleteSteps(id: string): Promise<boolean> {
    //   const deleteResult = await this.prisma.steps.delete({
    //     where: { id },
    //   });
  
    //   return !!deleteResult;
    // }
}
