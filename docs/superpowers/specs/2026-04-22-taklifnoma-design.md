# Taklifnoma — To'y taklifnomasi landing sahifasi

## Umumiy ma'lumot

Abror va Marvard uchun to'y taklifnomasi — mobil-birinchi, animatsiyali, 3D effektli bitta sahifali (single page scroll) landing page.

**Texnologiyalar (mavjud):** React 19, TypeScript, Vite, Three.js (react-three/fiber), GSAP, Mantine, PostCSS

## Ma'lumotlar

- **Kelin-kuyov:** Abror va Marvard
- **Sana:** 30 May, 2026 (Shanba)
- **Vaqt:** 18:00
- **Joy:** Jasmin to'yxonasi, Jizzax viloyati, D052, 66, Dashtobod
- **Xarita:** https://yandex.uz/maps/org/65857280268?si=c6jrhcere130dahp0c5bddeutc

## Ranglar palitrasi

- **Asosiy:** Oltin (#d4af37) + Qora (#0a0a0a)
- **Matn:** Oq (rgba(255,255,255,0.9)) va yarim shaffof oq
- **Aksent:** Oltin gradientlar, shisha morfizm (backdrop-blur)
- **Fon:** Qora gradientlar (#0a0a0a → #1a1a2e → #0a0a0a)

## Arxitektura

Bitta sahifali (single page scroll) uslub. Barcha bo'limlar bitta `Home` komponentida. 3D Canvas butun sahifa fonida fixed pozitsiyada. GSAP ScrollTrigger yordamida har bir bo'lim skroll qilganda animatsiya bilan paydo bo'ladi.

### Fayl tuzilishi

```
src/pages/home/
├── ui/
│   ├── home.tsx              # Asosiy sahifa komponenti
│   ├── home.module.pcss      # Stillar (mavjud)
│   ├── scene-3d.tsx          # 3D sahna (mavjud)
│   └── sections/
│       ├── hero-section.tsx
│       ├── countdown-section.tsx
│       ├── invitation-section.tsx
│       ├── details-section.tsx
│       ├── rsvp-section.tsx
│       └── footer-section.tsx
├── lib/
│   └── use-countdown.ts      # Countdown hook
└── index.ts
```

## Bo'limlar

### 1. Hero (Kirish ekrani)

- **Fon:** 3D Canvas (oltin zarrachalar, nikoh uzuklari, suzuvchi yuraklar) — `scene-3d.tsx` da allaqachon tayyor
- **Kontent:**
  - "To'y taklifnomasi" sarlavha (oltin, kichik, letter-spacing)
  - "Abror" (oltin, katta serif shrift)
  - "&" belgisi (oltin, yarim shaffof)
  - "Marvard" (oltin, katta serif shrift)
  - "30 May, 2026" va "Shanba, soat 18:00" (oq, yarim shaffof)
  - "Pastga suring ↓" ko'rsatkichi (bounce animatsiya)
- **Animatsiya:** GSAP — ismlar fade-in + scale, ketma-ket paydo bo'ladi
- **Musiqa tugmasi:** Fixed pozitsiya, o'ng yuqori burchak. Bosish bilan fon musiqasini yoqish/o'chirish. Ikonka: 🔊/🔇

### 2. Countdown (Ortga sanash)

- **Maqsad:** 30 May, 2026 soat 18:00 gacha ortga sanash
- **Ko'rinish:** 4 ta kartochka yonma-yon: Kun, Soat, Daqiqa, Soniya
- **Kartochka stili:** Oltin chegarali, yarim shaffof fon, border-radius: 12px
- **Raqamlar:** Oltin rang, katta shrift, har soniyada yangilanadi
- **Hook:** `useCountdown(targetDate)` — kun/soat/daqiqa/soniya qaytaradi

### 3. Taklif matni

- **Ko'rinish:** Shisha morfizm kartochka (backdrop-blur, oltin chegara)
- **Kontent:** "Hurmatli mehmon!" sarlavha, taklif matni italic shriftda
- **Dekorativ:** ✦ belgisi yuqorida, oltin ajratkich chiziq pastda
- **Animatsiya:** GSAP ScrollTrigger — fade-in + yuqoriga slide

### 4. Sana, vaqt va joy

- **Ko'rinish:** 3 ta alohida kartochka vertikal joylashgan
- **Kartochkalar:**
  - 📅 Sana: "30 May, 2026-yil" / "Shanba kuni"
  - 🕕 Vaqt: "Soat 18:00" / "Kechki dastur"
  - 📍 Joy: "Jasmin to'yxonasi" / manzil / "Xaritada ko'rish" tugmasi
- **"Xaritada ko'rish" tugmasi:** Yandex Maps havolasiga yo'naltiradi (yangi tabda ochiladi)
- **Kartochka stili:** Oltin chegarali, yarim shaffof fon, border-radius: 16px

### 5. RSVP (Tasdiqlash)

- **Maqsad:** Faqat ko'rinish uchun, backend yo'q
- **Ko'rinish:** "Sizni kutib qolamiz!" sarlavha
- **Tugmalar:**
  - "✓ Kelaman" — oltin gradient fon, qora matn, bold
  - "✗ Afsuski..." — shaffof fon, oltin chegara
- **Bosilganda:** Oddiy CSS animatsiya (masalan, scale + rang o'zgarishi), hech qanday so'rov yuborilmaydi

### 6. Footer (Yakun)

- **Ko'rinish:** Minimal, markazlashgan
- **Kontent:**
  - ♥ belgisi (oltin)
  - "Abror & Marvard"
  - "30.05.2026"
  - Ajratkich chiziq
  - "Muhabbat bilan yaratildi"

## Umumiy animatsiyalar va effektlar

### 3D Canvas (mavjud — scene-3d.tsx)
- Butun sahifa fonida, fixed pozitsiya, z-index: 0
- 120 oltin zarracha, nikoh uzuklari, 8 suzuvchi yurak
- Bosilganda ripple effekt

### GSAP ScrollTrigger
- Har bir bo'lim skroll qilganda: fade-in (opacity: 0 → 1) + translateY (30px → 0)
- Stagger: bo'lim ichidagi elementlar ketma-ket paydo bo'ladi
- Duration: 0.8-1s, ease: "power2.out"

### Fon musiqasi
- Audio element, default holat: o'chirilgan (muted)
- Fixed tugma o'ng yuqori burchakda
- Foydalanuvchi birinchi marta bosganda yoqiladi
- Ikonka holati: 🔊 (yoqilgan) / 🔇 (o'chirilgan)
- Musiqa fayli: loyihaga qo'shiladi (mp3 format)

### Shisha morfizm
- `backdrop-filter: blur(10px)`
- Yarim shaffof fon: `rgba(212,175,55,0.05-0.1)`
- Oltin chegara: `rgba(212,175,55,0.15-0.3)`
- `border-radius: 12-16px`

## Mobil-birinchi dizayn

- Asosiy target: 390px kenglik (iPhone)
- Breakpointlar: 360px, 390px, 768px (planshet)
- Barcha elementlar vertikal joylashgan
- Touch-friendly tugmalar (min 44px balandlik)
- 3D effektlar mobilda engillashtiriladi (zarrachalar soni kamaytiriladi)

## Musiqa fayli

- Loyihaga `public/music/` papkasiga mp3 format da qo'shiladi
- Foydalanuvchi o'zi musiqa faylini taqdim etadi
