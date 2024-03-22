import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { usersResolver } from './users.resolver';
import { usersService } from './users.service';

@Module({
  imports: [PrismaModule],
  providers: [usersResolver, usersService],
})
export class usersModule {}
