import { BeforeInsert, Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import BaseEntity from "./Entity";
import User from "./User";
import { makeId } from "../utils/helpers";

@Entity("favorites")
export default class Favorite extends BaseEntity {
    @Index() 
    @Column()
    identifier: string;

    @Column()
    @PrimaryColumn()
    movieId: string;

    @Column()
    movieTitle: string;

    @Column()
    @PrimaryColumn()
    username: string;

    @Column({nullable: true})
    posterPath: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: "username", referencedColumnName: "username"})
    user: User;

    @BeforeInsert()
    makeId() {
        this.identifier = makeId(8);
    }
}