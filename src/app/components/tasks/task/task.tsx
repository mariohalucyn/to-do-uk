import styles from "@/app/components/tasks/task/task.module.scss";
import { Task } from "../tasks";
import arrowIcon from "/public/arrow-sm-right-svgrepo-com.svg";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Task({
  selectTask,
  selectedTask,
  handleComplete,
  id,
  heading,
  content,
}: {
  selectTask: (id: number) => void;
  selectedTask: Task;
  handleComplete: (isCompleted: boolean, id: number) => void;
  id: number;
  heading: string;
  content: string;
}) {
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    handleComplete(isCompleted, id)
  }, [isCompleted])

  return (
    <div className={styles.task}>
      <div
        onClick={() => selectTask(id)}
        className={selectedTask.id === id ? styles.selected : ""}
      >
        <ul>
            <input checked={isCompleted} onChange={() => setIsCompleted(!isCompleted)} type="checkbox" name="" id="" />
          <li>
            <p>{heading}</p>
            <Image
              src={arrowIcon}
              alt="small simple arrow icon"
              width={24}
              height={24}
            />
          </li>
        </ul>
      </div>
    </div>
  );
}
