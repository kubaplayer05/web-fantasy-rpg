import express, {Express} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import authRoute from "./routes/authRoute";
import userClassRoute from "./routes/userClassRoute";
import authMiddleware from "./middlewares/authMiddleware";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors({credentials: true}));
app.use(express.json())
app.use(cookieParser())

app.use("/api/user", authRoute)
app.use("/api/userClass", userClassRoute)

app.use(authMiddleware)

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});