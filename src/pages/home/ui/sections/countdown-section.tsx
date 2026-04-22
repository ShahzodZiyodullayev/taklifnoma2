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
    <section className={`${styles.section} ${styles.countdown}`}>
      <p className={styles.countdownLabel}>Baxtli kunga</p>
      <h2 className={styles.countdownTitle}>Qolgan vaqt</h2>

      <div className={styles.countdownGrid}>
        {items.map((item) => (
          <div key={item.label} className={styles.countdownCard}>
            <span className={styles.countdownValue}>{item.value}</span>
            <span className={styles.countdownUnit}>{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
