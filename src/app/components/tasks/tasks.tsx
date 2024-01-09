"use client";

import styles from "@/app/components/tasks/tasks.module.scss";
import { useEffect, useState } from "react";

interface Task {
  id: number;
  heading: string;
  content: string;
  isCompleted: boolean;
}

const defaultTask = {
  id: 0,
  heading: "",
  content: "",
  isCompleted: false,
};

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task>(defaultTask);
  const [newTask, setNewTask] = useState<Task>(defaultTask);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date();

    const { value, name } = event.target;
    setNewTask({ ...newTask, [name]: value, id: date.getTime() });
  };

  const addNewTask = (newTask: Task) => {
    const date = new Date();
    setNewTask({ ...newTask, id: date.getTime() });

    if (newTask.heading !== "") {
      setTasks([...tasks, newTask]);
    }
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const selectTask = (id: number) => {
    const selected = tasks.find((task) => task.id === id);
    if (selected) {
      setSelectedTask(selected);
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          name="heading"
          id=""
          placeholder="heading"
          onChange={handleInput}
        />
        <input
          type="text"
          name="content"
          id=""
          placeholder="content"
          onChange={handleInput}
        />
      </div>
      <button onClick={() => addNewTask(newTask)}>Add New Task</button>
      <button onClick={() => deleteTask(selectedTask.id)}>Delete Task</button>
      {tasks.map(({ id, heading, content }, i) => {
        return (
          <div key={i} onClick={() => selectTask(id)}>
            <ul>
              <div></div>
              <li>
                <p>Title: {heading}</p>
              </li>
              <li>
                <p>Content: {content}</p>
              </li>
              <li>id: {id}</li>
            </ul>
          </div>
        );
      })}
    </div>
  );
}
