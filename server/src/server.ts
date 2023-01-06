import express from "express";
import morgan from "morgan";
import { AppDataSource } from "./data-source";
import authRoutes from "./routes/auth";
import movieRoutes from "./routes/movie";
import userRoutes from "./routes/user";
import favoriteRoutes from "./routes/favorite";
import cors from 'cors';
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';

const app = express();

// cors part (connect client with server)
const origin = "http://localhost:3000";
app.use(
    cors({
        origin,
        credentials: true
    })
);

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.static("public"));
dotenv.config();

app.get("/", (_, res) => res.send("running"));
app.use("/api/auth", authRoutes);
app.use("/api/movie", movieRoutes);
app.use("/api/user", userRoutes);
app.use("/api/favorite", favoriteRoutes);

let port = 4000;

app.listen(port, async () => { 
    console.log(`Server is running at http://localhost:${port}`);

    AppDataSource.initialize().then(async() => {
        console.log("Database Connected");
    }).catch(error => console.log(error))
});