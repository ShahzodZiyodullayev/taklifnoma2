import styles from "../home.module.pcss";

export const CelebrationSection = () => {
  return (
    <section className={styles.celebrationSection}>
      {/* Ornament divider */}
      <div className={styles.ornamentDivider}>
        <span className={styles.ornamentLine} />
        <span className={styles.ornamentDiamond} />
        <span className={styles.ornamentLine} />
      </div>

      <span className={styles.sectionLabel}>Taklifnoma</span>

      <div className={styles.celebrationShell}>
        <div className={styles.celebrationAura} />

        <p className={styles.celebrationIntro}>Hurmatli mehmon!</p>
        <h2 className={styles.celebrationTitle}>
          Sizni taklif
          <br />
          qilamiz
        </h2>
        <p className={styles.celebrationText}>
          Hayotimizning eng baxtli kuniga Sizni taklif qilamiz. Bizning to'y
          marosimimizga tashrif buyurib, shu quvonchli damlarni biz bilan baham
          ko'rishingizni so'raymiz.
        </p>

        <div className={styles.celebrationStats}>
          <div className={styles.celebrationStat}>
            <span className={styles.celebrationStatLabel}>Sana</span>
            <span className={styles.celebrationStatValue}>30 May</span>
          </div>
          <div className={styles.celebrationStat}>
            <span className={styles.celebrationStatLabel}>Vaqt</span>
            <span className={styles.celebrationStatValue}>18:00</span>
          </div>
          <div className={styles.celebrationStat}>
            <span className={styles.celebrationStatLabel}>Joy</span>
            <span className={styles.celebrationStatValue}>Jasmin</span>
          </div>
        </div>
      </div>
    </section>
  );
};
