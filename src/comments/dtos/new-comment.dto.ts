import { IsString, IsStrongPassword, IsEmail, IsBoolean, IsNumber } from "class-validator";

export class NewCommentDTO{
    @IsString()
    comentario: string;

    @IsNumber()
    palavraId: number;

}