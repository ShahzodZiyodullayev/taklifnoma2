import styles from "../home.module.pcss";

export const FooterSection = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.footerText}>Abror &amp; Marvard</p>
      <p className={styles.footerDate}>30.05.2026</p>
      <p className={styles.footerMade}>Muhabbat bilan yaratildi ♥</p>
    </footer>
  );
};
