/* ============================================================
   LocalRoots Digital — main.js
   ============================================================ */

/* ── 1. SCROLL REVEAL ── */
(function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
  );
  els.forEach(el => observer.observe(el));
})();


/* ── 2. HERO WORD ROTATOR ── */
(function initWordRotator() {

  // Each entry: { word, seoQuery, businessName }
  const entries = [
    { word: 'restaurant',  seoQuery: '"best restaurant near me"',  businessName: "Marco's Trattoria"        },
    { word: 'burger joint',seoQuery: '"best burgers near me"',      businessName: "Big Mike's Burgers"       },
    { word: 'pizza shop',  seoQuery: '"pizza delivery near me"',    businessName: "Slice & Fire Pizza"       },
    { word: 'juice bar',   seoQuery: '"juice bar near me"',         businessName: "The Green Press"          },
    { word: 'boutique',    seoQuery: '"boutique clothing near me"', businessName: "Elara Boutique"           },
    { word: 'steakhouse',  seoQuery: '"steakhouse near me"',        businessName: "The Prime Cut"            },
    { word: 'café',        seoQuery: '"coffee shop near me"',       businessName: "Morning Ritual Café"      },
    { word: 'nail salon',  seoQuery: '"nail salon near me"',        businessName: "Studio V Nails"           },
    { word: 'barbershop',  seoQuery: '"barbershop near me"',        businessName: "The Barber Collective"    },
    { word: 'bakery',      seoQuery: '"bakery near me"',            businessName: "Sweet Crumb Bakery"       },
    { word: 'food truck',  seoQuery: '"food truck near me"',        businessName: "The Rolling Feast"        },
    { word: 'law office',  seoQuery: '"attorney near me"',          businessName: "Carter & Associates Law" },
  ];

  const rotator   = document.getElementById('wordRotator');
  const seoDescEl = document.getElementById('seoDesc');
  const bizNameEl = document.querySelector('.restaurant-name');

  if (!rotator) return;

  // Build word spans dynamically from entries array
  // First, clear any pre-existing word spans (keep the sizer)
  const sizer = rotator.querySelector('.sizer');
  rotator.querySelectorAll('.word').forEach(w => w.remove());

  // Set sizer text to the widest word so the container stays stable
  const widest = entries.reduce((a, b) => a.word.length >= b.word.length ? a : b);
  if (sizer) sizer.textContent = widest.word;

  // Create a span for each entry
  const wordEls = entries.map((entry, i) => {
    const span = document.createElement('span');
    span.className = 'word' + (i === 0 ? ' is-active' : '');
    span.textContent = entry.word;
    rotator.appendChild(span);
    return span;
  });

  let current = 0;
  let animating = false;

  function rotateTo(nextIdx) {
    if (animating || nextIdx === current) return;
    animating = true;

    const currentEl = wordEls[current];
    const nextEl    = wordEls[nextIdx];

    // 1. Kick current word out (slides up, fades)
    currentEl.classList.add('is-exiting');
    currentEl.classList.remove('is-active');

    // 2. Bring next word in from below
    nextEl.classList.add('is-active');

    // 3. Clean up exiting word after transition (reset to below, hidden)
    const TRANSITION_MS = 420;
    setTimeout(() => {
      currentEl.classList.remove('is-exiting');
      // briefly suppress transition while resetting position
      currentEl.style.transition = 'none';
      currentEl.style.transform  = 'translateY(100%)';
      currentEl.style.opacity    = '0';
      // re-enable transitions on next paint
      requestAnimationFrame(() => requestAnimationFrame(() => {
        currentEl.style.transition = '';
        currentEl.style.transform  = '';
        currentEl.style.opacity    = '';
      }));

      animating = false;
    }, TRANSITION_MS + 50);

    // 4. Update side-card details with a short crossfade
    const data = entries[nextIdx];

    if (seoDescEl) {
      seoDescEl.style.opacity = '0';
      setTimeout(() => {
        seoDescEl.textContent  = data.seoQuery;
        seoDescEl.style.opacity = '1';
      }, 200);
    }

    if (bizNameEl) {
      bizNameEl.style.opacity = '0';
      setTimeout(() => {
        bizNameEl.textContent  = data.businessName;
        bizNameEl.style.opacity = '1';
      }, 200);
    }

    current = nextIdx;
  }

  // Auto-rotate every 2.4 seconds
  setInterval(() => {
    rotateTo((current + 1) % entries.length);
  }, 2400);

})();
