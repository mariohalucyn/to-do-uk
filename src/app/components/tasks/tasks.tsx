"use client";

import Details from "@/app/components/tasks/details/details";
import styles from "@/app/components/tasks/tasks.module.scss";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRef, useState } from "react";
import Popup from "./newTaskPopup/newTaskPopup";
import Task from "./task/task";
import plusIcon from "/public/plus-svgrepo-com.svg";

export interface Task {
  id: number;
  heading: string;
  content: string;
  status: Array<string>;
}

export const defaultTask = {
  id: 0,
  heading: "",
  content: "",
  status: ["not completed", "#ee505b"],
};

export default function Tasks() {
  const headingInputRef = useRef<HTMLInputElement>(null);
  const contentInputRef = useRef<HTMLTextAreaElement>(null);

  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<Task>(defaultTask);
  const [selectedTask, setSelectedTask] = useState<Task>(defaultTask);
  const [currentTask, setCurrentTask] = useState<Task>(defaultTask);

  const [isNewTaskPopupOpen, setIsNewTaskPopupOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const date = new Date();

    const { value, name } = event.target;
    setNewTask({ ...newTask, [name]: value, id: date.getTime() });
  };

  const addNewTask = (newTask: Task) => {
    if (newTask.heading !== "") {
      setTasks([...tasks, newTask]);
      clearField([headingInputRef, contentInputRef]);
      setNewTask(defaultTask);
    }
  };

  const saveChanges = (newTask: Task, id: number) => {
    const task = tasks.find((task) => task.id === id);

    if (task) {
      const index = tasks.indexOf(task);

      const updatedTask = [...tasks];
      updatedTask[index] = newTask;
      setTasks(updatedTask);
    }
  };

  const setStatus = (newStatus: Array<string>, id: number) => {
    const task = tasks.find((task) => task.id === id);

    if (task) {
      const index = tasks.indexOf(task);

      const updatedStatus = [...tasks];
      updatedStatus[index].status = newStatus;

      setTasks(updatedStatus);
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
        <motion.div whileTap={{ scale: 0.95 }} className={styles.addNewTask}>
          <a
            onClick={() => {
              setIsNewTaskPopupOpen(true);
              setIsDetailsOpen(false);
            }}
          >
            Add new task
            <Image
              src={plusIcon}
              alt="add task plus icon"
              width={24}
              height={24}
            />
          </a>
        </motion.div>
        <div className={styles.tasksList}>
          {tasks.map(({ id, heading, status }, i) => {
            return (
              <Task
                key={i}
                selectTask={selectTask}
                selectedTask={selectedTask}
                deleteTask={deleteTask}
                id={id}
                heading={heading}
                setIsDetailsOpen={setIsDetailsOpen}
                setIsNewTaskPopupOpen={setIsNewTaskPopupOpen}
                status={status}
              />
            );
          })}
        </div>
      </div>
      <div>
        {isNewTaskPopupOpen ? (
          <Popup
            handleInput={handleInput}
            headingInputRef={headingInputRef}
            contentInputRef={contentInputRef}
            setIsNewTaskPopupOpen={setIsNewTaskPopupOpen}
            addNewTask={addNewTask}
            newTask={newTask}
          />
        ) : null}
        {isDetailsOpen ? (
          <Details
            id={selectedTask.id}
            newTask={newTask}
            deleteTask={deleteTask}
            setIsDetailsOpen={setIsDetailsOpen}
            selectedTask={selectedTask}
            saveChanges={saveChanges}
            currentTask={currentTask}
            setCurrentTask={setCurrentTask}
            setStatus={setStatus}
          />
        ) : null}
      </div>
    </div>
  );
}
