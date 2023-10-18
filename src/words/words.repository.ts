import { PrismaService } from "src/prisma/prisma.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class WordsRepository{
    constructor(private prisma: PrismaService){}

    async findWords(){
        return this.prisma.palavras.findMany();
    }
}