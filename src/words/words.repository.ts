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

    async findWordById(id: number){
        return this.prisma.palavras.findFirst({
            where: {id}
        })
    }

    async findWordByFirstChar(char: string){
        return this.prisma.palavras.findMany({
            where: {
                Verbete: {
                    startsWith: char,
                    mode: "insensitive"
                }
            },
            orderBy: {id: 'asc'}
        })
    }

    async editWordById(wordId: number, data: palavrasPrototype) {
        return this.prisma.palavras.update({ where: { id: wordId }, data });
    }

    async deleteWordById(wordId: number) {
        return this.prisma.palavras.delete({ where: { id: wordId } })
    }

    async findWordByItsName(word: string) {
        return this.prisma.palavras.findFirst({ where: { Verbete: word } })
    }

    async createNewWord(data: palavrasPrototype) {
        return this.prisma.palavras.create({ data });
    }

    async findWordsByDescription(search: string) {
        
        return this.prisma.palavras.findMany({
            where: {
                OR:[
                   {definicao: {contains: search}},
                   {Verbete: {contains: search}}
                ]
                
            },
            select: {
                Verbete: true,
                definicao: true
            },
            take: 5
        })
    }
}