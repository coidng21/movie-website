import { BeforeInsert, Column, Entity, Index, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { ExclusionMetadata } from "typeorm/metadata/ExclusionMetadata";
import BaseEntity from './Entity';
import User from "./User";
import { Exclude, Expose } from "class-transformer";
import { makeId } from "../utils/helpers";

@Entity("comments")
export default class Comment extends BaseEntity {
    @Index()
    @Column()
    identifier: string;

    @Column()
    body: string;

    @Column()
    username: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: "username", referencedColumnName: "username"})
    user: User;

    @Column()
    movieId: string;

    @BeforeInsert()
    makeId() {
        this.identifier = makeId(8);
    }
}