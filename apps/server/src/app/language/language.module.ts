import { Module } from '@nestjs/common';
import { LanguageResolver } from './language.resolver';
import { LanguageService } from './language.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [LanguageResolver, LanguageService],
})
export class LanguageModule {}
