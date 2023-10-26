import { IsString, IsStrongPassword, IsEmail, IsBoolean, IsNumber } from "class-validator";

export class CreateUserDTO {

    @IsString()
    nome: string;

    @IsString({
    })
    userName: string;

    @IsEmail()
    email: string;

    @IsStrongPassword({
        minLength: 6,
        minLowercase: 1,
        minNumbers: 1,
    })
    senha: string;

    @IsNumber()
    admin: number;
}