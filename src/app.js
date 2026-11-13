import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import router from "./routes/index.routes.js";
import { errorHandler } from "./middlewares/error-handler.js";


const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use("/v1/api", router);
app.use(errorHandler);


export default app;