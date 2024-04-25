import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./swagger.json";
import "dotenv/config";
import { router } from "./routes";

export const app = express();
app.use(express.json());
app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(router)
