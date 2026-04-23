import styles from "../home.module.pcss";

export const InvitationSection = () => {
  return (
    <section className={`${styles.section} ${styles.invitation}`}>
      <div className={styles.invitationIcon}>✦</div>
      <h2 className={styles.invitationHeading}>Hurmatli mehmon!</h2>

      <div className={styles.invitationCard}>
        <p className={styles.invitationText}>
          Hayotimizning eng baxtli kuniga Sizni taklif qilamiz. Bizning to'y
          marosimimizga tashrif buyurib, shu quvonchli damlarni biz bilan baham
          ko'rishingizni so'raymiz.
        </p>
      </div>

      <div className={styles.invitationDivider} />
      <p className={styles.invitationSignature}>ABROR & MARVARID</p>
    </section>
  );
};
