import { Module } from '@nestjs/common';
import { WordsService } from './words.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { WordsRepository } from './words.repository';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [WordsService, WordsRepository],
  imports: [PrismaModule, UsersModule],
  exports: [WordsService]
})
export class WordsModule {}
