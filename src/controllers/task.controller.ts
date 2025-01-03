import { Request, Response } from "express";
import Task from "../models/task.model";
import { isValidObjectId } from "mongoose";

export const getTasks = async (req: Request, res: Response) => {
	try {
		const tasks = await Task.find();
		res.status(200).json({ success: true, data: tasks });
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ success: false, error: error.message });
		} else {
			res.status(500).json({ success: false, error: "Server error" });
		}
	}
};

export const getTask = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		if (!isValidObjectId(id)) {
			res.status(400).json({ success: false, message: "Invalid task ID" });
		}
		const task = await Task.findById(id);
		if (!task) {
			res.status(404).json({ success: false, message: "Task not found" });
		}
		res.status(200).json({ success: true, user: task });
	} catch (error) {
		if (error instanceof Error) {
			res.status(500).json({ success: false, message: error.message });
		} else {
			res.status(500).json({ success: false, message: "unknown error" });
		}
	}
};

export const createTask = async (req: Request, res: Response) => {
	try {
		const task = await Task.create(req.body);
		res.status(201).json({ success: true, data: task });
	} catch (error) {
		if (error instanceof Error) {
			res.status(400).json({ success: false, error: error.message });
		} else {
			res.status(400).json({ success: false, error: "Bad request" });
		}
	}
};

export const deleteTask = async (req: Request, res: Response) => {
   try {
      const { id } = req.params;
      if (!isValidObjectId(id)) {
         res.status(400).json({ success: false, message: "Invalid task ID" });
      }
      const task = await Task.findByIdAndDelete(id);
      if (!task) {
         res.status(404).json({ success: false, message: "Task not found" });
      }
      res.status(200).json({ success: true, message: "Task deleted" });
   } catch (error) {
      if (error instanceof Error) {
         res.status(500).json({ success: false, message: error.message });
      } else {
         res.status(500).json({ success: false, message: "unknown error" });
      }
   }
}

export const updateTask = async (req: Request, res: Response) => {
   try {
      const { id } = req.params;
      if (!isValidObjectId(id)) {
         res.status(400).json({ success: false, message: "Invalid task ID" });
      }
      const task = await Task.findByIdAndUpdate(id, req.body, { new: true });
      if (!task) {
         res.status(404).json({ success: false, message: "Task not found" });
      }
      res.status(200).json({ success: true, data: task });
   } catch (error) {
      if (error instanceof Error) {
         res.status(500).json({ success: false, message: error.message });
      } else {
         res.status(500).json({ success: false, message: "unknown error" });
      }
   }
}
