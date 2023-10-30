import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { AuthorizedUser } from 'src/decorators/authorized-user.decorator';
import { usuarios } from '@prisma/client';
import { NewCommentDTO } from './dtos/new-comment.dto';

@Controller('comments')
export class CommentsController {

    constructor(private commentsService: CommentsService) { }

    @UseGuards(AuthGuard)
    @Post("new")
    async newComment(@AuthorizedUser() user: usuarios, @Body() body: NewCommentDTO) {
        return this.commentsService.newComment({ ...body, usuarioId: Number(user.id), palavraId: Number(body.palavraId) });
    }

    @Get("word/:wordId")
    async getCommentsByWord(@Param("wordId", ParseIntPipe) wordId: number) {
        return this.commentsService.findCommentsByWord(wordId);
    }

}