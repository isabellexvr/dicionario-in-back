import { Module } from '@nestjs/common';
import { WordsService } from './words.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { WordsRepository } from './words.repository';

@Module({
  providers: [WordsService, WordsRepository],
  imports: [PrismaModule],
  exports: [WordsService]
})
export class WordsModule {}
