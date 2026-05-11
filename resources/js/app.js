// Re-trigger reveals every time an element enters the viewport — so scrolling back
// up replays the same animation. We add `is-visible` on entry, and remove it once
// the element has fully scrolled out so the next entry replays cleanly.
const reveals = document.querySelectorAll('.reveal, .stagger');
const revealObserver = new IntersectionObserver(
    (entries) => {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                // Only reset when the element is fully out of the viewport in either direction
                const r = entry.boundingClientRect;
                const fullyAbove = r.bottom < 0;
                const fullyBelow = r.top > window.innerHeight;
                if (fullyAbove || fullyBelow) {
                    entry.target.classList.remove('is-visible');
                }
            }
        }
    },
    { threshold: [0, 0.12], rootMargin: '0px 0px -40px 0px' }
);
reveals.forEach((el) => revealObserver.observe(el));

// Sticky-nav shadow on scroll
const nav = document.querySelector('[data-nav]');
if (nav) {
    const onScroll = () => {
        if (window.scrollY > 8) nav.classList.add('is-scrolled');
        else nav.classList.remove('is-scrolled');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
}

// Mobile menu toggle
const menuBtn = document.querySelector('[data-menu-btn]');
const menuPanel = document.querySelector('[data-menu-panel]');
if (menuBtn && menuPanel) {
    menuBtn.addEventListener('click', () => {
        const open = menuPanel.classList.toggle('is-open');
        menuBtn.setAttribute('aria-expanded', String(open));
        document.body.style.overflow = open ? 'hidden' : '';
    });
    menuPanel.querySelectorAll('a').forEach((a) =>
        a.addEventListener('click', () => {
            menuPanel.classList.remove('is-open');
            menuBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        })
    );
}

// Animated stat counters
const animateCount = (el) => {
    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix ?? '';
    const decimals = parseInt(el.dataset.decimals ?? '0', 10);
    const duration = 1600;
    const start = performance.now();
    const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 3);
        const value = target * eased;
        el.textContent =
            (decimals ? value.toFixed(decimals) : Math.round(value).toLocaleString()) + suffix;
        if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
};
const statObserver = new IntersectionObserver(
    (entries) => {
        for (const entry of entries) {
            const r = entry.boundingClientRect;
            if (entry.isIntersecting) {
                animateCount(entry.target);
            } else if (r.bottom < 0 || r.top > window.innerHeight) {
                // Reset to 0 when fully out of view so re-entry re-animates
                const suffix = entry.target.dataset.suffix ?? '';
                entry.target.textContent = '0' + suffix;
            }
        }
    },
    { threshold: [0, 0.4] }
);
document.querySelectorAll('[data-count]').forEach((el) => statObserver.observe(el));

// Active section highlight in nav
const sections = Array.from(document.querySelectorAll('section[id]'));
const navLinks = Array.from(document.querySelectorAll('[data-nav-link]'));
if (sections.length && navLinks.length) {
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    navLinks.forEach((l) => {
                        const match = l.getAttribute('href') === `#${id}`;
                        l.classList.toggle('is-active', match);
                    });
                }
            }
        },
        { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => sectionObserver.observe(s));
}

// Submit Emergency — scroll-lock until the user clicks the button.
const submitLock = document.querySelector('[data-submit-lock]');
const submitBtn  = document.querySelector('[data-submit-emergency]');
const submitHint = document.querySelector('[data-submit-hint]');

if (submitLock && submitBtn) {
    let locked  = false;
    let unlocked = false; // once unlocked (button clicked), never lock again
    let lockedY = 0;

    const preventScroll = (e) => {
        if (!locked) return;
        // Allow clicks/keyboard on the button itself
        if (e.target && submitBtn.contains(e.target)) return;
        e.preventDefault();
        // Snap back to the locked Y in case anything moved us
        window.scrollTo(0, lockedY);
    };

    const onScroll = () => {
        if (unlocked) return;
        // Skip entirely if the submit-lock element is hidden (e.g. on a non-home view).
        // Without this, getBoundingClientRect returns 0,0,0,0 for display:none, which
        // wrongly satisfies rect.top <= 0 and locks scroll on every other page.
        if (!submitLock.offsetParent) return;
        if (locked) {
            // Keep the page pinned at lockedY
            if (Math.abs(window.scrollY - lockedY) > 1) window.scrollTo(0, lockedY);
            return;
        }
        const rect = submitLock.getBoundingClientRect();
        // Engage lock when the submit zone has reached the top of the viewport
        if (rect.top <= 0) {
            locked = true;
            lockedY = window.scrollY + rect.top; // exact scrollY where rect.top becomes 0
            window.scrollTo(0, lockedY);
            if (submitHint) submitHint.classList.add('is-locked');
            // Visual cue — gentle shake-once on the button
            submitBtn.classList.add('is-attention');
            setTimeout(() => submitBtn.classList.remove('is-attention'), 700);
        }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Block wheel/touchmove/keys while locked (passive: false to allow preventDefault)
    window.addEventListener('wheel',     preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });
    window.addEventListener('keydown', (e) => {
        if (!locked) return;
        const blocked = ['ArrowDown','ArrowUp','PageDown','PageUp','Space',' ','Home','End'];
        if (blocked.includes(e.key)) preventScroll(e);
    });

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        submitBtn.classList.add('is-firing');
        const target = document.getElementById('dispatch');
        setTimeout(() => {
            locked = false;
            unlocked = true;
            if (submitHint) submitHint.classList.remove('is-locked');
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setTimeout(() => submitBtn.classList.remove('is-firing'), 900);
        }, 380);
    });
}

// Live dispatch — countdown number + agents joining slide-in.
const dispatchEl = document.querySelector('[data-dispatch]');
if (dispatchEl) {
    const countEl = dispatchEl.querySelector('[data-dispatch-count]');
    const seconds = parseInt(dispatchEl.dataset.dispatchStart || '35', 10);
    let current = seconds;
    let dispatchInterval = null;

    const tick = () => {
        current = current <= 1 ? seconds : current - 1;
        if (countEl) countEl.textContent = String(current);
    };

    const dispatchObserver = new IntersectionObserver(
        (entries) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    if (!dispatchInterval) {
                        current = seconds;
                        if (countEl) countEl.textContent = String(current);
                        dispatchInterval = setInterval(tick, 1000);
                    }
                    // re-trigger agent-pop animations on each entry
                    dispatchEl.querySelectorAll('.agent-pop').forEach((a) => {
                        a.style.animation = 'none';
                        // force reflow
                        void a.offsetWidth;
                        a.style.animation = '';
                    });
                } else {
                    if (dispatchInterval) {
                        clearInterval(dispatchInterval);
                        dispatchInterval = null;
                    }
                }
            }
        },
        { threshold: 0.25 }
    );
    dispatchObserver.observe(dispatchEl);
}

// Subtle parallax on hero blobs (very gentle)
const parallaxNodes = document.querySelectorAll('[data-parallax]');
if (parallaxNodes.length) {
    let ticking = false;
    const update = () => {
        const y = window.scrollY;
        parallaxNodes.forEach((n) => {
            const speed = parseFloat(n.dataset.parallax) || 0.15;
            n.style.transform = `translate3d(0, ${y * speed}px, 0)`;
        });
        ticking = false;
    };
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(update);
            ticking = true;
        }
    }, { passive: true });
}

// ---------- FAQ filter chips ----------
const faqChips = document.querySelectorAll('[data-faq-cat]');
const faqItems = document.querySelectorAll('[data-faq-item]');
if (faqChips.length && faqItems.length) {
    faqChips.forEach((chip) => {
        chip.addEventListener('click', () => {
            const cat = chip.getAttribute('data-faq-cat');
            faqChips.forEach((c) => c.classList.toggle('is-active', c === chip));
            faqItems.forEach((item) => {
                const itemCat = item.getAttribute('data-faq-item');
                const show = cat === 'All' || itemCat === cat;
                item.style.display = show ? '' : 'none';
            });
        });
    });
}
