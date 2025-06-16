import { IsEmail, isNotEmpty, IsNotEmpty, MinLength } from "class-validator";

export class SignupDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;
}