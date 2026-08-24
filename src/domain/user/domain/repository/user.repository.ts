import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../user";
import { Repository } from "typeorm";

@Injectable()
export class UserRepository{
    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>
    ){}

    public save(user: User): Promise<User>{
        return this.repository.save(user);
    }

    public findById(userId: string): Promise<User | null>{
        return this.repository.findOneBy({userId});
    }

    public findByEmail(email: string): Promise<User | null>{
        return this.repository.findOneBy({email})
    }

    public existsByEmail(email: string): Promise<boolean>{
        return this.repository.existsBy({email});
    }
}