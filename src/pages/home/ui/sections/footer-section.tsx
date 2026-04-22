import styles from "../home.module.pcss";

export const FooterSection = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerHeart}>♥</div>
      <p className={styles.footerNames}>Abror & Marvard</p>
      <p className={styles.footerDate}>30.05.2026</p>
      <div className={styles.footerDivider} />
      <p className={styles.footerMade}>Muhabbat bilan yaratildi</p>
    </footer>
  );
};
