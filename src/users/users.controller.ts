import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dtos/new-user.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}

    @Post("sign-up")
    async createUser(@Body() body: CreateUserDTO){
        return await this.usersService.createUser(body);
    }

    
}
