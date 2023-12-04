import { ConflictException, Injectable } from '@nestjs/common';
import { WordsRepository } from './words.repository';
import { Searches, palavrasPrototype } from './models';
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

    async findTabsByWordName(word: string){
        return this.wordsRepository.tabsByWordName(word);
    }

    async findWordByFirstChar(char: string){
        //order by id
        return this.wordsRepository.findWordByFirstChar(char);
    }

    async findWordById(id: number){
        return this.wordsRepository.findWordById(id);
    }

    async editWord(wordId: number, data: palavrasPrototype, userId: number) {
        this.usersService.checkIfAdmin(userId);
        return this.wordsRepository.editWordById(wordId, data);
    }

    async deleteWord(wordId: number, userId: number) {
        this.usersService.checkIfAdmin(userId);
        return this.wordsRepository.deleteWordById(wordId);
    }

    async createNewWord(data: palavrasPrototype){
        const wordExists = this.findWordByName(data.Verbete);
        if(wordExists ){
            throw new ConflictException("Essa palavra já existe.");
        }
        return this.createNewWord(data);
    }

    async search(query: string, options: Searches){
        const {startsWith, endsWith} = options;

        const answer = await this.wordsRepository.simpleSearch(query, startsWith, endsWith);

        if(!answer) return []

        return answer.map(e => e.Verbete);
    }

    async findWordsByDescription(search: any){
       // if(search == "") return []
        const answer = await this.wordsRepository.findWordsByDescription(search);

    }
}
