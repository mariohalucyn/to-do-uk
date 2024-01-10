import styles from "@/app/components/tasks/popup/popup.module.scss";
import { Task } from "../tasks";
import plusIcon from "/public/plus-svgrepo-com.svg";
import Image from "next/image";

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
          <button onClick={() => setIsPopupOpen(false)}>
            <Image
              src={plusIcon}
              alt="small simple arrow icon"
              width={24}
              height={24}
            />
          </button>
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
        <button
          className={styles.outlinedButton}
          onClick={() => addNewTask(newTask)}
        >
          Add New Task
        </button>
      </div>
    </div>
  );
}
