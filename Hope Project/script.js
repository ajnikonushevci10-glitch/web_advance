/* HOPE — shared behaviour across all pages */

document.addEventListener('DOMContentLoaded', () => {
  /* ---------- Mobile nav toggle ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('is-open');
      toggle.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  /* ---------- Shopping bag counter (persists via localStorage) ---------- */
  const BAG_KEY = 'hope-bag-count';

  function getBagCount() {
    return parseInt(localStorage.getItem(BAG_KEY) || '0', 10);
  }

  function renderBagCount() {
    document.querySelectorAll('#bag-count').forEach((el) => {
      el.textContent = getBagCount();
    });
  }

  function addToBag(button) {
    const next = getBagCount() + 1;
    localStorage.setItem(BAG_KEY, String(next));
    renderBagCount();

    const original = button.textContent;
    button.textContent = 'Added ✓';
    button.disabled = true;
    setTimeout(() => {
      button.textContent = original;
      button.disabled = false;
    }, 1200);
  }

  renderBagCount();

  document.querySelectorAll('[data-add-to-bag]').forEach((btn) => {
    btn.addEventListener('click', () => addToBag(btn));
  });

  /* ---------- Shop page category filters ---------- */
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  if (filterButtons.length && productCards.length) {
    filterButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterButtons.forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        const category = btn.dataset.filter;

        productCards.forEach((card) => {
          const matches = category === 'all' || card.dataset.category === category;
          card.classList.toggle('is-hidden', !matches);
        });
      });
    });
  }

  /* ---------- Newsletter form (index page) ---------- */
  const newsletterForm = document.querySelector('#newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const note = newsletterForm.querySelector('.form-note');
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      if (note) {
        note.textContent = `Thanks — a welcome note is on its way to ${emailInput.value}.`;
        note.classList.add('is-visible');
      }
      newsletterForm.reset();
    });
  }

  /* ---------- Contact form validation ---------- */
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      const fields = ['name', 'email', 'message'];
      fields.forEach((field) => {
        const input = contactForm.querySelector(`#${field}`);
        const error = contactForm.querySelector(`#${field}-error`);
        if (!input.value.trim()) {
          error.textContent = 'This field is required.';
          valid = false;
        } else if (field === 'email' && !/^\S+@\S+\.\S+$/.test(input.value)) {
          error.textContent = 'Enter a valid email address.';
          valid = false;
        } else {
          error.textContent = '';
        }
      });

      const note = contactForm.querySelector('.form-note');
      if (valid && note) {
        note.textContent = 'Message sent — we usually reply within two days.';
        note.classList.add('is-visible');
        contactForm.reset();
      } else if (note) {
        note.classList.remove('is-visible');
      }
    });
  }
});
