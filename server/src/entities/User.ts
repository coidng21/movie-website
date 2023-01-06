import { Exclude, Expose } from "class-transformer";
import { IsEmail, Length } from "class-validator";
import { BeforeInsert, Column, Entity, Index, OneToMany } from "typeorm";
import bcrypt from "bcryptjs";
import BaseEntity from "./Entity";

@Entity("users")
export default class User extends BaseEntity {
    @Index()
    @IsEmail(undefined, { message: "Email address is in incorrect format."})
    @Length(1, 255, { message: "Cannot leave Email field empty. "})
    @Column({ unique: true })
    email: string;

    @Index()
    @Length(3, 22, {message: "Username needs to be longer than 3 characters."})
    @Column({unique: true})
    username: string;

    @Exclude()
    @Column()
    @Length(6, 255, {message: "Password needs to be longer than 6 characters."})
    password: string;
    
    @Column({nullable: true})
    imageUrn: string;

    @Expose()
    get ImageUrl(): string {
        return this.imageUrn ? `${process.env.APP_URL}/images/${this.imageUrn}` :
        "https://www.gravatar.com/avatar?d=mp&f-y"
    }

    @BeforeInsert()
    async hasPassword() {
        this.password = await bcrypt.hash(this.password, 6);
    }

}