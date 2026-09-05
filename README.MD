# Kaushik Health Care Clinic — Website

A premium, production-ready one-page website for **Kaushik Health Care Clinic**, Mathura, UP. Built with pure HTML5, CSS3, and Vanilla JavaScript — no frameworks, no libraries.

---

## 📁 Project Structure

```
kaushik-health/
├── index.html       → Main HTML (all sections, SEO, schema)
├── style.css        → All styles (layout, animations, responsive)
├── script.js        → All interactions & animations
└── README.md        → This file
```

---

## 🌐 Sections

| #   | Section               | Description                                                            |
| --- | --------------------- | ---------------------------------------------------------------------- |
| 1   | **Navbar**            | Glassmorphism, shrinks on scroll, smooth scroll-spy                    |
| 2   | **Hero**              | Full viewport, animated heading, doctor card, floating icons, parallax |
| 3   | **Stats**             | Animated counters — 500+ patients, 7+ years, 24/7, 100% satisfaction   |
| 4   | **About**             | Split layout, clinic story, 3 highlight cards                          |
| 5   | **Doctor**            | Dr. Pradyuman Kaushik profile, qualifications, tags                    |
| 6   | **Services**          | 10 service cards with hover glow & tilt effect                         |
| 7   | **Why Choose Us**     | 8 feature cards with icon animation                                    |
| 8   | **Treatment Process** | 5-step horizontal timeline with animated fill line                     |
| 9   | **Testimonials**      | Auto-playing slider with touch/swipe, dot navigation                   |
| 10  | **FAQ**               | Smooth accordion                                                       |
| 11  | **Appointment CTA**   | Gradient section with call-to-action buttons                           |
| 12  | **Contact**           | Split layout — details + working contact form                          |
| 13  | **Footer**            | Full footer with links, social icons, copyright                        |

---

## ✨ Features & Animations

- Scroll progress bar
- Custom cursor glow (desktop)
- Scroll reveal (fade-up / fade-left / fade-right)
- Animated stat counters (eased, starts on scroll)
- Floating hero icons with mouse parallax
- Doctor card float animation
- Card tilt effect (mouse tracking)
- Magnetic button effect
- Ripple click effect on all buttons
- Testimonial slider with autoplay + touch swipe
- Process timeline fill animation on scroll
- FAQ smooth accordion
- Active nav link scroll-spy
- Glassmorphism navbar on scroll
- Floating WhatsApp & Call buttons
- Back-to-top button
- `prefers-reduced-motion` respected throughout

---

## 🎨 Design System

| Token         | Value                  |
| ------------- | ---------------------- |
| Primary       | `#0F6CBD`              |
| Secondary     | `#19C6C3`              |
| Accent        | `#4F46E5`              |
| Success       | `#22C55E`              |
| Background    | `#F7FBFF`              |
| Dark          | `#0B1324`              |
| Headings      | Poppins (Google Fonts) |
| Body          | Inter (Google Fonts)   |
| Border radius | 18–30px                |

---

## 🔧 Setup & Usage

No build step required. Open directly in browser:

```bash
# Just open in browser
open index.html

# Or serve locally
npx serve .
# or
python3 -m http.server 3000
```

---

## 📝 Customization Checklist

Before going live, replace the following placeholders:

- [ ] `+91-XXXXXXXXXX` → Real clinic phone number (appears in navbar CTA, hero, FABs, footer, contact)
- [ ] `kaushikhealthcare@gmail.com` → Real email address
- [ ] `https://kaushikhealthcare.in/` → Real domain (in `<link rel="canonical">` and schema)
- [ ] Doctor photo → Add real image inside `.doc-photo-wrap` and `.doctor-avatar-placeholder`
- [ ] Clinic photo → Add real image inside `.about-img-placeholder`
- [ ] Google Maps link → Replace `https://maps.google.com/?q=...` with actual Maps embed or link
- [ ] Social media links → Replace `#` in footer social icons with real URLs
- [ ] WhatsApp number → Update `https://wa.me/91XXXXXXXXXX` links

---

## 📦 Dependencies

None. Everything is self-contained.

External resources loaded via CDN:

- [Google Fonts — Poppins & Inter](https://fonts.google.com) _(requires internet on first load)_

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout                                 |
| ---------- | -------------------------------------- |
| `> 1100px` | Full desktop, 4-column grids           |
| `960px`    | Tablet, stacked hero, 2-column grids   |
| `640px`    | Mobile, single column, compact spacing |
| `320px`    | Small phone, fluid everything          |

---

## ⚡ Performance Notes

- Zero JS dependencies
- CSS custom properties for consistent theming
- `IntersectionObserver` for all scroll effects (no scroll listener overhead)
- Animations use `transform` and `opacity` only (GPU composited)
- `passive` event listeners on scroll/touch
- `prefers-reduced-motion` disables all animations for accessibility

---

## 🔍 SEO

Includes full on-page SEO:

- Meta title & description
- Open Graph + Twitter Card
- Canonical tag
- `schema.org` structured data: `MedicalClinic`, `LocalBusiness`, `Physician`, `FAQPage`
- Semantic HTML5 (`<section>`, `<article>`, `<nav>`, `<footer>`, `<main>`)
- Proper heading hierarchy (H1 → H2 → H3 → H4)
- ARIA labels on all interactive elements

---

## 👨‍💻 Built By

Designed & developed by **Ravi Thakur** — Frontend Developer & UI/UX Designer, Mathura.

> Replace phone numbers and email before deploying. Add real photos to complete the design.

..
