import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/router";

dotenv.config();
const app = express();

app.use(cors());
app.use(router)

const PORT: number = Number(process.env.PORT) || 4003;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
