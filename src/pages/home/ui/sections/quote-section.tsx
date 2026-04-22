import styles from "../home.module.pcss";

export const QuoteSection = () => {
  return (
    <section className={styles.quoteSection}>
      {/* Ornament divider */}
      <div className={styles.ornamentDivider}>
        <span className={styles.ornamentLine} />
        <span className={styles.ornamentDiamond} />
        <span className={styles.ornamentLine} />
      </div>

      <div className={`${styles.glassCard} ${styles.quoteCard}`}>
        <span className={styles.quoteLabel}>Bizning orzuimiz</span>
        <h2 className={styles.quote}>
          Muhabbat —
          <br />
          abadiy bayram
        </h2>
        <p className={styles.quoteFooter}>
          Sizning ishtirokingiz bizning baxtimizni yanada yorqinroq qiladi.
          Kutib qolamiz!
        </p>
        <div className={styles.quoteHearts}>
          <span className={styles.quoteHeart} />
          <span className={styles.quoteHeart} />
          <span className={styles.quoteHeart} />
        </div>
      </div>
    </section>
  );
};
