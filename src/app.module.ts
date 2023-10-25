import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WordsController } from './words/words.controller';
import { WordsModule } from './words/words.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [WordsModule, AuthModule, PrismaModule, UsersModule],
  controllers: [AppController, WordsController],
  providers: [AppService],
})
export class AppModule {}
