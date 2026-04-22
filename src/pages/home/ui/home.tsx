import { useRef, useState, useCallback, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Scene3D } from "./scene-3d";
import { HeroSection } from "./sections/hero-section";
import { CountdownSection } from "./sections/countdown-section";
import { CelebrationSection } from "./sections/celebration-section";
import { QuoteSection } from "./sections/quote-section";
import { FooterSection } from "./sections/footer-section";
import styles from "./home.module.pcss";

gsap.registerPlugin(ScrollTrigger);

const PETAL_COUNT = 14;
const ORB_COUNT = 5;

const Home = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().catch(() => {});
      setIsMuted(false);
    } else {
      audio.pause();
      setIsMuted(true);
    }
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section parallax
      gsap.to(`.${styles.hero}`, {
        scrollTrigger: {
          trigger: `.${styles.hero}`,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        "--hero-lift": "-40px",
        "--hero-card-shift": "-20px",
        "--hero-orbit-shift": "-30px",
      });

      // Countdown section entrance
      gsap.from(`.${styles.countdownPanel}`, {
        scrollTrigger: {
          trigger: `.${styles.countdownSection}`,
          start: "top 80%",
          end: "top 40%",
          scrub: true,
        },
        opacity: 0,
        y: 40,
      });

      // Celebration section entrance
      gsap.from(`.${styles.celebrationShell}`, {
        scrollTrigger: {
          trigger: `.${styles.celebrationSection}`,
          start: "top 80%",
          end: "top 40%",
          scrub: true,
        },
        opacity: 0,
        y: 40,
      });

      // Quote section entrance
      gsap.from(`.${styles.quoteCard}`, {
        scrollTrigger: {
          trigger: `.${styles.quoteSection}`,
          start: "top 80%",
          end: "top 40%",
          scrub: true,
        },
        opacity: 0,
        y: 30,
        scale: 0.95,
      });

      // Footer entrance
      gsap.from(`.${styles.footer}`, {
        scrollTrigger: {
          trigger: `.${styles.footer}`,
          start: "top 90%",
        },
        opacity: 0,
        y: 20,
        duration: 0.8,
      });
    }, frameRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* 3D background */}
      <Scene3D />

      {/* Music */}
      <audio ref={audioRef} src="/music/wedding.mp3" loop preload="none" />
      <button
        type="button"
        onClick={toggleMusic}
        style={{
          position: "fixed",
          top: 16,
          right: 16,
          zIndex: 100,
          width: 44,
          height: 44,
          borderRadius: "50%",
          border: "1px solid rgba(241, 201, 141, 0.3)",
          background: "rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(10px)",
          color: "#f1c98d",
          fontSize: "1.2rem",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        aria-label={isMuted ? "Musiqani yoqish" : "Musiqani o'chirish"}
      >
        {isMuted ? "🔇" : "🔊"}
      </button>

      {/* Main content */}
      <div className={styles.home}>
        <div ref={frameRef} className={styles.frame}>
          {/* Decorative glows */}
          <div className={styles.topGlow} />
          <div className={styles.bottomGlow} />

          {/* Floating petals */}
          <div className={styles.petalField}>
            {Array.from({ length: PETAL_COUNT }, (_, i) => (
              <div key={i} className={styles.petal} />
            ))}
          </div>

          {/* Floating orbs */}
          <div className={styles.floatingOrbs}>
            {Array.from({ length: ORB_COUNT }, (_, i) => (
              <div key={i} className={styles.floatingOrb} />
            ))}
          </div>

          {/* Sections */}
          <HeroSection />
          <CountdownSection />
          <CelebrationSection />
          <QuoteSection />
          <FooterSection />
        </div>
      </div>
    </>
  );
};

export default Home;
