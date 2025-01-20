import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { CiSaveDown2 } from "react-icons/ci";

function App() {
  // Load dark mode and tasks from localStorage (if available)
  const savedDarkMode = JSON.parse(localStorage.getItem('darkMode')) || false;
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

  const [tasks, setTasks] = useState(savedTasks);
  const [taskInput, setTaskInput] = useState("");
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);
  const [editingTaskText, setEditingTaskText] = useState("");
  const [darkMode, setDarkMode] = useState(savedDarkMode);

  // Save dark mode state to localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Handle input change
  const handleInputChange = (e) => {
    setTaskInput(e.target.value);
  };

  // Add task to the list
  const addTask = () => {
    if (taskInput.trim() === "") return;
    setTasks([...tasks, { text: taskInput, completed: false }]);
    setTaskInput(""); // Clear input after adding
  };

  // Toggle task completion
  const toggleTaskCompletion = (index) => {
    const updatedTasks = tasks.map((task, idx) =>
      idx === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Remove task
  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, idx) => idx !== index);
    setTasks(updatedTasks);
  };

  // Start editing a task
  const startEditing = (index) => {
    setEditingTaskIndex(index);
    setEditingTaskText(tasks[index].text);
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingTaskIndex(null);
    setEditingTaskText("");
  };

  // Save edited task
  const saveEditedTask = () => {
    if (editingTaskText.trim() === "") return; // Don't save if input is empty
    const updatedTasks = tasks.map((task, idx) =>
      idx === editingTaskIndex ? { ...task, text: editingTaskText } : task
    );
    setTasks(updatedTasks);
    setEditingTaskIndex(null);
    setEditingTaskText("");
  };

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (

    <div className={`${darkMode ? 'bg-gray-800 text-black' : 'bg-gray-100 text-black'} min-h-screen`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="container mx-auto p-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center mb-4">To-Do List</h1>
          <div className="flex mb-4">
            <input
              type="text"
              value={taskInput}
              onChange={handleInputChange}
              placeholder="Enter a task"
              className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={addTask}
              className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600"
            >
              Add Task
            </button>
          </div>

          {/* List of tasks */}
          <ul className="space-y-3">
            {tasks.map((task, index) => (
              <li
                key={index}
                className={`flex items-center justify-between p-3 border rounded-md shadow-md ${task.completed ? 'bg-green-100 line-through' : 'bg-white' , 'text-gray-800'}`}
              >
                {editingTaskIndex === index ? (
                  <div className="flex items-center space-x-2 ">
                    <input
                      type="text"
                      value={editingTaskText}
                      onChange={(e) => setEditingTaskText(e.target.value)}
                      className="p-2 border border-gray-300 rounded-md"
                    />
                    <button
                      onClick={saveEditedTask}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                    >
                      <CiSaveDown2 />
                    </button>
                    <button
                      onClick={cancelEditing}
                      className="bg-gray-500 text-white px-3 py-1 rounded-md hover:bg-gray-600"
                    >
                      <MdDelete />
                    </button>
                  </div>
                ) : (
                  <span
                    onClick={() => toggleTaskCompletion(index)}
                    className="cursor-pointer text-lg"
                  >
                    {task.text}
                  </span>
                )}

                <div className="space-x-2">
                  {!editingTaskIndex && (
                    <>
                      <button
                        onClick={() => startEditing(index)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => removeTask(index)}
                        className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                      >
                        <MdDelete />
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <h3 className="justify-self-center font-bold">Created by Vaibhav Dubey ❤</h3>
    </div>
  );
}

export default App;
