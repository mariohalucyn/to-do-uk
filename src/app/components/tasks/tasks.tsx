"use client";

import styles from "@/app/components/tasks/tasks.module.scss";
import { useRef, useState } from "react";
import Task from "./task/task";

export interface Task {
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
  const headingInputRef = useRef(null);
  const contentInputRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const date = new Date();

    const { value, name } = event.target;
    setNewTask({ ...newTask, [name]: value, id: date.getTime() });
  };

  const handleComplete = (isCompleted: boolean, id: number) => {
    const task = tasks.find((task) => task.id === id);

    if (task) {
      const index = tasks.indexOf(task)
      const isCurrentlyCompleted = tasks[index].isCompleted
      setTasks({...tasks, [tasks[index].isCompleted]: !isCompleted})
    }
  };

  const addNewTask = (newTask: Task) => {
    if (newTask.heading !== "") {
      setTasks([...tasks, newTask]);
      clearField([headingInputRef, contentInputRef]);
      setNewTask(defaultTask);
    }
  };

  const clearField = (targets: Array<any>) => {
    targets.forEach((target) => {
      target.current.value = "";
    });
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
    <div className={styles.tasks}>
      <div className={styles.tasksWrapper}>
        <h1>To-do list</h1>
        {tasks.map(({ id, heading, content }, i) => {
          return (
            <Task
              key={i}
              selectTask={selectTask}
              selectedTask={selectedTask}
              handleComplete={handleComplete}
              id={id}
              heading={heading}
              content={content}
            />
          );
        })}
      </div>
      <div className={styles.taskCreation}>
        <div className={styles.inputsWrapper}>
          <h2>Task: </h2>
          <input
            type="text"
            name="heading"
            id=""
            placeholder="Title"
            onChange={handleInput}
            ref={headingInputRef}
          />
          <textarea
            name="content"
            id=""
            placeholder="Description"
            onChange={handleInput}
            ref={contentInputRef}
            cols={30}
            rows={10}
          ></textarea>
        </div>
        <div className={styles.buttonsWrapper}>
          <button
            className={styles.outlinedButton}
            onClick={() => addNewTask(newTask)}
          >
            Add New Task
          </button>
          <button
            className={styles.filledButton}
            onClick={() => deleteTask(selectedTask.id)}
          >
            Delete Task
          </button>
        </div>
      </div>
    </div>
  );
}
