import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./utils/db.js";
import userRout from "./routes/userRout.js"
import gameRout from "./routes/gameRout.js"
import registorRout from "./routes/registorRout.js"
import adminRoute from "./routes/adminRout.js"
import culturalRout from "./routes/culturalRout.js"
import SchedualRoute from "./routes/gameScheduleRoutes.js"
import practiceRoute from "./routes/precticeRout.js"

dotenv.config({});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from your frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
  credentials: true, // Allow cookies if needed
}));



const PORT = process.env.PORT || 3000;


// api's
app.use("/api/v2/user", userRout);
app.use("/api/v2/game", gameRout);
app.use("/api/v2/registration", registorRout);
app.use("/api/v2/admin", adminRoute);
app.use("/api/v2/cultural", culturalRout);

app.use("/api/v2/schedual", SchedualRoute);
app.use("/api/v2/practice", practiceRoute);


app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at port ${PORT}`);
})