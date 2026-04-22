import styles from "../home.module.pcss";

export const HeroSection = () => {
  return (
    <section className={`${styles.section} ${styles.hero}`}>
      <p className={styles.heroLabel}>To'y taklifnomasi</p>

      <h1 className={styles.heroName}>Abror</h1>
      <span className={styles.heroAmpersand}>&</span>
      <h1 className={styles.heroName}>Marvard</h1>

      <div className={styles.heroDivider} />

      <p className={styles.heroDate}>30 May, 2026</p>
      <p className={styles.heroTime}>Shanba, soat 18:00</p>

      <div className={styles.scrollHint}>
        <span className={styles.scrollHintText}>Pastga suring</span>
        <span className={styles.scrollHintArrow}>↓</span>
      </div>
    </section>
  );
};
