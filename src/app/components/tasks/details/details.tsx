import { motion } from "framer-motion";
import styles from "./details.module.scss";
import { Task, defaultTask } from "../tasks";
import Image from "next/image";
import plusIcon from "/public/plus-svgrepo-com.svg";
import { useEffect, useState } from "react";

export default function Details({
  id,
  setIsDetailsOpen,
  selectedTask,
  saveChanges,
  currentTask,
  setCurrentTask,
  detailsHeadingInputRef,
  detailsContentInputRef,
  setStatus,
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
  setStatus: any;
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

  let date = new Date(id);
  useEffect(() => {
    date = new Date(id);
  }, [id]);

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
        <p style={{ textAlign: "end" }}>{date.toDateString()}</p>
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
        <div className={styles.statusButtonsWrapper}>
          <h3>Status: </h3>
          <div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className={styles.completedButton}
              onClick={() => setStatus(["completed", "#70d7a4"], id)}
            >
              completed
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className={styles.duringButton}
              onClick={() => setStatus(["during", "#fde25a"], id)}
            >
              during
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className={styles.notCompletedButton}
              onClick={() => setStatus(["not completed", "#fde25a"], id)}
            >
              not completed
            </motion.button>
          </div>
        </div>
        <div className={styles.buttonsWrapper} style={{marginTop: '2rem'}}>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className={styles.outlinedButton}
            onClick={() => saveChanges(currentTask, id)}
          >
            Save Changes
          </motion.button>
        </div>
      </div>
    </div>
  );
}
