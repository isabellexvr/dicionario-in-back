import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AuthService } from "src/auth/auth.service";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private usersService: UsersService
    ) { }

    async canActivate(context: ExecutionContext) {
        const req = context.switchToHttp().getRequest();
        const { authorization } = req.headers;

        try {
            const data = await this.authService.checkToken((authorization ?? "").split(" ")[1]);
            const user = await this.usersService.getUserById(parseInt(data.sub));
            req.user = user;
        }catch(error){
            console.log(error)
            return false
        }
        return true
    }
}