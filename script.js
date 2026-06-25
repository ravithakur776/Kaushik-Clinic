/* ========================================
   KAUSHIK HEALTH CARE CLINIC
   script.js — Interactions & Animations
   ======================================== */

"use strict";

// ---- DOM Ready ----
document.addEventListener("DOMContentLoaded", () => {
  initScrollProgress();
  initNavbar();
  initHamburger();
  initCursorGlow();
  initReveal();
  initStats();
  initTestimonialSlider();
  initFAQ();
  initMagneticButtons();
  initScrollSpy();
  initProcessLine();
  initContactForm();
  initBackToTop();
  initSmoothScroll();
  initCardTilt();
  initParallax();
});

// ---- Scroll Progress ----
function initScrollProgress() {
  const bar = document.getElementById("scrollProgress");
  if (!bar) return;
  window.addEventListener(
    "scroll",
    () => {
      const total = document.body.scrollHeight - window.innerHeight;
      const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
      bar.style.width = pct + "%";
    },
    { passive: true },
  );
}

// ---- Navbar ----
function initNavbar() {
  const nav = document.getElementById("navbar");
  if (!nav) return;
  let lastY = 0;
  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY;
      if (y > 60) {
        nav.classList.add("scrolled");
      } else {
        nav.classList.remove("scrolled");
      }
      lastY = y;
    },
    { passive: true },
  );
}

// ---- Hamburger / Mobile Menu ----
function initHamburger() {
  const btn = document.getElementById("hamburger");
  const menu = document.getElementById("mobileMenu");
  if (!btn || !menu) return;

  btn.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    btn.classList.toggle("active", isOpen);
    btn.setAttribute("aria-expanded", String(isOpen));
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  menu.querySelectorAll(".mobile-link, .btn").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      btn.classList.remove("active");
      btn.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("open")) {
      menu.classList.remove("open");
      btn.classList.remove("active");
      btn.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
  });
}

// ---- Cursor Glow (desktop only) ----
function initCursorGlow() {
  if (window.matchMedia("(pointer:coarse)").matches) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const glow = document.getElementById("cursorGlow");
  if (!glow) return;
  glow.style.opacity = "1";
  document.addEventListener(
    "mousemove",
    (e) => {
      glow.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
    },
    { passive: true },
  );
}

// ---- Scroll Reveal ----
function initReveal() {
  const els = document.querySelectorAll("[data-reveal]");
  if (!els.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    els.forEach((el) => el.classList.add("revealed"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add("revealed");
          }, Number(delay));
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
  );

  els.forEach((el) => observer.observe(el));
}

// ---- Stats Counter ----
function initStats() {
  const nums = document.querySelectorAll(".stat-number[data-count]");
  if (!nums.length) return;

  const ease = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

  const animateCount = (el, target, duration = 1800) => {
    const start = performance.now();
    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      el.textContent = Math.round(ease(progress) * target);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.count, 10);
          animateCount(el, target);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.5 },
  );

  nums.forEach((num) => observer.observe(num));
}

// ---- Testimonial Slider ----
function initTestimonialSlider() {
  const slider = document.getElementById("testiSlider");
  const prevBtn = document.getElementById("prevTesti");
  const nextBtn = document.getElementById("nextTesti");
  const dotsContainer = document.getElementById("sliderDots");
  if (!slider || !prevBtn || !nextBtn) return;

  const cards = slider.querySelectorAll(".testi-card");
  if (!cards.length) return;

  let current = 0;
  let perView = getPerView();
  let maxIndex = Math.max(0, cards.length - perView);
  let autoplayTimer = null;

  function getPerView() {
    if (window.innerWidth <= 640) return 1;
    if (window.innerWidth <= 960) return 2;
    return 3;
  }

  function buildDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = "";
    const count = maxIndex + 1;
    for (let i = 0; i < count; i++) {
      const btn = document.createElement("button");
      btn.className = "dot" + (i === current ? " active" : "");
      btn.setAttribute("aria-label", `Go to slide ${i + 1}`);
      btn.addEventListener("click", () => goTo(i));
      dotsContainer.appendChild(btn);
    }
  }

  function updateDots() {
    if (!dotsContainer) return;
    dotsContainer
      .querySelectorAll(".dot")
      .forEach((d, i) => d.classList.toggle("active", i === current));
  }

  function setCardWidth() {
    perView = getPerView();
    maxIndex = Math.max(0, cards.length - perView);
    current = Math.min(current, maxIndex);
    const gap = 24;
    const totalGap = (perView - 1) * gap;
    cards.forEach((card) => {
      card.style.flex = `0 0 calc((100% - ${totalGap}px) / ${perView})`;
      card.style.minWidth = `calc((100% - ${totalGap}px) / ${perView})`;
    });
  }

  function goTo(index) {
    current = Math.max(0, Math.min(index, maxIndex));
    const gap = 24;
    const totalGap = (perView - 1) * gap;
    const cardWidth = (slider.offsetWidth - totalGap) / perView;
    slider.style.transform = `translateX(-${current * (cardWidth + gap)}px)`;
    updateDots();
  }

  function autoplay() {
    clearTimeout(autoplayTimer);
    autoplayTimer = setTimeout(() => {
      goTo(current >= maxIndex ? 0 : current + 1);
      autoplay();
    }, 4500);
  }

  setCardWidth();
  buildDots();
  autoplay();

  prevBtn.addEventListener("click", () => {
    goTo(current > 0 ? current - 1 : maxIndex);
    autoplay();
  });
  nextBtn.addEventListener("click", () => {
    goTo(current < maxIndex ? current + 1 : 0);
    autoplay();
  });

  // Touch/swipe
  let touchStartX = 0;
  slider.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.touches[0].clientX;
    },
    { passive: true },
  );
  slider.addEventListener(
    "touchend",
    (e) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        diff > 0 ? goTo(current + 1) : goTo(current - 1);
        autoplay();
      }
    },
    { passive: true },
  );

  window.addEventListener(
    "resize",
    () => {
      setCardWidth();
      buildDots();
      goTo(Math.min(current, maxIndex));
    },
    { passive: true },
  );
}

// ---- FAQ Accordion ----
function initFAQ() {
  const items = document.querySelectorAll(".faq-item");
  items.forEach((item) => {
    const btn = item.querySelector(".faq-question");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      items.forEach((i) => {
        i.classList.remove("open");
        i.querySelector(".faq-question")?.setAttribute(
          "aria-expanded",
          "false",
        );
      });
      if (!isOpen) {
        item.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });
}

// ---- Magnetic Buttons ----
function initMagneticButtons() {
  if (window.matchMedia("(pointer:coarse)").matches) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const btns = document.querySelectorAll(".btn-magnetic");
  btns.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "";
    });
  });
}

// ---- Scroll Spy (active nav link) ----
function initScrollSpy() {
  const links = document.querySelectorAll(".nav-link");
  const sections = [];
  links.forEach((link) => {
    const id = link.getAttribute("href").replace("#", "");
    const section = document.getElementById(id);
    if (section) sections.push({ id, section, link });
  });
  if (!sections.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((l) => l.classList.remove("active"));
          const active = sections.find((s) => s.section === entry.target);
          if (active) active.link.classList.add("active");
        }
      });
    },
    { threshold: 0.3, rootMargin: "-60px 0px -40% 0px" },
  );

  sections.forEach((s) => observer.observe(s.section));
}

// ---- Process Line Animation ----
function initProcessLine() {
  const line = document.getElementById("processLine");
  if (!line) return;
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        setTimeout(() => {
          line.style.width = "100%";
        }, 300);
        document.querySelectorAll(".process-step").forEach((step, i) => {
          setTimeout(() => step.classList.add("active"), 300 + i * 200);
        });
        observer.disconnect();
      }
    },
    { threshold: 0.3 },
  );
  observer.observe(line.parentElement);
}

// ---- Contact Form ----
function initContactForm() {
  const submitBtn = document.getElementById("submitBtn");
  const formSuccess = document.getElementById("formSuccess");
  if (!submitBtn) return;

  submitBtn.addEventListener("click", () => {
    const name = document.getElementById("name")?.value.trim();
    const phone = document.getElementById("phone")?.value.trim();

    if (!name || !phone) {
      // Highlight empty fields
      if (!name) highlightError("name");
      if (!phone) highlightError("phone");
      return;
    }

    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    // Simulate submission (replace with real backend)
    setTimeout(() => {
      submitBtn.style.display = "none";
      if (formSuccess) formSuccess.style.display = "block";
    }, 1200);
  });

  function highlightError(fieldId) {
    const field = document.getElementById(fieldId);
    if (!field) return;
    field.style.borderColor = "#ef4444";
    field.style.boxShadow = "0 0 0 3px rgba(239,68,68,0.1)";
    field.focus();
    field.addEventListener(
      "input",
      () => {
        field.style.borderColor = "";
        field.style.boxShadow = "";
      },
      { once: true },
    );
  }
}

// ---- Back to Top ----
function initBackToTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;
  window.addEventListener(
    "scroll",
    () => {
      btn.classList.toggle("visible", window.scrollY > 400);
    },
    { passive: true },
  );
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ---- Smooth Scroll for all anchor links ----
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      const navH = document.getElementById("navbar")?.offsetHeight || 72;
      const top = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });
}

// ---- Card Tilt (service cards, why cards) ----
function initCardTilt() {
  if (window.matchMedia("(pointer:coarse)").matches) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const cards = document.querySelectorAll(
    ".service-card, .why-card, .doc-qual-card",
  );
  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(600px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) translateZ(4px)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

// ---- Hero Parallax on mouse move ----
function initParallax() {
  if (window.matchMedia("(pointer:coarse)").matches) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const hero = document.querySelector(".hero");
  if (!hero) return;
  const floats = hero.querySelectorAll(".hero-float");
  const card = hero.querySelector(".hero-doctor-card");

  hero.addEventListener("mousemove", (e) => {
    const rect = hero.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    const cy = (e.clientY - rect.top) / rect.height - 0.5;
    floats.forEach((el, i) => {
      const d = (i % 2 === 0 ? 1 : -1) * (12 + i * 4);
      el.style.transform = `translate(${cx * d}px, ${cy * d}px)`;
    });
    if (card) {
      card.style.transform = `translateY(-12px) perspective(800px) rotateY(${cx * 4}deg) rotateX(${-cy * 4}deg)`;
    }
  });

  hero.addEventListener("mouseleave", () => {
    floats.forEach((el) => (el.style.transform = ""));
    if (card) card.style.transform = "";
  });
}

// ---- Ripple Effect on Buttons ----
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn");
  if (!btn) return;
  const ripple = document.createElement("span");
  const rect = btn.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = e.clientX - rect.left - size / 2;
  const y = e.clientY - rect.top - size / 2;
  Object.assign(ripple.style, {
    position: "absolute",
    width: size + "px",
    height: size + "px",
    left: x + "px",
    top: y + "px",
    background: "rgba(255,255,255,0.3)",
    borderRadius: "50%",
    transform: "scale(0)",
    animation: "ripple 0.55s ease-out forwards",
    pointerEvents: "none",
    zIndex: "10",
  });
  btn.style.position = btn.style.position || "relative";
  btn.style.overflow = "hidden";
  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
});

// Inject ripple keyframe
const style = document.createElement("style");
style.textContent = `@keyframes ripple { to { transform: scale(2.5); opacity: 0; } }`;
document.head.appendChild(style);
