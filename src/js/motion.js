import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initMotion() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;

  try {
    ScrollTrigger.config({ ignoreMobileResize: true });

    gsap.fromTo(
      '.nav',
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.1 }
    );

    const hero = gsap.timeline({ defaults: { ease: 'power3.out' } });
    hero
      .fromTo('.hero__img', { scale: 1.12 }, { scale: 1, duration: 1.8, ease: 'power2.out' }, 0)
      .fromTo('.hero__anim', { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: 1.05, stagger: 0.1 }, 0.2)
      .fromTo('.hero__rule', { scaleX: 0, opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.85, ease: 'power2.inOut' }, 0.75)
      .fromTo('.names span', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.95, stagger: 0.08 }, 0.35);

    hero.eventCallback('onComplete', () => {
      gsap.to('.hero__img', {
        scale: 1.045,
        duration: 8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    });

    if (window.matchMedia('(min-width: 960px)').matches) {
      gsap.to('.hero__parallax', {
        yPercent: 10,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }

    gsap.utils.toArray('[data-group]').forEach((group) => {
      const items = group.querySelectorAll('[data-reveal]');
      if (!items.length) return;
      gsap.fromTo(
        items,
        { y: 40, opacity: 0, filter: 'blur(6px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1.1,
          stagger: 0.09,
          ease: 'power3.out',
          scrollTrigger: { trigger: group, start: 'top 80%', once: true },
        }
      );
    });

    gsap.utils.toArray('[data-reveal]').forEach((el) => {
      if (el.closest('[data-group]') || el.classList.contains('film__card') || el.classList.contains('film__arrow')) return;
      gsap.fromTo(
        el,
        { y: 36, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        }
      );
    });

    const film = document.querySelector('.film');
    if (film) {
      gsap.fromTo(
        film,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: film, start: 'top 88%', once: true },
        }
      );

      gsap.fromTo(
        '.film__arrow',
        { opacity: 0, scale: 0.8 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: 'back.out(1.6)',
          scrollTrigger: { trigger: film, start: 'top 85%', once: true },
        }
      );

      gsap.utils.toArray('.film__card').forEach((card, i) => {
        gsap.fromTo(
          card,
          { x: 40, opacity: 0, scale: 0.94 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 0.85,
            delay: i * 0.04,
            ease: 'power3.out',
            scrollTrigger: { trigger: film, start: 'top 85%', once: true },
          }
        );
      });
    }

    gsap.utils.toArray('[data-clip]').forEach((frame) => {
      const img = frame.querySelector('img');
      const tween = gsap.timeline({
        scrollTrigger: { trigger: frame, start: 'top 82%', once: true },
      });
      tween.fromTo(
        frame,
        { clipPath: 'inset(16% 0 0 0)' },
        { clipPath: 'inset(0% 0 0 0)', duration: 1.35, ease: 'power4.inOut' }
      );
      if (img) {
        tween.fromTo(img, { scale: 1.14 }, { scale: 1, duration: 1.5, ease: 'power3.out' }, 0);
      }

      if (img && window.matchMedia('(min-width: 768px)').matches) {
        gsap.to(img, {
          yPercent: 8,
          ease: 'none',
          scrollTrigger: {
            trigger: frame,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    });

    gsap.utils.toArray('[data-draw]').forEach((line) => {
      gsap.fromTo(
        line,
        { scaleX: 0, opacity: 0.4 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 1,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: line, start: 'top 88%', once: true },
        }
      );
    });

    gsap.utils.toArray('.ornament').forEach((ornament) => {
      gsap.fromTo(
        ornament,
        { scale: 0.6, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.9,
          ease: 'back.out(1.6)',
          scrollTrigger: { trigger: ornament, start: 'top 90%', once: true },
        }
      );
    });

    const day = document.querySelector('.date__day');
    if (day) {
      gsap.fromTo(
        day,
        { y: 50, opacity: 0, scale: 0.88 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'back.out(1.4)',
          scrollTrigger: { trigger: day, start: 'top 85%', once: true },
        }
      );
    }

    gsap.utils.toArray('.people li').forEach((item, i) => {
      gsap.fromTo(
        item,
        { x: -16, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.75,
          delay: i * 0.06,
          ease: 'power2.out',
          scrollTrigger: { trigger: item.closest('.family__grid'), start: 'top 78%', once: true },
        }
      );
    });

    gsap.utils.toArray('.schedule div').forEach((row, i) => {
      gsap.fromTo(
        row,
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          delay: i * 0.12,
          ease: 'power2.out',
          scrollTrigger: { trigger: row.closest('.schedule'), start: 'top 85%', once: true },
        }
      );
    });

    gsap.utils.toArray('.swatches li').forEach((item, i) => {
      gsap.fromTo(
        item,
        { y: 16, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.7,
          delay: i * 0.05,
          ease: 'back.out(1.5)',
          scrollTrigger: { trigger: item.closest('.swatches'), start: 'top 88%', once: true },
        }
      );
    });

    gsap.utils.toArray('.gallery__item').forEach((item, i) => {
      gsap.fromTo(
        item,
        { y: 32, opacity: 0, rotate: i % 2 ? 1.2 : -1.2 },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          duration: 0.95,
          ease: 'power3.out',
          scrollTrigger: { trigger: item, start: 'top 92%', once: true },
        }
      );
    });

    if (window.matchMedia('(hover: hover)').matches) {
      gsap.utils.toArray('.btn, .link, .nav__cta').forEach((el) => {
        el.addEventListener('mouseenter', () => {
          gsap.to(el, { scale: 1.03, duration: 0.25, ease: 'power2.out' });
        });
        el.addEventListener('mouseleave', () => {
          gsap.to(el, { scale: 1, duration: 0.3, ease: 'power2.out' });
        });
      });
    }

    gsap.utils.toArray('.hero__script, .letter__script, .gallery__script, .date__script, .venue__script, .footer__script').forEach((el, i) => {
      gsap.to(el, {
        y: -8,
        duration: 3.5 + i * 0.3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    });

    gsap.utils.toArray('main > section').forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0.92 },
        {
          opacity: 1,
          duration: 1.2,
          ease: 'power1.out',
          scrollTrigger: { trigger: section, start: 'top 92%', once: true },
        }
      );
    });

    const links = document.querySelectorAll('.nav__links a[href^="#"]');
    links.forEach((link) => {
      const id = link.getAttribute('href').slice(1);
      const section = document.getElementById(id);
      if (!section) return;
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onToggle: (self) => link.classList.toggle('is-active', self.isActive),
      });
    });

    window.addEventListener('load', () => ScrollTrigger.refresh());
  } catch {
    document.documentElement.classList.remove('js');
  }
}
