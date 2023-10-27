import { Injectable } from '@nestjs/common';
import { CommentsRepository } from './comments.repository';

export type NewCommentPrototype = {
    usuarioId: number,
    palavraId: number,
    comentario: string
}

@Injectable()
export class CommentsService {

    constructor(private commentsRepository: CommentsRepository){}

    async newComment(data: NewCommentPrototype){
        return this.commentsRepository.create(data);
    }

    async findCommentsByWord(wordId: number){
        return this.commentsRepository.getByWord(wordId);
    }
}
