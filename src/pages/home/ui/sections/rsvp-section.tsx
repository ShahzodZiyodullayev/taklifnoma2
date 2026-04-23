import styles from "../home.module.pcss";

export const RsvpSection = () => {
  return (
    <section className={`${styles.section} ${styles.rsvp}`}>
      <p className={styles.rsvpLabel}>Ishtirokingiz</p>
      <h2 className={styles.rsvpTitle}>Sizni kutib qolamiz!</h2>

      {/*<div className={styles.rsvpButtons}>*/}
      {/*  <button*/}
      {/*    type="button"*/}
      {/*    className={`${styles.rsvpAccept} ${selected === "accept" ? styles.rsvpAcceptActive : ""}`}*/}
      {/*    onClick={() => setSelected("accept")}*/}
      {/*  >*/}
      {/*    ✓ Kelaman*/}
      {/*  </button>*/}
      {/*  <button*/}
      {/*    type="button"*/}
      {/*    className={`${styles.rsvpDecline} ${selected === "decline" ? styles.rsvpDeclineActive : ""}`}*/}
      {/*    onClick={() => setSelected("decline")}*/}
      {/*  >*/}
      {/*    ✗ Afsuski...*/}
      {/*  </button>*/}
      {/*</div>*/}
    </section>
  );
};
