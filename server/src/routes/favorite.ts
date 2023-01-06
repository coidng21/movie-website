import { Request, Response, Router } from "express";
import Favorite from "../entities/Favorite";
import userMiddleware from "../middleware/user";
import authMiddleware from "../middleware/auth";

const favorited = async(req: Request, res: Response) => {
    const {movieId, username} = req.params;
    
    console.log("Favorited", movieId, username);
    try {
        const liked = await Favorite.find({
            where: {"movieId": movieId, "username": username}
        })
        console.log('liked', liked);
        if (liked.length === 0) {
            return res.json({result: false})
        } else {
            return res.json({result: true})
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "cannot find info"});
    }
}
const addFavorite = async(req: Request, res: Response) => {
    const {movieId, user, movieTitle, posterPath} = req.body.variables;
    console.log("add movie", movieId, user);

    try {
        const fav = await Favorite.find({
            where: {"movieId": movieId, "username": user.username}
        })
        console.log("FAVVV", fav );
        if (fav.length !== 0) {
            return res.status(200).json({message: "The Movie is already in favorite list"})
        } 

        let favorite = new Favorite();
        favorite.movieId = movieId;
        favorite.movieTitle = movieTitle;
        favorite.user = user;
        favorite.posterPath = posterPath;
        console.log("favorite", favorite);
        favorite = await favorite.save();
        console.log("FAVORITE", favorite);
        return res.status(200).json({success: true});
    } catch (error) {
        return res.status(400).json({success: false, error: "Cannot add like"})
    }
}

const removeFavorite = async(req: Request, res: Response) => {
    const {movieId, user} = req.body.variables;
    try {
        await Favorite.delete({
            "movieId": movieId, "username": user.username
        });
        return res.status(200).json({success: true});
    } catch (error) {
        return res.status(400).json({error: "Cannot delete like"})
    }
}

const router = Router();
router.get("/:movieId/:username/favorited", userMiddleware, authMiddleware, favorited);
router.post("/addToFavorite", userMiddleware, authMiddleware, addFavorite);
router.post("/removeFavorite", userMiddleware, authMiddleware, removeFavorite);

export default router;