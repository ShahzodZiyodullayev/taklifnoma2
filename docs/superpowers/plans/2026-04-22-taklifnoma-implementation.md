# Taklifnoma Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the wedding invitation landing page for Abror & Marvard using the existing 3D scene, CSS modules, and GSAP animations.

**Architecture:** Single-page scroll with 3D Canvas as fixed background. Home component renders all sections sequentially. GSAP ScrollTrigger handles scroll-based animations. Each section is a separate component in `src/pages/home/ui/sections/`. A `useCountdown` hook provides real-time countdown. Music toggle uses an `<audio>` element with a fixed button.

**Tech Stack:** React 19, TypeScript, Three.js (react-three/fiber), GSAP (ScrollTrigger), PostCSS modules

---

## File Structure

```
src/pages/home/
├── ui/
│   ├── home.tsx                    # (Modify) Main page — renders Scene3D + all sections
│   ├── home.module.pcss            # (Exists) All styles ready
│   ├── scene-3d.tsx                # (Exists) 3D background
│   └── sections/
│       ├── hero-section.tsx        # (Create) Hero with names, orbit, meta cards
│       ├── countdown-section.tsx   # (Create) Countdown timer
│       ├── celebration-section.tsx # (Create) Taklif matni + stats
│       ├── quote-section.tsx       # (Create) Yakun iqtibos
│       └── footer-section.tsx      # (Create) Footer
├── lib/
│   └── use-countdown.ts            # (Create) Countdown hook
└── index.ts                        # (Exists) Re-export
```

**Note:** CSS module (`home.module.pcss`) already has comprehensive styles for all sections including hero, countdown, celebration, quote, footer, petals, fireworks, floating orbs, scroll cue, and more. All section components will import from this single module.

---

### Task 1: useCountdown hook

**Files:**
- Create: `src/pages/home/lib/use-countdown.ts`

- [ ] **Step 1: Create the countdown hook**

```ts
import { useState, useEffect } from "react";

interface CountdownResult {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function useCountdown(targetDate: Date): CountdownResult {
  const calculate = (): CountdownResult => {
    const diff = Math.max(0, targetDate.getTime() - Date.now());
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  };

  const [time, setTime] = useState(calculate);

  useEffect(() => {
    const id = setInterval(() => setTime(calculate), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return time;
}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/home/lib/use-countdown.ts
git commit -m "feat: add useCountdown hook"
```

---

### Task 2: Hero Section

**Files:**
- Create: `src/pages/home/ui/sections/hero-section.tsx`

- [ ] **Step 1: Create the hero section component**

This component uses the existing CSS classes: `.hero`, `.heroLabel`, `.orbit`, `.orbitRing`, `.orbitRingAlt`, `.orbitRingDashed`, `.orbitSatellite*`, `.orbitCore`, `.orbitDate`, `.orbitMonth`, `.heroIntro`, `.names`, `.ampersand`, `.ampersandGlow`, `.heroTagline`, `.heroMeta`, `.metaCard`, `.metaCardWide`, `.metaIcon`, `.metaLabel`, `.metaValue`, `.metaText`, `.actions`, `.primaryAction`, `.secondaryAction`, `.btnShine`, `.scrollCue`, `.scrollCueMouse`, `.scrollCueWheel`, `.heroHaloPrimary`, `.heroHaloSecondary`.

```tsx
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
        <div className={`${styles.orbitRing}`} />
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
          &
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
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/home/ui/sections/hero-section.tsx
git commit -m "feat: add hero section with names, orbit, meta cards"
```

---

### Task 3: Countdown Section

**Files:**
- Create: `src/pages/home/ui/sections/countdown-section.tsx`

- [ ] **Step 1: Create the countdown section component**

Uses CSS classes: `.countdownSection`, `.countdownPanel`, `.countdownGlow`, `.countdownHeader`, `.countdownTitle`, `.countdownGrid`, `.countdownCard`, `.countdownCardGlow`, `.countdownValue`, `.countdownLabel`, `.ornamentDivider`, `.ornamentLine`, `.ornamentDiamond`, `.sectionLabel`.

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/home/ui/sections/countdown-section.tsx
git commit -m "feat: add countdown section with live timer"
```

---

### Task 4: Celebration Section (Taklif matni + statistika)

**Files:**
- Create: `src/pages/home/ui/sections/celebration-section.tsx`

- [ ] **Step 1: Create the celebration section component**

Uses CSS classes: `.celebrationSection`, `.celebrationShell`, `.celebrationAura`, `.celebrationIntro`, `.celebrationTitle`, `.celebrationText`, `.celebrationStats`, `.celebrationStat`, `.celebrationStatLabel`, `.celebrationStatValue`, `.ornamentDivider`, `.ornamentLine`, `.ornamentDiamond`, `.sectionLabel`.

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/home/ui/sections/celebration-section.tsx
git commit -m "feat: add celebration section with invitation text and stats"
```

---

### Task 5: Quote Section (Yakun iqtibos)

**Files:**
- Create: `src/pages/home/ui/sections/quote-section.tsx`

- [ ] **Step 1: Create the quote section component**

Uses CSS classes: `.quoteSection`, `.glassCard`, `.quoteCard`, `.quoteLabel`, `.quote`, `.quoteFooter`, `.quoteHearts`, `.quoteHeart`, `.ornamentDivider`, `.ornamentLine`, `.ornamentDiamond`.

```tsx
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
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/home/ui/sections/quote-section.tsx
git commit -m "feat: add quote section with hearts animation"
```

---

### Task 6: Footer Section

**Files:**
- Create: `src/pages/home/ui/sections/footer-section.tsx`

- [ ] **Step 1: Create the footer section component**

Uses CSS classes: `.footer`, `.footerText`, `.footerDate`, `.footerMade`.

```tsx
import styles from "../home.module.pcss";

export const FooterSection = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.footerText}>Abror & Marvard</p>
      <p className={styles.footerDate}>30.05.2026</p>
      <p className={styles.footerMade}>Muhabbat bilan yaratildi ♥</p>
    </footer>
  );
};
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/home/ui/sections/footer-section.tsx
git commit -m "feat: add footer section"
```

---

### Task 7: Assemble Home Page

**Files:**
- Modify: `src/pages/home/ui/home.tsx`

- [ ] **Step 1: Rewrite home.tsx to compose all sections with Scene3D, decorative elements, and music toggle**

The home component renders the 3D scene as a fixed background, a `.frame` container with all sections inside, floating petals, floating orbs, and a music toggle button.

```tsx
import { useRef, useState, useCallback } from "react";
import { Scene3D } from "./scene-3d";
import { HeroSection } from "./sections/hero-section";
import { CountdownSection } from "./sections/countdown-section";
import { CelebrationSection } from "./sections/celebration-section";
import { QuoteSection } from "./sections/quote-section";
import { FooterSection } from "./sections/footer-section";
import styles from "./home.module.pcss";

const PETAL_COUNT = 14;
const ORB_COUNT = 5;

const Home = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
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
        <div className={styles.frame}>
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
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/home/ui/home.tsx
git commit -m "feat: assemble home page with all sections, 3D scene, and music toggle"
```

---

### Task 8: GSAP ScrollTrigger Animations

**Files:**
- Modify: `src/pages/home/ui/home.tsx`

- [ ] **Step 1: Add GSAP ScrollTrigger animations to home.tsx**

Add a `useEffect` that registers GSAP ScrollTrigger and animates each section on scroll. The CSS already has CSS variables for scroll-driven transforms (e.g. `--hero-lift`, `--countdown-lift`, etc.).

Update the `home.tsx` imports and add `useEffect`:

```tsx
import { useRef, useState, useCallback, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
```

Add inside the `Home` component, after `toggleMusic`:

```tsx
const frameRef = useRef<HTMLDivElement>(null);

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
```

Also update the frame `<div>` to use the ref:

Change `<div className={styles.frame}>` to `<div ref={frameRef} className={styles.frame}>`.

- [ ] **Step 2: Commit**

```bash
git add src/pages/home/ui/home.tsx
git commit -m "feat: add GSAP ScrollTrigger animations for all sections"
```

---

### Task 9: Music File Placeholder & Final Verification

**Files:**
- Create: `public/music/.gitkeep`

- [ ] **Step 1: Create music directory with placeholder**

```bash
mkdir -p public/music
touch public/music/.gitkeep
```

The user will add their own `wedding.mp3` file to `public/music/`.

- [ ] **Step 2: Add .superpowers/ to .gitignore**

Check if `.gitignore` exists and add `.superpowers/` to it to prevent brainstorm artifacts from being committed.

- [ ] **Step 3: Run dev server and verify**

```bash
npm run dev
```

Open in browser and verify:
- 3D scene renders as fixed background with particles, rings, hearts
- Hero section shows names, orbit, meta cards, action buttons
- Countdown timer counts down in real-time
- Celebration section shows invitation text and stats
- Quote section shows with heart animations
- Footer shows at the bottom
- Music toggle button works (after adding mp3)
- Scroll animations work smoothly
- Mobile responsive (390px, 360px)

- [ ] **Step 4: Commit**

```bash
git add public/music/.gitkeep .gitignore
git commit -m "feat: add music directory and update gitignore"
```
