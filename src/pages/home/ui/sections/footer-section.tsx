import styles from "../home.module.pcss";

export const FooterSection = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerHeart}>♥</div>
      <p className={styles.footerNames}>Abror & Marvarid</p>
      <p className={styles.footerDate}>30.05.2026</p>
      <div className={styles.footerDivider} />
      <p className={styles.footerMade}>Ehtirom ila Umurzoqovlar oilasi</p>
    </footer>
  );
};
