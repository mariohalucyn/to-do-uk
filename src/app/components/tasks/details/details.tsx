import { motion } from "framer-motion";
import styles from "./details.module.scss";
import { Task } from "../tasks";
import Image from "next/image";
import plusIcon from "/public/plus-svgrepo-com.svg";

export default function Details({
  handleInput,
  headingInputRef,
  contentInputRef,
  id,
  deleteTask,
  setIsDetailsOpen,
  selectedTask,
}: {
  handleInput: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  headingInputRef: any;
  id: number;
  contentInputRef: any;
  newTask: Task;
  setIsDetailsOpen: (isDetailsOpen: boolean) => void;
  deleteTask: (id: number) => void;
  selectedTask: Task;
}) {
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
          onChange={handleInput}
          ref={headingInputRef}
          value={selectedTask.heading}
        />
        <textarea
          name="content"
          id=""
          placeholder="Description"
          onChange={handleInput}
          ref={contentInputRef}
          value={selectedTask.content}
          cols={30}
          rows={7}
        ></textarea>
        <div className={styles.buttonsWrapper}>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className={styles.outlinedButton}
          >
            Save Changes
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className={styles.filledButton}
            onClick={() => deleteTask(id)}
          >
            Remove Task
          </motion.button>
        </div>
      </div>
    </div>
  );
}
