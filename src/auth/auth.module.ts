import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';
import { UsersRepository } from 'src/users/users.repository';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [JwtModule.register({ secret: process.env.JWT_SECRET }),
    PrismaModule, forwardRef(() => UsersModule)]
})
export class AuthModule { }
