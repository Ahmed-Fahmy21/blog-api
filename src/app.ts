import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/post.routes.js";
import { notFound, errorHandler } from "./middlewares/error.handler.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
    res.json({ message: "Blog API is running", docs: "/docs" });
});

// app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapi));
app.use("/auth", authRoutes);
app.use("/posts", postRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;