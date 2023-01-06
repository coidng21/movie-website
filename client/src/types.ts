export interface User {
    username: string;
    email: string;
    ImageUrn: string;
    ImageUrl: string;
    createdAt: string;
    updatedAt: string;
}

export interface Comment {
    identifier: string;
    body: string;
    username: string;
    user: User;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
    userVote: number;
    movieId: number;
    voteScore: string;
}

export interface Favorite {
    identifier: string;
    movieId: string;
    movieTitle: string;
    username: string;
    posterPath: string;
    result: boolean;
}