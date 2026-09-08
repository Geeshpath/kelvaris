/* ============================================================
   KELVARIS TECHNOLOGIES — Shared site script
   Used by about.html, services.html, projects.html, contact.html
   ============================================================ */

/* ── Mobile menu toggle ─────────────────────────────────── */
function toggleMobileMenu() {
  const links = document.getElementById('navLinks');
  const icon = document.getElementById('menuIcon');
  if (!links || !icon) return;
  const isOpen = links.classList.toggle('open');
  icon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
}

/* ── Contact form (AJAX via Formspree) ──────────────────── */
async function handleFormSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  const success = document.getElementById('formSuccess');
  const error = document.getElementById('formError');
  if (success) success.style.display = 'none';
  if (error) error.style.display = 'none';
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin" style="margin-right:8px;"></i>Sending...';
  }

  try {
    const res = await fetch(e.target.action, {
      method: 'POST',
      body: new FormData(e.target),
      headers: { Accept: 'application/json' },
    });
    if (res.ok) {
      if (success) success.style.display = 'block';
      e.target.reset();
    } else if (error) {
      error.style.display = 'block';
    }
  } catch {
    if (error) error.style.display = 'block';
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane" style="margin-right:8px;"></i>Send Message';
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {

  /* ── Highlight the current page in the nav (belt & braces —
        the "active" class is already set per-page in the HTML,
        this just keeps it correct if a link is edited later) ─ */
  const here = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a[href]').forEach(a => {
    const href = a.getAttribute('href');
    a.classList.toggle('active', href === here);
  });

  /* ── Close mobile menu after choosing a link ────────────── */
  document.querySelectorAll('.nav-links a[href]').forEach(a => {
    a.addEventListener('click', () => {
      const links = document.getElementById('navLinks');
      const icon = document.getElementById('menuIcon');
      if (links && links.classList.contains('open')) {
        links.classList.remove('open');
        if (icon) icon.className = 'fas fa-bars';
      }
    });
  });

  /* ── Navbar scroll shadow ────────────────────────────────── */
  const nav = document.getElementById('mainNav');
  if (nav) {
    const onScroll = () => {
      nav.style.boxShadow = window.scrollY > 40
        ? '0 4px 18px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.5) inset'
        : '0 3px 10px rgba(0,0,0,0.45), 0 1px 0 rgba(255,255,255,0.6) inset';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Scroll-reveal for anything tagged .reveal ──────────── */
  const revealTargets = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealTargets.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealTargets.forEach(el => io.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('in'));
  }

  /* ── Back-to-top button ──────────────────────────────────── */
  const toTop = document.createElement('button');
  toTop.className = 'back-to-top';
  toTop.setAttribute('aria-label', 'Back to top');
  toTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
  document.body.appendChild(toTop);
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  window.addEventListener('scroll', () => {
    toTop.classList.toggle('show', window.scrollY > 480);
  }, { passive: true });
});
