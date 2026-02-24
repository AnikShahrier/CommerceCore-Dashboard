import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch tasks from backend
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data);
    } catch (err) {
      setError(err.message);
      // Fallback dummy data
      setTasks([
        { id: 1, title: 'Design new landing page', time: '10:00 AM', completed: false, priority: 'high' },
        { id: 2, title: 'Team meeting with developers', time: '02:00 PM', completed: true, priority: 'medium' },
        { id: 3, title: 'Review pull requests', time: '04:00 PM', completed: false, priority: 'high' },
        { id: 4, title: 'Update documentation', time: '05:30 PM', completed: false, priority: 'low' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Add new task
  const addTask = async (task) => {
    try {
      const response = await axios.post('http://localhost:5000/api/tasks', task);
      setTasks([...tasks, response.data]);
    } catch (err) {
      // Optimistic update
      const newTask = { ...task, id: Date.now(), completed: false };
      setTasks([...tasks, newTask]);
    }
  };

  // Toggle task completion
  const toggleTask = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/tasks/${id}`);
    } catch (err) {
      // Optimistic update
    }
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    } catch (err) {
      // Optimistic update
    }
    setTasks(tasks.filter(task => task.id !== id));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, loading, error, addTask, toggleTask, deleteTask, fetchTasks }}>
      {children}
    </TaskContext.Provider>
  );
};