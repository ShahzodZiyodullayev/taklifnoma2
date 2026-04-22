import { useRef, useState, useCallback, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Scene3D } from "./scene-3d";
import { HeroSection } from "./sections/hero-section";
import { CountdownSection } from "./sections/countdown-section";
import { InvitationSection } from "./sections/celebration-section";
import { DetailsSection } from "./sections/details-section";
import { RsvpSection } from "./sections/rsvp-section";
import { FooterSection } from "./sections/footer-section";
import styles from "./home.module.pcss";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
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
      // Animate each section on scroll
      const sections = [
        `.${styles.countdown}`,
        `.${styles.invitation}`,
        `.${styles.details}`,
        `.${styles.rsvp}`,
        `.${styles.footer}`,
      ];

      sections.forEach((selector) => {
        gsap.from(selector, {
          scrollTrigger: {
            trigger: selector,
            start: "top 85%",
            once: true,
          },
          opacity: 0,
          y: 40,
          duration: 0.9,
          ease: "power2.out",
        });
      });

      // Hero parallax on scroll
      gsap.to(`.${styles.hero}`, {
        scrollTrigger: {
          trigger: `.${styles.hero}`,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        opacity: 0.3,
        y: -60,
      });

      // Detail cards stagger
      gsap.from(`.${styles.detailCard}`, {
        scrollTrigger: {
          trigger: `.${styles.details}`,
          start: "top 80%",
          once: true,
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.15,
        ease: "power2.out",
      });

      // Countdown cards stagger
      gsap.from(`.${styles.countdownCard}`, {
        scrollTrigger: {
          trigger: `.${styles.countdown}`,
          start: "top 80%",
          once: true,
        },
        opacity: 0,
        scale: 0.8,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)",
      });
    }, pageRef);

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
        className={styles.musicBtn}
        onClick={toggleMusic}
        aria-label={isMuted ? "Musiqani yoqish" : "Musiqani o'chirish"}
      >
        {isMuted ? "🔇" : "🔊"}
      </button>

      {/* Main content */}
      <div ref={pageRef} className={styles.page}>
        <HeroSection />
        <CountdownSection />
        <InvitationSection />
        <DetailsSection />
        <RsvpSection />
        <FooterSection />
      </div>
    </>
  );
};

export default Home;
