import { Injectable } from '@nestjs/common';
import { WordsRepository } from './words.repository';
import { palavrasPrototype } from './words.controller';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class WordsService {
    constructor(private wordsRepository: WordsRepository, private usersService: UsersService) { }

    async findAllWords() {
        return this.wordsRepository.findWords()
    }

    async findWordByName(word: string) {
        return this.wordsRepository.findWordByName(word);
    }

    async editWord(wordId: number, data: palavrasPrototype, userId: number) {
        this.usersService.checkIfAdmin(userId);
        return this.wordsRepository.editWordById(wordId, data);
    }

    async deleteWord(wordId: number, userId: number) {
        this.usersService.checkIfAdmin(userId);
        return this.wordsRepository.deleteWordById(wordId);
    }
}
