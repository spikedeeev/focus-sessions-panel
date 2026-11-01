import { NavLink } from "react-router-dom";
import home from "@/shared/assets/icons/tasks.svg";
import focus from "@/shared/assets/icons/focus.svg";
import statistic from "@/shared/assets/icons/statistic.svg";
import options from "@/shared/assets/icons/options.svg";
import styles from "./style.module.scss";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.brandMark}>
            <img src={focus} alt="" />
          </span>
          <div className={styles.brandText}>
            <h1>Quiet Focus</h1>
            <span>space to get things done</span>
          </div>
        </div>

        <nav className={styles.navigation} aria-label="Main navigation">
          <NavLink
            to="/"
            end
            aria-label="Tasks"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
          >
            <img className={styles.logoImg} src={home} alt="" />
            <span>Tasks</span>
          </NavLink>

          <NavLink
            to="/session"
            aria-label="Focus"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
          >
            <img className={styles.logoImg} src={focus} alt="" />
            <span>Focus</span>
          </NavLink>

          <NavLink
            to="/statistic"
            aria-label="Statistics"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
          >
            <img className={styles.logoImg} src={statistic} alt="" />
            <span>Statistics</span>
          </NavLink>

          <NavLink
            to="/options"
            aria-label="Settings"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.active : ""}`
            }
          >
            <img className={styles.logoImg} src={options} alt="" />
            <span>Settings</span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
