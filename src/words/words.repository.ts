import { PrismaService } from "src/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { palavrasPrototype } from "./words.controller";

@Injectable()
export class WordsRepository {
    constructor(private prisma: PrismaService) { }

    async findWords() {
        return this.prisma.palavras.findMany();
    }

    async findWordByName(word: string) {
        return this.prisma.palavras.findFirst({
            where: { Verbete: word },
            orderBy: { Verbete: 'asc' }
        });
    }

    async editWordById(wordId: number, data: palavrasPrototype) {
        return this.prisma.palavras.update({ where: { id: wordId }, data });
    }

}