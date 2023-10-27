import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { CommentsRepository } from './comments.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [CommentsService, CommentsRepository],
  controllers: [CommentsController],
  imports:[PrismaModule, AuthModule, UsersModule],
  exports:[CommentsService]
})
export class CommentsModule {}
