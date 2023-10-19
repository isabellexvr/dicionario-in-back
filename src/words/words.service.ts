import { Injectable } from '@nestjs/common';
import { WordsRepository } from './words.repository';

@Injectable()
export class WordsService {
    constructor(private wordsRepository: WordsRepository){}

    async findAllWords(){
        return this.wordsRepository.findWords()
    }

    async findWordByName(word: string){
        return this.wordsRepository.findWordByName(word);
    }
}
