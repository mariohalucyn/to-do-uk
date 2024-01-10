import Image from "next/image";
import styles from "./page.module.css";
import Tasks from "./components/tasks/tasks";

export default function Home() {
  return (
    <main className={styles.main}>
      <Tasks />
    </main>
  );
}
