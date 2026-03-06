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

  /* ── Image Upload Placeholders ── */
  document.querySelectorAll('.image-upload-card').forEach(card => {
    const input      = card.querySelector('.file-input');
    const inner      = card.querySelector('.upload-inner');
    const preview    = card.querySelector('.upload-preview');
    const previewImg = card.querySelector('.preview-img');
    const removeBtn  = card.querySelector('.remove-img');

    // File input change
    input.addEventListener('change', () => {
      const file = input.files[0];
      if (file) showPreview(file);
    });

    // Drag & drop
    card.addEventListener('dragover', (e) => {
      e.preventDefault();
      card.classList.add('drag-over');
    });
    card.addEventListener('dragleave', () => card.classList.remove('drag-over'));
    card.addEventListener('drop', (e) => {
      e.preventDefault();
      card.classList.remove('drag-over');
      const file = e.dataTransfer.files[0];
      if (file && file.type.startsWith('image/')) showPreview(file);
    });

    // Remove image
    removeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      clearPreview();
    });

    function showPreview(file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        previewImg.src = e.target.result;
        inner.style.display   = 'none';
        preview.style.display = 'block';
        card.classList.add('has-image');
      };
      reader.readAsDataURL(file);
    }

    function clearPreview() {
      previewImg.src          = '';
      preview.style.display   = 'none';
      inner.style.display     = 'flex';
      card.classList.remove('has-image');
      input.value = '';
    }
  });

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

})();
