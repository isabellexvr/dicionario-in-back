import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { WordsService } from './words.service';
import { AuthGuard } from 'src/guards/auth.guard';
import {  usuarios } from '@prisma/client';
import { AuthorizedUser } from 'src/decorators/authorized-user.decorator';
import { ReverseSearchType, Searches, palavrasPrototype } from './models';

export type TabsFilter = {
    containingTabs: string[],
    notContainingTabs: string[]
}

@Controller('words')
export class WordsController {
    constructor(private wordsService: WordsService) { }

    @Post("simple-search")
    async searchWords(@Query() query: any, @Body() options: Searches) {
        return this.wordsService.search(query.input, options);
    }
    
    @Post("filter-by-tabs")
    async filterWordsByTabs(@Body() body: TabsFilter){
        return this.wordsService.filterWordsByTabs(body);
    }

    @Post("reverse-search")
    async reverseSearch(@Body() words: ReverseSearchType){
        return this.wordsService.reverseSearch(words);
    }

    @Get("name/:word")
    async getWordByName(@Param("word") word: string) {
        return this.wordsService.findWordByName(word);
    }

    @Get("tabs/:word")
    async getWordTabs(@Param("word") word: string){
        return this.wordsService.findTabsByWordName(word);
    }

    @Get("id/:id")
    async getWordById(@Param("id", ParseIntPipe)id: number){
        return this.wordsService.findWordById(id);
    }

    @Get("char/:char")
    async getWordByFirstChar(@Param("char") char: string){
        return this.wordsService.findWordByFirstChar(char);
    }

    @Get("all")
    async getAllWords() {
        const words = await this.wordsService.findAllWords()
        return words;
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
    async createNewWord(@Body() data: palavrasPrototype) {
        return this.createNewWord(data);
    }


}
