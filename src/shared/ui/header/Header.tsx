import { NavLink } from "react-router-dom";
import home from "@/shared/assets/icons/tasks.svg";
import focus from "@/shared/assets/icons/focus.svg";
import statistic from "@/shared/assets/icons/statistic.svg";
import options from "@/shared/assets/icons/options.svg";
import styles from "./style.module.scss";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.title}>
        <h1>Фокус-сессии</h1>
      </div>

      <div className={styles.content}>
        <nav className={styles.navigation}>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${styles.logoLink} ${isActive ? styles.active : ""}`
            }
          >
            <img className={styles.logoImg} src={home} alt="tasks" />
          </NavLink>

          <NavLink
            to="/session"
            className={({ isActive }) =>
              `${styles.logoLink} ${isActive ? styles.active : ""}`
            }
          >
            <img className={styles.logoImg} src={focus} alt="focus session" />
          </NavLink>

          <NavLink
            to="/statistic"
            className={({ isActive }) =>
              `${styles.logoLink} ${isActive ? styles.active : ""}`
            }
          >
            <img className={styles.logoImg} src={statistic} alt="statistic" />
          </NavLink>

          <NavLink
            to="/options"
            className={({ isActive }) =>
              `${styles.logoLink} ${isActive ? styles.active : ""}`
            }
          >
            <img className={styles.logoImg} src={options} alt="options" />
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
