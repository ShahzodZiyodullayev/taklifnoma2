import styles from "../home.module.pcss";

export const DetailsSection = () => {
  return (
    <section className={`${styles.section} ${styles.details}`}>
      <p className={styles.detailsLabel}>Marosim tafsilotlari</p>

      <div className={styles.detailsCards}>
        <div className={styles.detailCard}>
          <div className={styles.detailIcon}>📅</div>
          <h3 className={styles.detailTitle}>30 May, 2026-yil</h3>
          <p className={styles.detailSubtitle}>Shanba kuni</p>
        </div>

        <div className={styles.detailCard}>
          <div className={styles.detailIcon}>🕕</div>
          <h3 className={styles.detailTitle}>Soat 18:00</h3>
          <p className={styles.detailSubtitle}>Kechki dastur</p>
        </div>

        <div className={styles.detailCard}>
          <div className={styles.detailIcon}>📍</div>
          <h3 className={styles.detailTitle}>Jasmin to'yxonasi</h3>
          <p className={styles.detailSubtitle}>
            Jizzax viloyati, D052, 66, Dashtobod
          </p>
          <a
            href="https://yandex.uz/maps/org/65857280268?si=c6jrhcere130dahp0c5bddeutc"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mapButton}
          >
            🗺️ Xaritada ko'rish
          </a>
        </div>
      </div>
    </section>
  );
};
