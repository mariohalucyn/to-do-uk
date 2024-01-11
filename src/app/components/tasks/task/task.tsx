import styles from "@/app/components/tasks/task/task.module.scss";
import { Task } from "../tasks";
import plusIcon from "/public/plus-svgrepo-com.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Task({
  selectTask,
  selectedTask,
  id,
  heading,
  deleteTask,
  setIsDetailsOpen,
  setIsNewTaskPopupOpen,
  status,
}: {
  selectTask: (id: number) => void;
  selectedTask: Task;
  id: number;
  heading: string;
  deleteTask: (id: number) => void;
  setIsDetailsOpen: (isDetailsOpen: boolean) => void;
  setIsNewTaskPopupOpen: (isNewTaskPopupOpen: boolean) => void;
  status: Array<any>;
}) {
  return (
    <div
      className={styles.task}
      onClick={() => {
        setIsDetailsOpen(true);
        setIsNewTaskPopupOpen(false);
      }}
    >
      <div
        onClick={() => selectTask(id)}
        className={selectedTask.id === id ? styles.selected : ""}
      >
        <ul>
          <li>
            <p>{heading}</p>
            <div className={styles.statusAndRemoveWrapper}>
              <div
                className={styles.status}
                style={{ background: `${status[1]}` }}
              >
                {status[0]}
              </div>
              <motion.button
                className={styles.closeButton}
                whileTap={{ scale: 0.9 }}
                onClick={() => deleteTask(id)}
              >
                <Image
                  src={plusIcon}
                  alt="small simple arrow icon"
                  width={24}
                  height={24}
                />
              </motion.button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
