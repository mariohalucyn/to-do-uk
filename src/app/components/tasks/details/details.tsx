import { motion } from "framer-motion";
import styles from "./details.module.scss";
import { Task, defaultTask } from "../tasks";
import Image from "next/image";
import plusIcon from "/public/plus-svgrepo-com.svg";
import { useEffect, useState } from "react";

export default function Details({
  id,
  deleteTask,
  setIsDetailsOpen,
  selectedTask,
  saveChanges,
  currentTask,
  setCurrentTask,
  detailsHeadingInputRef,
  detailsContentInputRef,
}: {
  id: number;
  newTask: Task;
  setIsDetailsOpen: (isDetailsOpen: boolean) => void;
  deleteTask: (id: number) => void;
  selectedTask: Task;
  saveChanges: (newTask: Task, id: number) => void;
  currentTask: Task;
  setCurrentTask: (task: Task) => void;
  detailsHeadingInputRef: any;
  detailsContentInputRef: any;
}) {
  useEffect(() => {
    setCurrentTask(selectedTask);
  }, [selectedTask]);

  const handleInput = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const date = new Date();

    const { value, name } = event.target;
    setCurrentTask({ ...currentTask, [name]: value, id: date.getTime() });
  };

  return (
    <div className={styles.details}>
      <div className={styles.inputsWrapper}>
        <div className={styles.heading}>
          <h2>Details: </h2>
          <motion.button
            className={styles.closeButton}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsDetailsOpen(false)}
          >
            <Image
              src={plusIcon}
              alt="small simple arrow icon"
              width={24}
              height={24}
            />
          </motion.button>
        </div>
        <input
          type="text"
          name="heading"
          id=""
          placeholder="Title"
          ref={detailsHeadingInputRef}
          onChange={handleInput}
          value={currentTask.heading}
        />
        <textarea
          name="content"
          id=""
          placeholder="Description"
          onChange={handleInput}
          ref={detailsContentInputRef}
          value={currentTask.content}
          cols={30}
          rows={7}
        ></textarea>
        <div className={styles.buttonsWrapper}>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className={styles.filledButton}
            onClick={() => saveChanges(currentTask, id)}
          >
            Save Changes
          </motion.button>
        </div>
      </div>
    </div>
  );
}
