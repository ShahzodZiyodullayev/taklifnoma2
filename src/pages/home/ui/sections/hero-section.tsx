import styles from "../home.module.pcss";

export const HeroSection = () => {
  return (
    <section className={styles.hero}>
      {/* Halo glows */}
      <div className={styles.heroHaloPrimary} />
      <div className={styles.heroHaloSecondary} />

      {/* Label */}
      <span className={styles.heroLabel}>To'y taklifnomasi</span>

      {/* Orbit date display */}
      <div className={styles.orbit}>
        <div className={styles.orbitRing} />
        <div className={`${styles.orbitRing} ${styles.orbitRingAlt}`} />
        <div className={`${styles.orbitRing} ${styles.orbitRingDashed}`} />
        <div className={`${styles.orbitSatellite} ${styles.orbitSatelliteGold}`} />
        <div className={`${styles.orbitSatellite} ${styles.orbitSatelliteMint}`} />
        <div className={`${styles.orbitSatellite} ${styles.orbitSatelliteRose}`} />
        <div className={styles.orbitCore}>
          <span className={styles.orbitDate}>30</span>
          <span className={styles.orbitMonth}>May</span>
        </div>
      </div>

      {/* Names */}
      <p className={styles.heroIntro}>Sizni taklif qilamiz</p>
      <h1 className={styles.names}>
        Abror
        <span className={styles.ampersand}>
          &amp;
          <span className={styles.ampersandGlow} />
        </span>
        Marvard
      </h1>
      <p className={styles.heroTagline}>Baxtli kunga birga qadam qo'yamiz</p>

      {/* Meta cards */}
      <div className={styles.heroMeta}>
        <div className={styles.metaCard}>
          <span className={styles.metaIcon}>📅</span>
          <span className={styles.metaLabel}>Sana</span>
          <span className={styles.metaValue}>30 May, 2026</span>
        </div>
        <div className={styles.metaCard}>
          <span className={styles.metaIcon}>🕕</span>
          <span className={styles.metaLabel}>Vaqt</span>
          <span className={styles.metaValue}>18:00</span>
        </div>
        <div className={`${styles.metaCard} ${styles.metaCardWide}`}>
          <span className={styles.metaIcon}>📍</span>
          <span className={styles.metaLabel}>Manzil</span>
          <span className={styles.metaValue}>Jasmin to'yxonasi</span>
          <span className={styles.metaText}>Jizzax viloyati, D052, 66, Dashtobod</span>
        </div>
      </div>

      {/* Action buttons */}
      <div className={styles.actions}>
        <a
          href="https://yandex.uz/maps/org/65857280268?si=c6jrhcere130dahp0c5bddeutc"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.primaryAction}
        >
          <span className={styles.btnShine} />
          🗺️ Xaritada ko'rish
        </a>
        <button className={styles.secondaryAction} type="button">
          ✓ Kelaman
        </button>
      </div>

      {/* Scroll cue */}
      <div className={styles.scrollCue}>
        <span className={styles.scrollCueMouse}>
          <span className={styles.scrollCueWheel} />
        </span>
        Pastga suring
      </div>
    </section>
  );
};
