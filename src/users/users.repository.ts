import { PrismaService } from "src/prisma/prisma.service";
import { Body, Injectable } from "@nestjs/common";
import { CreateUserDTO } from "./dtos/new-user.dto";

@Injectable()
export class UsersRepository{
    constructor(private prisma: PrismaService){}

    create(@Body() data: CreateUserDTO){
        return this.prisma.usuarios.create({data});
    }
    
    findByEmail(email: string){
        return this.prisma.usuarios.findFirst({where: {email}});
    }

    async findById(id: number) {
        const user = await this.prisma.usuarios.findUnique({ where: { id } });
    
        return user;
      }
    
}