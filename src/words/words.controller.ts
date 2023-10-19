import { Controller,Get, Param, ParseIntPipe } from '@nestjs/common';
import { WordsService } from './words.service';

@Controller('words')
export class WordsController {
    constructor(private wordsService: WordsService){}

    @Get("")
    async getAllWords(){
        const words = await this.wordsService.findAllWords()
        return words;
    }

    @Get(":word")
    async getWordByName(@Param("word") word: string){
        return this.wordsService.findWordByName(word);
    }
}
