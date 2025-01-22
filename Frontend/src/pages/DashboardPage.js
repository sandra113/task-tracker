import React, { useState, useEffect } from 'react';
import { fetchTasks, addTask, updateTask, deleteTask } from '../services/api';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import '../styles/dashboard.css';

function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const tasks = await fetchTasks();
        setTasks(tasks);
      } catch (error) {
        console.error('Failed to load tasks');
      }
    };

    loadTasks();
  }, []);

  const handleAddTask = async (task) => {
    try {
      const newTask = await addTask(task);
      setTasks((prevTasks) => [...prevTasks, newTask]);
    } catch (error) {
      console.error('Error adding task');
    }
  };

  const handleUpdateTask = async (task) => {
    try {
      const updatedTask = await updateTask(taskToEdit.id, task);
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t))
      );
      setTaskToEdit(null);
    } catch (error) {
      console.error('Error updating task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks((prevTasks) => prevTasks.filter((t) => t.id !== taskId));
    } catch (error) {
      console.error('Error deleting task');
    }
  };

  return (
    <div>
      <TaskForm onSubmit={taskToEdit ? handleUpdateTask : handleAddTask} taskToEdit={taskToEdit} />
      <TaskList tasks={tasks} onEdit={setTaskToEdit} onDelete={handleDeleteTask} />
    </div>
  );
}

export default DashboardPage;
