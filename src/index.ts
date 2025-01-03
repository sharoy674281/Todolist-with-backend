import express from "express";
import mongoose, { isValidObjectId, Schema } from "mongoose";
import dotenv from "dotenv";
import taskRoutes from "./routers/task.router";
const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "";

app.use(express.json());
app.use("/tasks", taskRoutes);

mongoose
	.connect(MONGO_URI)
	.then(() => {
		console.log("Connected to MongoDb");
		app.listen(PORT, () => {
			console.log(`Listening on port ${PORT}`);
		});
	})
	.catch((err: Error) => {
		console.error("Failed to connect to MongoDB", err);
	});
