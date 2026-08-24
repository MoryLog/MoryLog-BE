import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "tbl_users"})
export class User{
    @PrimaryGeneratedColumn("uuid")
    userId!: string;

    @Column({type: "varchar", length: 255})
    email!: string;

    @Column({type: "varchar", length: 30})
    blogName!: string;

    @Column({type: "text"})
    profileImageUrl!: string;

    @Column({type: "varchar", length: 255})
    passwordHash!: string;

    @Column({type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    createdAt!: string;

    //TypeORM의 기본 사상에 맞게 구현.
    private constructor(){}

    static create(param: {
        email: string,
        blogName: string,
        profileImageUrl: string,
        passwordHash: string
    }): User{
        const user = new User();
        user.email = param.email;
        user.blogName = param.blogName;
        user.profileImageUrl = param.profileImageUrl;
        user.passwordHash = param.profileImageUrl;
        return user;
    }
}