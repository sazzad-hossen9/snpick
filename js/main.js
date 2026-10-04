/**
 * smpick - Main Interactive Engine
 * Handles Theme Toggling (Light/Dark), Search Modal, Reading Progress, 
 * Category Filtering, Newsletter Subscriptions, and Toast Notifications.
 */

(function () {
  'use strict';

  // --- 1. Theme Management (Light & Dark Mode) ---
  const THEME_STORAGE_KEY = 'smpick_user_theme';

  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved) return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);

    // Update all theme toggle icons
    const themeIcons = document.querySelectorAll('.theme-icon');
    themeIcons.forEach(icon => {
      if (theme === 'dark') {
        // Sun icon for switching back to light mode
        icon.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>`;
        icon.setAttribute('aria-label', 'Switch to light mode');
      } else {
        // Moon icon for switching to dark mode
        icon.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>`;
        icon.setAttribute('aria-label', 'Switch to dark mode');
      }
    });
  }

  // Initialize theme early to avoid flicker
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle buttons listener
    const themeToggles = document.querySelectorAll('.theme-toggle-btn');
    themeToggles.forEach(btn => {
      btn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        showToast(next === 'dark' ? 'Dark mode enabled' : 'Light mode enabled');
      });
    });

    // Listen to OS system theme changes
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem(THEME_STORAGE_KEY)) {
          applyTheme(e.matches ? 'dark' : 'light');
        }
      });
    }

    // --- 2. Live Instant Search Modal ---
    const searchModal = document.getElementById('search-modal');
    const searchOpenBtns = document.querySelectorAll('.search-open-btn');
    const searchCloseBtn = document.getElementById('search-close-btn');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    function openSearch() {
      if (!searchModal) return;
      searchModal.classList.add('active');
      if (searchInput) {
        searchInput.value = '';
        renderSearchResults('');
        setTimeout(() => searchInput.focus(), 50);
      }
    }

    function closeSearch() {
      if (!searchModal) return;
      searchModal.classList.remove('active');
    }

    searchOpenBtns.forEach(btn => btn.addEventListener('click', openSearch));
    if (searchCloseBtn) searchCloseBtn.addEventListener('click', closeSearch);

    // Keyboard shortcut: Ctrl+K or Cmd+K to open search, Escape to close
    document.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (searchModal && searchModal.classList.contains('active')) {
          closeSearch();
        } else {
          openSearch();
        }
      } else if (e.key === 'Escape' && searchModal && searchModal.classList.contains('active')) {
        closeSearch();
      }
    });

    if (searchModal) {
      searchModal.addEventListener('click', e => {
        if (e.target === searchModal) closeSearch();
      });
    }

    function renderSearchResults(query) {
      if (!searchResults || typeof SMPICK_STORIES === 'undefined') return;
      const clean = query.trim().toLowerCase();
      const filtered = clean === '' 
        ? SMPICK_STORIES.slice(0, 5) 
        : SMPICK_STORIES.filter(s => 
            s.title.toLowerCase().includes(clean) || 
            s.category.toLowerCase().includes(clean) ||
            s.deck.toLowerCase().includes(clean) ||
            s.author.toLowerCase().includes(clean)
          );

      if (filtered.length === 0) {
        searchResults.innerHTML = `<div style="padding: 20px; text-align: center; color: var(--text-muted); font-size: 0.875rem;">No stories found matching "${query}"</div>`;
        return;
      }

      searchResults.innerHTML = filtered.map(story => `
        <a href="${story.url}" class="search-item">
          <div class="search-item-title">${highlightMatch(story.title, clean)}</div>
          <div class="search-item-meta">${story.category} · ${story.type} · ${story.readTime}</div>
        </a>
      `).join('');
    }

    function highlightMatch(text, query) {
      if (!query) return text;
      const regex = new RegExp(`(${query})`, 'gi');
      return text.replace(regex, `<span style="background-color: var(--accent-orange-subtle); color: var(--accent-orange); font-weight: 800;">$1</span>`);
    }

    if (searchInput) {
      searchInput.addEventListener('input', e => {
        renderSearchResults(e.target.value);
      });
    }

    // --- 3. Category Filter Tabs (Section Page) ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const streamItems = document.querySelectorAll('.stream-item');

    if (filterBtns.length > 0 && streamItems.length > 0) {
      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          filterBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          const filter = btn.getAttribute('data-filter') || 'all';
          streamItems.forEach(item => {
            const itemType = item.getAttribute('data-type') || '';
            if (filter === 'all' || itemType.toLowerCase() === filter.toLowerCase()) {
              item.style.display = 'grid';
            } else {
              item.style.display = 'none';
            }
          });
        });
      });
    }

    // --- 4. Reading Progress Bar (Article Page) ---
    const progressBar = document.getElementById('reading-progress');
    if (progressBar) {
      window.addEventListener('scroll', () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalHeight > 0) {
          const progress = (window.scrollY / totalHeight) * 100;
          progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
        }
      }, { passive: true });
    }

    // --- 5. Article Action Buttons (Copy Link, Bookmark, Share) ---
    const copyLinkBtns = document.querySelectorAll('.btn-copy-link');
    copyLinkBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
          showToast('Article link copied to clipboard!');
        }).catch(() => {
          showToast('Link copied!');
        });
      });
    });

    const bookmarkBtns = document.querySelectorAll('.btn-bookmark');
    bookmarkBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        btn.classList.toggle('active');
        const isBookmarked = btn.classList.contains('active');
        btn.style.color = isBookmarked ? 'var(--accent-orange)' : '';
        showToast(isBookmarked ? 'Saved to reading list' : 'Removed from reading list');
      });
    });

    // --- 6. Newsletter Subscription Handler ---
    const newsletterForms = document.querySelectorAll('.newsletter-form-element');
    newsletterForms.forEach(form => {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const input = form.querySelector('input[type="email"]');
        if (input && input.value.trim() !== '') {
          const email = input.value.trim();
          // Save in mock subscriber list
          const existing = JSON.parse(localStorage.getItem('smpick_subscribers') || '[]');
          if (!existing.includes(email)) existing.push(email);
          localStorage.setItem('smpick_subscribers', JSON.stringify(existing));

          input.value = '';
          showToast('Thank you! You are now subscribed to The Morning Pick.');
        }
      });
    });

    // --- 7. Mobile Navigation Drawer ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobileClose = document.getElementById('mobile-close-btn');

    if (menuToggle && mobileDrawer) {
      menuToggle.addEventListener('click', () => {
        mobileDrawer.classList.toggle('open');
      });
    }
    if (mobileClose && mobileDrawer) {
      mobileClose.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    }

    // --- 7b. Active Navigation Link Sync & Click Transition ---
    const pathSegments = window.location.pathname.split('/');
    const currentFileName = pathSegments[pathSegments.length - 1] || 'index.html';

    const allDesktopNavLinks = document.querySelectorAll('.main-nav .nav-link');
    const allMobileNavLinks = document.querySelectorAll('.mobile-nav-links .mobile-nav-link');

    if (currentFileName && currentFileName !== 'index.html' && currentFileName !== 'about.html') {
      [allDesktopNavLinks, allMobileNavLinks].forEach(linkGroup => {
        linkGroup.forEach(link => {
          const href = link.getAttribute('href');
          if (href === currentFileName) {
            link.classList.add('active');
          } else if (currentFileName !== 'article.html') {
            link.classList.remove('active');
          }
        });
      });
    } else if (currentFileName === 'index.html' || currentFileName === 'about.html') {
      [allDesktopNavLinks, allMobileNavLinks].forEach(linkGroup => {
        linkGroup.forEach(link => link.classList.remove('active'));
      });
    }

    // Immediate active highlight on click
    allDesktopNavLinks.forEach(link => {
      link.addEventListener('click', function () {
        allDesktopNavLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
      });
    });

    // --- 8. Dynamic Date on Top Bar ---
    const liveDateEl = document.getElementById('live-date');
    if (liveDateEl) {
      const now = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      liveDateEl.textContent = now.toLocaleDateString('en-US', options);
    }

    // --- 9. Scroll Reveal Animations (IntersectionObserver) ---
    const revealElements = document.querySelectorAll('.reveal-up');
    if (revealElements.length > 0 && 'IntersectionObserver' in window) {
      const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.05,
        rootMargin: '0px 0px -20px 0px'
      });

      // Immediate check for elements already in view upon load / refresh
      revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          setTimeout(() => el.classList.add('is-revealed'), 60);
        } else {
          revealObserver.observe(el);
        }
      });
    }
  });

  // --- Global Toast Notification Helper ---
  window.showToast = function (message) {
    let toast = document.getElementById('toast-notice');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-notice';
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M20 6L9 17l-5-5"></path>
      </svg>
      <span>${message}</span>
    `;
    toast.classList.add('show');
    clearTimeout(window._toastTimeout);
    window._toastTimeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  };

})();
