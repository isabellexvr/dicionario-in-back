import { Controller,Get } from '@nestjs/common';
import { WordsService } from './words.service';

@Controller('words')
export class WordsController {
    constructor(private wordsService: WordsService){}

    @Get("")
    async getAllWords(){
        const words = await this.wordsService.findAllWords()
        return words;
    }
}
