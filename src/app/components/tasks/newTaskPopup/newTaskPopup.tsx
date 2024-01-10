import styles from "@/app/components/tasks/newTaskPopup/newTaskPopup.module.scss";
import { Task } from "../tasks";
import plusIcon from "/public/plus-svgrepo-com.svg";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Popup({
  handleInput,
  headingInputRef,
  contentInputRef,
  addNewTask,
  newTask,
  setIsPopupOpen,
}: {
  handleInput: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  headingInputRef: any;
  contentInputRef: any;
  addNewTask: (newTask: Task) => void;
  newTask: Task;
  setIsPopupOpen: (isPopupOpen: boolean) => void;
}) {
  return (
    <div className={styles.taskCreation}>
      <div className={styles.inputsWrapper}>
        <div className={styles.heading}>
          <h2>Add New Task: </h2>
          <motion.button
            className={styles.closeButton}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsPopupOpen(false)}
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
        />
        <textarea
          name="content"
          id=""
          placeholder="Description"
          onChange={handleInput}
          ref={contentInputRef}
          cols={30}
          rows={7}
        ></textarea>
      </div>
      <div className={styles.buttonsWrapper}>
        <motion.button
          whileTap={{ scale: 0.9 }}
          className={styles.outlinedButton}
          onClick={() => addNewTask(newTask)}
        >
          Add New Task
        </motion.button>
      </div>
    </div>
  );
}
