import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { WordsService } from './words.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { palavras, usuarios } from '@prisma/client';
import { AuthorizedUser } from 'src/decorators/authorized-user.decorator';

export type palavrasPrototype = {
    Código: string;
    Verbete: string;
    verbeteIngles: string;
    num: number;
    indice: number;
    cabeca_simb: string;
    rubrica: string;
    grupo: string;
    classeGram: string;
    genero_num: string;
    volp: string;
    fontes: string;
    remissivaComplementar: string;
    remissivaImperativa: string;
    definicao: string;
    fórmula: string;
    topicoIluminacaoNatural: string;
    locucao_expressoes: string;
    etimologiaBruto: string;
    ortoepia: string;
    plural: string;
    sinonimosVariantes: string;
    antonimos: string;
    achega: string;
    exemplo: string;
    abonacao_citacoes_adagios: string;
    outrasLinguas: string;
    fig: string;
    comentariosExtraBrutos: string;
    comentariosExtraEditados: string;
    obsrcc: string;
    voceSabia: string;
}

@Controller('words')
export class WordsController {
    constructor(private wordsService: WordsService) { }

    @Get("")
    async getAllWords() {
        const words = await this.wordsService.findAllWords()
        return words;
    }

    @Get(":word")
    async getWordByName(@Param("word") word: string) {
        return this.wordsService.findWordByName(word);
    }

    @UseGuards(AuthGuard)
    @Put("edit-word/:wordId")
    async editWord(@Param("wordId", ParseIntPipe) wordId: number, @Body() body: palavrasPrototype, @AuthorizedUser() user: usuarios) {
        return this.wordsService.editWord(wordId, body, user.id);
    }
    @UseGuards(AuthGuard)
    @Delete("delete-word/:wordId")
    async deleteWord(@Param("wordId", ParseIntPipe) wordId: number, @AuthorizedUser() user: usuarios) {
        return this.wordsService.deleteWord(wordId, user.id);
    }
    
    @UseGuards(AuthGuard)
    @Post("new-word")
    async createNewWord(@Body() data: palavrasPrototype){
        return this.createNewWord(data);
    }
}
