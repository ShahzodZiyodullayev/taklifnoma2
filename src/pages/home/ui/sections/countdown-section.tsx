import { useCountdown } from "../../lib/use-countdown";
import styles from "../home.module.pcss";

const WEDDING_DATE = new Date("2026-05-30T18:00:00+05:00");

export const CountdownSection = () => {
  const { days, hours, minutes, seconds } = useCountdown(WEDDING_DATE);

  const pad = (n: number) => String(n).padStart(2, "0");

  const items = [
    { value: pad(days), label: "Kun" },
    { value: pad(hours), label: "Soat" },
    { value: pad(minutes), label: "Daqiqa" },
    { value: pad(seconds), label: "Soniya" },
  ];

  return (
    <section className={styles.countdownSection}>
      {/* Ornament divider */}
      <div className={styles.ornamentDivider}>
        <span className={styles.ornamentLine} />
        <span className={styles.ornamentDiamond} />
        <span className={styles.ornamentLine} />
      </div>

      <span className={styles.sectionLabel}>Baxtli kunga</span>

      <div className={styles.countdownPanel}>
        <div className={styles.countdownGlow} />
        <div className={styles.countdownHeader}>
          <h2 className={styles.countdownTitle}>Qolgan vaqt</h2>
        </div>
        <div className={styles.countdownGrid}>
          {items.map((item) => (
            <div key={item.label} className={styles.countdownCard}>
              <div className={styles.countdownCardGlow} />
              <span className={styles.countdownValue}>{item.value}</span>
              <span className={styles.countdownLabel}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
