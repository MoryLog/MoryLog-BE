import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt'

@Injectable()
export class BcryptPasswordEncoder{
    private readonly saltRounds = 10;

    public encode(rawPassword: string): Promise<string>{
        return bcrypt.hash(rawPassword, this.saltRounds);
    }

    matches(
        rawPassword: string,
        encodeedPassword: string,
    ): Promise<boolean>{
        return bcrypt.compare(rawPassword, encodeedPassword);
    }
}