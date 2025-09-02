import type { JSX } from "react";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import useTheme from "../../hooks/useTheme";
import styles from "./ToggleTheme.module.css";

export default function ToggleTheme(): JSX.Element {
  const [, setTheme] = useTheme();

  const handleDarkSwitch = (): void => {
    setTheme("dark");
  };
  const handleLightSwitch = (): void => {
    setTheme("light");
  };
  return (
    <div className={styles.mode_btn_container}>
      <div className={`${styles.area} bg-primary border-thin`}>
        <button
          onClick={handleDarkSwitch}
          className={`${styles.mode_btn} bg-transparent text-primary dark:foreground hover:foreground hover:text-white`}
        >
          <IoMoonOutline
            className={`dark:fill-current fill-none ${styles.btn_icon}`}
          />
        </button>
        <button
          onClick={handleLightSwitch}
          className={`${styles.mode_btn} foreground text-white dark:bg-transparent
        hover:foreground`}
        >
          <IoSunnyOutline
            className={`fill-current dark:fill-none ${styles.btn_icon}`}
          />
        </button>
      </div>
    </div>
  );
}
