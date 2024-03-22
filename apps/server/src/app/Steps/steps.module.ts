import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { StepsResolver } from './steps.resolver';
import { StepsService } from './steps.service';

@Module({
  imports: [PrismaModule],
  providers: [StepsResolver, StepsService],
})
export class StepsModule {}
