/* ==========================================================================
   Career Progression Portal — design concept
   Interaction layer: navigation, menu, FAQ, reveals, accessibility options
   ========================================================================== */
(function () {
  "use strict";

  var root = document.documentElement;
  var body = document.body;
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ------------------------------------------------------------------
     Header: scroll state, active section, back-to-top
  ------------------------------------------------------------------ */
  var header = document.querySelector("[data-header]");
  var backToTop = document.querySelector("[data-back-to-top]");
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".primary-nav__link"));
  var sectionIds = navLinks
    .map(function (link) {
      var href = link.getAttribute("href") || "";
      return href.charAt(0) === "#" ? href.slice(1) : null;
    })
    .filter(Boolean);
  var sections = sectionIds
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);

  var ticking = false;

  function updateOnScroll() {
    var y = window.scrollY || window.pageYOffset;

    if (header) {
      header.classList.toggle("is-scrolled", y > 24);
    }
    if (backToTop) {
      backToTop.classList.toggle("is-visible", y > 720);
    }

    if (sections.length) {
      var current = null;
      var marker = y + Math.min(window.innerHeight * 0.34, 240);

      sections.forEach(function (section) {
        if (section.offsetTop <= marker) current = section.id;
      });

      navLinks.forEach(function (link) {
        var isActive = current && link.getAttribute("href") === "#" + current;
        link.classList.toggle("is-active", Boolean(isActive));
        if (isActive) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    }

    ticking = false;
  }

  function requestUpdate() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(updateOnScroll);
    }
  }

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate, { passive: true });
  updateOnScroll();

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion.matches ? "auto" : "smooth" });
    });
  }

  /* ------------------------------------------------------------------
     Mobile menu
  ------------------------------------------------------------------ */
  var menuToggle = document.querySelector("[data-menu-toggle]");
  var mobileMenu = document.querySelector("[data-mobile-menu]");
  var menuIsOpen = false;
  var lastFocused = null;

  function getMenuFocusable() {
    if (!mobileMenu) return [];
    return Array.prototype.slice.call(
      mobileMenu.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
    ).filter(function (el) { return el.offsetParent !== null; });
  }

  function openMenu() {
    if (!mobileMenu || !menuToggle) return;
    menuIsOpen = true;
    lastFocused = document.activeElement;
    body.classList.add("menu-open");
    mobileMenu.classList.add("is-open");
    mobileMenu.setAttribute("aria-hidden", "false");
    mobileMenu.removeAttribute("inert");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close menu");
    window.setTimeout(function () {
      var focusable = getMenuFocusable();
      if (focusable.length) focusable[0].focus();
    }, 60);
  }

  function closeMenu(restoreFocus) {
    if (!mobileMenu || !menuToggle) return;
    menuIsOpen = false;
    body.classList.remove("menu-open");
    mobileMenu.classList.remove("is-open");
    mobileMenu.setAttribute("aria-hidden", "true");
    mobileMenu.setAttribute("inert", "");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open menu");
    if (restoreFocus !== false) {
      var focusTarget = lastFocused && lastFocused !== document.body ? lastFocused : menuToggle;
      focusTarget.focus();
    }
  }

  if (menuToggle && mobileMenu) {
    mobileMenu.setAttribute("inert", "");
    menuToggle.addEventListener("click", function () {
      if (menuIsOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    mobileMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        closeMenu(false);
      });
    });

    document.addEventListener("keydown", function (event) {
      if (!menuIsOpen) return;

      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }

      if (event.key === "Tab") {
        var focusable = getMenuFocusable();
        if (menuToggle) focusable.unshift(menuToggle);
        if (!focusable.length) return;
        var first = focusable[0];
        var last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 1080 && menuIsOpen) {
        closeMenu(false);
      }
    });
  }

  /* ------------------------------------------------------------------
     FAQ accordion
  ------------------------------------------------------------------ */
  var accordion = document.querySelector("[data-accordion]");

  if (accordion) {
    var items = Array.prototype.slice.call(accordion.querySelectorAll(".accordion__item"));

    function syncPanels() {
      items.forEach(function (item) {
        var panel = item.querySelector(".accordion__panel");
        if (panel) panel.toggleAttribute("inert", !item.classList.contains("is-open"));
      });
    }

    items.forEach(function (item) {
      var trigger = item.querySelector(".accordion__trigger");
      if (!trigger) return;

      trigger.addEventListener("click", function () {
        var isOpen = item.classList.contains("is-open");

        items.forEach(function (other) {
          var otherTrigger = other.querySelector(".accordion__trigger");
          other.classList.remove("is-open");
          if (otherTrigger) otherTrigger.setAttribute("aria-expanded", "false");
        });

        if (!isOpen) {
          item.classList.add("is-open");
          trigger.setAttribute("aria-expanded", "true");
        }

        syncPanels();
      });
    });

    syncPanels();
  }

  /* ------------------------------------------------------------------
     Reveals
  ------------------------------------------------------------------ */
  var revealItems = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));

  function revealAll() {
    revealItems.forEach(function (el) { el.classList.add("is-in"); });
  }

  if (!revealItems.length) {
    // Nothing to do.
  } else if (prefersReducedMotion.matches || root.classList.contains("reduce-motion") || !("IntersectionObserver" in window)) {
    revealAll();
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
    );

    revealItems.forEach(function (el) { revealObserver.observe(el); });
  }

  /* ------------------------------------------------------------------
     Accessibility preferences
  ------------------------------------------------------------------ */
  var STORAGE_KEY = "mha-a11y-prefs";
  var dialog = document.querySelector("[data-a11y-dialog]");
  var openButtons = Array.prototype.slice.call(document.querySelectorAll("[data-a11y-open]"));
  var closeButton = document.querySelector("[data-a11y-close]");
  var sizeButtons = Array.prototype.slice.call(document.querySelectorAll("[data-textsize-btn]"));
  var contrastButton = document.querySelector("[data-toggle-contrast]");
  var motionButton = document.querySelector("[data-toggle-motion]");
  var resetButton = document.querySelector("[data-a11y-reset]");
  var a11yTrigger = null;

  var prefs = {
    textSize: "base",
    contrast: false,
    motion: false
  };

  try {
    var stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "{}");
    if (stored.textSize === "large" || stored.textSize === "xlarge") prefs.textSize = stored.textSize;
    prefs.contrast = Boolean(stored.contrast);
    prefs.motion = Boolean(stored.motion);
  } catch (e) {
    // Storage may be unavailable; defaults are fine.
  }

  function savePrefs() {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch (e) {
      // Preferences still apply for this visit.
    }
  }

  function applyPrefs() {
    root.setAttribute("data-textsize", prefs.textSize);
    root.classList.toggle("contrast-high", prefs.contrast);
    root.classList.toggle("reduce-motion", prefs.motion);

    sizeButtons.forEach(function (button) {
      var active = button.getAttribute("data-textsize-btn") === prefs.textSize;
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });

    if (contrastButton) contrastButton.setAttribute("aria-pressed", prefs.contrast ? "true" : "false");
    if (motionButton) motionButton.setAttribute("aria-pressed", prefs.motion ? "true" : "false");

    if (prefs.motion) revealAll();
  }

  applyPrefs();

  sizeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      var value = button.getAttribute("data-textsize-btn");
      if (value !== "large" && value !== "xlarge") value = "base";
      prefs.textSize = value;
      applyPrefs();
      savePrefs();
    });
  });

  if (contrastButton) {
    contrastButton.addEventListener("click", function () {
      prefs.contrast = !prefs.contrast;
      applyPrefs();
      savePrefs();
    });
  }

  if (motionButton) {
    motionButton.addEventListener("click", function () {
      prefs.motion = !prefs.motion;
      applyPrefs();
      savePrefs();
    });
  }

  if (resetButton) {
    resetButton.addEventListener("click", function () {
      prefs = { textSize: "base", contrast: false, motion: false };
      applyPrefs();
      savePrefs();
    });
  }

  function openDialog() {
    if (!dialog) return;
    if (typeof dialog.showModal === "function") {
      if (!dialog.open) dialog.showModal();
    } else {
      dialog.setAttribute("open", "");
    }
    if (closeButton) {
      window.setTimeout(function () { closeButton.focus(); }, 40);
    }
  }

  function closeDialog() {
    if (!dialog) return;
    if (typeof dialog.close === "function") {
      if (dialog.open) dialog.close();
    } else {
      dialog.removeAttribute("open");
    }
  }

  openButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      a11yTrigger = button;
      openDialog();
    });
  });

  if (closeButton) closeButton.addEventListener("click", closeDialog);

  if (dialog) {
    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) closeDialog();
    });
    dialog.addEventListener("close", function () {
      if (a11yTrigger) {
        a11yTrigger.focus();
      } else if (document.activeElement === document.body && openButtons[0]) {
        openButtons[0].focus();
      }
    });
  }

  /* ------------------------------------------------------------------
     External link safety: add rel when a target is opened in a new tab
  ------------------------------------------------------------------ */
  document.querySelectorAll('a[target="_blank"]').forEach(function (link) {
    var rel = link.getAttribute("rel") || "";
    if (rel.indexOf("noopener") === -1) {
      link.setAttribute("rel", (rel + " noopener").trim());
    }
  });
})();
