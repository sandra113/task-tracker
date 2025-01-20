const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

// Middleware to verify user token
const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access Denied' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};

// CRUD operations
router.get('/', authMiddleware, async (req, res) => {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
});

router.post('/', authMiddleware, async (req, res) => {
    const { title } = req.body;
    const task = await Task.create({ title, user: req.user.id });
    res.status(201).json(task);
});

router.put('/:id', authMiddleware, async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
});

router.delete('/:id', authMiddleware, async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task deleted' });
});

module.exports = router;
