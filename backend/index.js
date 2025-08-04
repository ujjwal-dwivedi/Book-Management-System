import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import {initDB} from "./db.js";
import bookRouter from "./routes/books.routes.js"

dotenv.config();
const PORT=process.env.PORT || 3001;

const app=express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use("/api/books", bookRouter);

initDB().then(()=>{
    app.listen(PORT, () => {
    console.log("server is running on port:", PORT);
});
});