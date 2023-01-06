import { Request, Response, Router } from "express";
import userMiddleware from "../middleware/user";
import authMiddleware from "../middleware/auth";
import Comment from "../entities/Comment";


const createMovieComment = async (req: Request, res: Response) => {
    const {movieId} = req.params;
    console.log("server movie id", movieId);
    const body = req.body.body;
    const user = req.body.user;

    try {
        const comment = new Comment();
        comment.body = body;
        comment.user = user;
        comment.movieId = movieId;

        console.log("USER", res.locals.user);

        await comment.save();
        return res.json(comment);
    } catch (error) {
        console.log(error);
        return res.status(400).json({error: "Cannot crete the movie comment"})
    }
}

const getMovieComment = async(req: Request, res: Response) => {
    const {movieId} = req.params;
    try {
        const comments = await Comment.find({
            where: {movieId: movieId},
            order: {createdAt: "DESC"},
        });
        return res.json(comments);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Cannot get Movie Comment"})
    }
}
const router = Router();
router.post("/:movieId/comments", userMiddleware, createMovieComment);
router.get("/:movieId/comments", userMiddleware, getMovieComment);

export default router;