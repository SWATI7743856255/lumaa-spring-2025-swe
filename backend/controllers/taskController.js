const { Task } = require("../models");

// Fetch all tasks for the logged-in user
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll({ where: { userId: req.user.userId } });
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Create a new task
const createTask = async (req, res) => {
    try {
        const { title, description, completed } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        const task = await Task.create({
            title,
            description,
            completed,
            userId: req.user.userId,
        });

        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Update a task
const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, completed } = req.body;

        const task = await Task.findOne({ where: { id, userId: req.user.userId } });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        await task.update({ title, description, completed });

        res.status(200).json({ message: "Task updated successfully", task });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Delete a task
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findOne({ where: { id, userId: req.user.userId } });

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        await task.destroy();

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
