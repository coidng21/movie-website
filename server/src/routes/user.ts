import { Request, Response, Router } from "express";
import userMiddleware from "../middleware/user"
import authMiddleware from "../middleware/auth";
import User from "../entities/User";
import { unlinkSync } from "fs";
import { subtle } from "crypto";
import multer, { FileFilterCallback } from "multer";
import { callbackify } from "util";
import { makeId } from "../utils/helpers";
import { fileURLToPath } from "url";
import Favorite from "../entities/Favorite";

const path = require( "path" );

const upload = multer({
    storage: multer.diskStorage({
        destination:"public/images",
        filename: (_, file: File, callback) => {
            const name = makeId(10);
            callback(null, name + file.name);
        }
    }),
    fileFilter:(_, file: any, callback: FileFilterCallback) => {
        if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
            callback(null, true);
        } else {
            callback(new Error("Not an Image"));
        }
    }
})

interface MulterRequest extends Request {
    file: any;
}

const uploadProfileImage = async(req: Request, res: Response) => {
    const user: User = res.locals.user;
    console.log("Upload Image", (req as MulterRequest).file);
    try {
        const type = req.body.type;
        if(type !== "image") {
            if((req as MulterRequest).file?.path) {
                return res.status(400).json({error: "Invalid File"})
            }
            unlinkSync((req as MulterRequest).file.path);
            return res.status(400).json({error: "Wrong Type"})
        }

        let oldImageUrn:string = "";
        if (type === "image") {
            oldImageUrn = user.imageUrn || "";
            user.imageUrn = (req as MulterRequest).file.filename || "";
        }

        await user.save();

        if (oldImageUrn !== "") {
            const fullFilename = path.resolve(
                process.cwd(),
                "public",
                "images",
                oldImageUrn
            );
            unlinkSync(fullFilename);
        }

        return res.json(user);
    } catch(error) {
        console.log(error);
        return res.status(500).json({error: "Cannot Upload Image"});
    }
}

const getFavoriteList = async(req: Request, res: Response) => {
    const user: User = res.locals.user;
    const username = user.username;
    console.log("get favlist", username);
    try {
        const favoriteList = await Favorite.find({
            where: {"username": username}
        })
        console.log("FAV list ", favoriteList);
        return res.json(favoriteList);
    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Cannot get favorite list"});
    }
}

const router = Router();

router.post("/:username/upload", userMiddleware, authMiddleware, upload.single("file"), uploadProfileImage);
router.get("/:username/favoriteList", userMiddleware, authMiddleware, getFavoriteList);

export default router;