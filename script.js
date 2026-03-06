/* ═══════════════════════════════════════════════════════
   NATHANIEL PHOTOSHOP PORTFOLIO — script.js
   ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Navbar scroll shadow ── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });

  /* ── Mobile hamburger ── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.querySelector('.nav-links');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    spans.forEach(s => s.style.background = navLinks.classList.contains('open')
      ? 'var(--accent)'
      : 'var(--text-muted)'
    );
  });

  // Close mobile nav on link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => {
        s.style.background = 'var(--text-muted)';
      });
    });
  });

  /* ── Scroll-reveal ── */
  const revealEls = document.querySelectorAll(
    '.about-grid, .activity-grid, .contact-inner, .section-label'
  );
  revealEls.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ── Active nav link highlight on scroll ── */
  const sections = document.querySelectorAll('section[id], header[id]');
  const navAnchors = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(a => {
          const href = a.getAttribute('href').slice(1);
          a.style.color = href === id ? 'var(--accent)' : '';
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionObserver.observe(s));

  /* ── Photo Modal ── */
  const photoFrame = document.getElementById('photoFrame');
  const profilePhoto = document.getElementById('profilePhoto');
  const photoModal = document.getElementById('photoModal');
  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalClose = document.getElementById('modalClose');
  const modalImg = document.querySelector('.modal-img');

  // Open modal with specific image
  const openModal = (imgSrc, imgAlt) => {
    modalImg.src = imgSrc;
    modalImg.alt = imgAlt;
    photoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  // Close modal
  const closeModal = () => {
    photoModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  // Profile photo click
  if (photoFrame) {
    photoFrame.addEventListener('click', () => {
      openModal(profilePhoto.src, profilePhoto.alt);
    });
  }

  // All activity images click
  const activityImgCards = document.querySelectorAll('.activity-img-card');
  activityImgCards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('.activity-img');
      if (img) {
        openModal(img.src, img.alt);
      }
    });
  });

  // Close modal
  modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && photoModal.classList.contains('active')) {
      closeModal();
    }
  });

})();
