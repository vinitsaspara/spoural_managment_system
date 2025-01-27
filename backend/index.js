import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./utils/db.js";
import userRout from "./routes/userRout.js"
import gameRout from "./routes/gameRout.js"
import registorRout from "./routes/registorRout.js"
dotenv.config({});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
    origin: 'http//localhost:5173',
    credentials: true
}
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;


// api's
app.use("/api/v2/user", userRout);
app.use("/api/v2/game", gameRout);
app.use("/api/v2/registration", registorRout);


app.listen(PORT, () => {
    connectDB();
    console.log(`Server running at port ${PORT}`);
})