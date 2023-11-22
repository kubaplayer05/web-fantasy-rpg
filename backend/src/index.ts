import express, {Express} from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser'
import authRoute from "./routes/authRoute";
import userClassRoute from "./routes/userClassRoute";
import userRoute from "./routes/userRoute";
import adminAuthMiddleware from "./middlewares/adminAuthMiddleware";
import adminPanelRoute from "./routes/adminPanelRoute";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors({origin: process.env.FRONTEND_APP_URL, credentials: true}));
app.use(express.json())
app.use(cookieParser())

app.use("/api/user", authRoute)
app.use("/api/user", userRoute)
app.use("/api/userClass", userClassRoute)

app.use(adminAuthMiddleware)

app.use("/api/panel", adminPanelRoute)

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});