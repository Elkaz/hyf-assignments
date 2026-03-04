import styles from './Badge.module.css';

export const Badge = ({ count, children }) => {
  return (
    <div className={styles.badge}>
      {children}
        <span className={styles.badgeCount}>
          {count > 99 ? '99+' : count}
        </span>
    </div>
  );
};