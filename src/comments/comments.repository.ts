import { PrismaService } from './../prisma/prisma.service';
import { Body, Injectable } from "@nestjs/common";
import { NewCommentPrototype } from './comments.service';

@Injectable()
export class CommentsRepository {
    constructor(private prisma: PrismaService) { }

    create(@Body() data: NewCommentPrototype) {
        return this.prisma.comentarios.create({ data });
    }

    getByWord(@Body() palavraId: number) {
        return this.prisma.comentarios.findMany({ where: { palavraId } });
    }
}