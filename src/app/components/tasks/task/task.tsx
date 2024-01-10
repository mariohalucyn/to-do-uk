import styles from "@/app/components/tasks/task/task.module.scss";
import { Task } from "../tasks";
import plusIcon from "/public/plus-svgrepo-com.svg";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Task({
  selectTask,
  selectedTask,
  handleComplete,
  id,
  heading,
  deleteTask,
}: {
  selectTask: (id: number) => void;
  selectedTask: Task;
  handleComplete: (isCompleted: boolean, id: number) => void;
  id: number;
  heading: string;
  deleteTask: (id: number) => void;
}) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    handleComplete(isCompleted, id);
  }, [isCompleted]);

  return (
    <div className={styles.task}>
      <div
        onClick={() => selectTask(id)}
        className={selectedTask.id === id ? styles.selected : ""}
      >
        <ul>
          <input
            checked={isCompleted}
            onChange={() => setIsCompleted(!isCompleted)}
            type="checkbox"
            name=""
            id=""
          />
          <li className={isCompleted ? styles.isCompleted : ""}>
            <p>{heading}</p>
            <button onClick={() => deleteTask(id)}>
              <Image
                src={plusIcon}
                alt="small simple arrow icon"
                width={24}
                height={24}
              />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
