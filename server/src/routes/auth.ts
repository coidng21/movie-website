import { Request, Response, Router } from "express";
import User from "../entities/User";
import {isEmpty, validate} from "class-validator";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import userMiddleware from "../middleware/user"
import authMiddleware from "../middleware/auth";

const me = async(_: Request, res: Response) => {
    return res.json(res.locals.user);
}

const mapErrors = (errors: Object[]) => {
    return errors.reduce((prev: any, err: any) => {
        prev[err.property] = Object.entries(err.constraints)[0][1];
        return prev;
    }, {})
}

const register = async (req: Request, res: Response) => {
    const {email, username, password} = req.body;
    console.log("req", email, username, password);
    try {
        let errors: any = {};

        const emailUser = await User.findOneBy({email});
        const usernameUser = await User.findOneBy({username});

        if (emailUser) {
            errors.email = "Email address is already used.";
        }

        if (usernameUser) {
            errors.username = "Username is already used.";
        }

        if (Object.keys(errors).length > 0) {
            return res.status(400).json(errors);
        }

        const user = new User();
        user.email = email;
        user.username = username;
        user.password = password; 

        errors = await validate(user);

        if (errors.length > 0) {
            return res.status(400).json(mapErrors(errors));
        }

        await user.save();

        return res.json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({error});
    }
};

const login = async (req: Request, res: Response) => {
    const {username, password} = req.body;
    console.log("login", username, password)
    try {
        let errors: any = {};

        if (isEmpty(username)) {
            errors.username = "You cannot leave this field empty";
        }
        if (isEmpty(password)) {
            errors.password = "You cannot leave this field empty.";
        }
        if (Object.keys(errors).length > 0) {
            return res.status(400).json(errors);
        }

        const user = await User.findOneBy({username});

        if (!user) {
            return res.status(404).json({username: "Username is not registered."});
        }

        const passwordMatches = await bcrypt.compare(password, user.password);

        if (!passwordMatches) {
            return res.status(401).json({password: "Password is Incorrect."});
        }

        const token = jwt.sign({username}, process.env.JWT_SECRET);

        res.set("Set-Cookie", cookie.serialize("token", token, {
            httpOnly: true,
            maxAge: 60*60*24*7,
            path: "/"
        }));

        console.log("LOGIN RES", res.cookie);

        return res.json({user, token});
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
};


const logout = async (_: Request, res: Response) => {
    res.set(
        "Set-Cookie",
        cookie.serialize("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            expires: new Date(0),
            path: "/",
        })
    );
    res.status(200).json({success: true});
};

const router = Router()
router.post("/register", register);
router.post("/login", login);
router.get("/me", userMiddleware, authMiddleware, me);
router.post("/logout", userMiddleware, authMiddleware, logout);

export default router