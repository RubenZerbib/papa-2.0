const STORAGE_KEYS = {
  posts: "papa2_posts_v3",
  config: "papa2_config_v3",
  filters: "papa2_filters_v3",
  saved: "papa2_saved_v3",
};

const ADMIN_PASSWORD = "Rubenz0306";

const REACTIONS = ["❤️", "🕯️", "🙏", "🤍", "😂", "😢"];
const STORIES = ["Famille", "Enfance", "Fetes", "Voyages", "Voix", "Videos", "Heritage", "Drole"];
const FILTER_CHIPS = ["Tous", "Photos", "Videos", "Audio", "Textes", "Famille", "Enfance", "Voyages", "Fetes", "Heritage"];
const TIMELINE_PERIODS = [
  { key: "enfance", label: "Enfance", text: "Les premiers gestes, les premiers reves." },
  { key: "jeunesse", label: "Jeunesse", text: "Les choix, l'elan, les chemins ouverts." },
  { key: "mariage", label: "Mariage", text: "Une histoire d'amour construite avec patience." },
  { key: "naissance", label: "Naissance des enfants", text: "Une maison pleine de voix et de rires." },
  { key: "voyages", label: "Voyages", text: "Des horizons ouverts et de beaux retours." },
  { key: "famille", label: "Moments en famille", text: "Les tables longues, les photos floues, l'essentiel." },
  { key: "heritage", label: "Heritage", text: "Ce qu'il nous a laisse vit encore en nous." },
];

const DEFAULT_CONFIG = {
  name: "Papa",
  dates: "19 mars 1955 - 13 decembre 2022",
  summary: "Une vie de transmission, de douceur et de force.",
  welcome: "Un mur commun, construit par ceux qui l'aiment.",
  heroPhoto: "",
  musicPath: "assets/music/background.mp3",
  musicData: "",
  musicEnabled: true,
  musicVolume: 0.35,
  locale: "fr",
  accentColor: "#5f84ab",
  qrUrl: "https://rubenzerbib.github.io/papa-2.0/",
  theme: "light",
};

const I18N = {
  fr: {
    lang: { toggle: "FR / עברית" },
    landing: { kicker: "Bienvenue dans les souvenirs de Papa.", enter: "Entrer dans ses souvenirs", share: "Raconter un souvenir" },
    nav: { home: "Accueil", wall: "Mur", timeline: "Timeline", moments: "Moments", book: "Livre vivant" },
    stories: { title: "Stories" },
    search: { placeholder: "Rechercher un souvenir, un lieu, un tag..." },
    sort: { recent: "Plus recents", old: "Plus anciens", loved: "Les plus aimes" },
    filters: { clear: "Effacer les filtres" },
    timeline: { title: "Timeline vivante", subtitle: "Faites glisser pour traverser les grandes periodes de sa vie.", filter: "Voir les souvenirs de cette periode" },
    movement: { title: "Souvenirs en mouvement", subtitle: "Une respiration visuelle qui fait vivre le mur." },
    feed: { title: "Mur des souvenirs" },
    book: { title: "Livre vivant", generate: "Creer une page souvenir" },
    qr: { title: "Scanner le QR code" },
    composer: { title: "Raconter un souvenir", firstname: "Prenom", type: "Type de souvenir", text: "Texte du souvenir", date: "Date approximative", place: "Lieu", period: "Periode", tags: "Tags", localFile: "Fichier local", publish: "Publier sur le mur" },
    admin: { portal: "Portail admin", password: "Mot de passe", invalid: "Mot de passe invalide.", login: "Se connecter", landing: "Landing", musicPath: "Chemin musique", musicFile: "Fichier musique", posts: "Posts", visible: "Visible sur le mur" },
  },
  he: {
    lang: { toggle: "עברית / FR" },
    landing: { kicker: "ברוכים הבאים לזכרונות של אבא.", enter: "להיכנס לזכרונות", share: "לשתף זיכרון" },
    nav: { home: "בית", wall: "קיר", timeline: "ציר זמן", moments: "רגעים", book: "ספר חי" },
    stories: { title: "סטוריז" },
    search: { placeholder: "חיפוש זיכרון, מקום או תגית..." },
    sort: { recent: "החדשים ביותר", old: "הישנים ביותר", loved: "האהובים ביותר" },
    filters: { clear: "נקה מסננים" },
    timeline: { title: "ציר זמן חי", subtitle: "גררו כדי לעבור בין התקופות הגדולות בחייו.", filter: "הצג זכרונות מהתקופה הזו" },
    movement: { title: "זכרונות בתנועה", subtitle: "נשימה ויזואלית שמחייה את הקיר." },
    feed: { title: "קיר הזכרונות" },
    book: { title: "ספר חי", generate: "צור עמוד זיכרון" },
    qr: { title: "סרוק קוד QR" },
    composer: { title: "שיתוף זיכרון", firstname: "שם פרטי", type: "סוג זיכרון", text: "טקסט הזיכרון", date: "תאריך משוער", place: "מקום", period: "תקופה", tags: "תגיות", localFile: "קובץ מקומי", publish: "פרסם על הקיר" },
    admin: { portal: "פורטל ניהול", password: "סיסמה", invalid: "סיסמה שגויה.", login: "התחברות", landing: "דף פתיחה", musicPath: "נתיב מוזיקה", musicFile: "קובץ מוזיקה", posts: "פוסטים", visible: "גלוי על הקיר" },
  },
};

const HEBREW_PERIODS = {
  enfance: { label: "ילדות", text: "הצעדים הראשונים והחלומות הראשונים." },
  jeunesse: { label: "נעורים", text: "בחירות, תנופה ודרכים שנפתחו." },
  mariage: { label: "נישואין", text: "סיפור אהבה שנבנה בסבלנות." },
  naissance: { label: "לידת הילדים", text: "בית מלא קולות וצחוק." },
  voyages: { label: "מסעות", text: "אופקים פתוחים וחזרות יפות הביתה." },
  famille: { label: "רגעים משפחתיים", text: "שולחנות ארוכים, תמונות מטושטשות, והעיקר." },
  heritage: { label: "מורשת", text: "מה שהוא השאיר חי בתוכנו." },
};

const STORY_LABELS_HE = {
  Famille: "משפחה",
  Enfance: "ילדות",
  Fetes: "חגים",
  Voyages: "מסעות",
  Voix: "קול",
  Videos: "וידאו",
  Heritage: "מורשת",
  Drole: "הומור",
};

const CHIP_LABELS_HE = {
  Tous: "הכל",
  Photos: "תמונות",
  Videos: "וידאו",
  Audio: "אודיו",
  Textes: "טקסטים",
  Famille: "משפחה",
  Enfance: "ילדות",
  Voyages: "מסעות",
  Fetes: "חגים",
  Heritage: "מורשת",
};

const state = {
  posts: [],
  config: { ...DEFAULT_CONFIG },
  filters: { search: "", chip: "Tous", story: "", sort: "recent", period: "" },
  saved: new Set(),
  admin: { unlocked: false, clickCount: 0 },
  movement: { idx: 0, paused: false, timer: null },
  audioMissing: false,
  synth: { ctx: null, nodes: [] },
  revealObserver: null,
};

const els = {};

document.addEventListener("DOMContentLoaded", init);

function init() {
  cacheEls();
  hydrateState();
  applyLocale();
  applyTheme();
  applyConfigToUI();
  initAudio();
  bindEvents();
  updateStickyOffsets();
  showSkeletons();

  setTimeout(() => {
    renderStories();
    renderFilterChips();
    renderTimeline();
    renderAll();
    renderMovement();
    drawQrPlaceholder();
    jumpFromHash();
    updateStickyOffsets();
  }, 220);
}

function cacheEls() {
  const ids = [
    "landing", "app", "enter-btn", "open-composer-from-landing", "music-toggle-landing", "music-toggle", "theme-toggle",
    "language-toggle", "language-toggle-landing",
    "open-admin-top",
    "hero-photo", "hero-photo-fallback", "hero-name", "hero-dates", "hero-summary", "hero-welcome", "top-title", "app-title-click",
    "search-input", "sort-select", "filter-chips", "clear-filters", "stories-list", "timeline-range", "timeline-periods", "timeline-focus",
    "timeline-filter-btn", "movement-carousel", "feed", "memory-day", "quick-stats", "book-chapters", "generate-page", "generated-page",
    "qr-canvas", "qr-url", "composer-modal", "composer-form", "composer-file", "composer-preview", "close-composer", "memory-modal", "close-memory-modal", "memory-modal-content", "fab-add", "bottom-add",
    "admin-dot", "bottom-admin", "admin-login-modal", "admin-login-form", "close-admin-login", "admin-login-error", "admin-panel-modal",
    "close-admin-panel", "admin-hero-photo", "admin-name", "admin-dates", "admin-summary", "admin-welcome", "admin-music-path", "admin-accent",
    "admin-music-file", "admin-music-enabled", "admin-music-volume", "admin-play-music", "admin-stop-music",
    "admin-qr-url", "admin-save-config", "admin-post-list", "admin-post-form", "admin-delete-post", "admin-comment-list", "export-json",
    "import-json", "reset-demo", "print-page", "bg-audio",
  ];

  ids.forEach((id) => {
    els[id] = document.getElementById(id);
  });
}

function hydrateState() {
  const loadedPosts = loadJson(STORAGE_KEYS.posts);
  state.posts = Array.isArray(loadedPosts) ? loadedPosts : demoPosts();

  // If prior default demo data is still present, clear it to start from a real empty memorial wall.
  if (looksLikeLegacyDemo(state.posts)) {
    state.posts = [];
  }

  state.config = { ...DEFAULT_CONFIG, ...(loadJson(STORAGE_KEYS.config) || {}) };
  if (state.config.dates === "1956 - 2023") {
    state.config.dates = DEFAULT_CONFIG.dates;
  }
  state.filters = { ...state.filters, ...(loadJson(STORAGE_KEYS.filters) || {}) };
  state.saved = new Set(loadJson(STORAGE_KEYS.saved) || []);
  persistAll();
  syncFilterInputs();
}

function bindEvents() {
  els["enter-btn"].addEventListener("click", () => {
    enterApp();
    requestAnimationFrame(() => scrollToSection("#feed-anchor"));
  });
  els["open-composer-from-landing"].addEventListener("click", () => {
    enterApp();
    openComposer();
  });

  ["music-toggle", "music-toggle-landing"].forEach((id) => {
    els[id].addEventListener("click", toggleMusic);
  });

  els["theme-toggle"].addEventListener("click", () => {
    state.config.theme = state.config.theme === "dark" ? "light" : "dark";
    persistConfig();
    applyTheme();
  });

  ["language-toggle", "language-toggle-landing"].forEach((id) => {
    els[id].addEventListener("click", () => {
      state.config.locale = state.config.locale === "he" ? "fr" : "he";
      persistConfig();
      applyLocale();
      renderAll();
      renderMovement();
      renderStories();
      renderFilterChips();
      drawQrPlaceholder();
      if (state.admin.unlocked) renderAdminPosts();
    });
  });

  els["search-input"].addEventListener("input", (e) => {
    state.filters.search = e.target.value.trim().toLowerCase();
    persistFilters();
    renderFeed();
  });

  els["sort-select"].addEventListener("change", (e) => {
    state.filters.sort = e.target.value;
    persistFilters();
    renderFeed();
  });

  els["clear-filters"].addEventListener("click", () => {
    state.filters = { search: "", chip: "Tous", story: "", sort: "recent", period: "" };
    persistFilters();
    syncFilterInputs();
    renderStories();
    renderFilterChips();
    renderFeed();
  });

  els["timeline-range"].addEventListener("input", renderTimelineFocus);
  els["timeline-filter-btn"].addEventListener("click", () => {
    const idx = Number(els["timeline-range"].value || 0);
    state.filters.period = TIMELINE_PERIODS[idx].key;
    state.filters.story = "";
    state.filters.chip = "Tous";
    persistFilters();
    renderStories();
    renderFilterChips();
    renderFeed();
    scrollToSection("#feed-anchor");
  });

  document.querySelectorAll("[data-scroll]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.scroll;
      if (target) scrollToSection(target);
    });
  });

  els["fab-add"].addEventListener("click", openComposer);
  els["bottom-add"].addEventListener("click", openComposer);
  els["close-composer"].addEventListener("click", () => els["composer-modal"].close());
  els["close-memory-modal"].addEventListener("click", () => els["memory-modal"].close());
  els["composer-file"].addEventListener("change", previewComposer);
  els["composer-form"].addEventListener("submit", submitComposer);

  els["generate-page"].addEventListener("click", generateBookPage);

  els["admin-dot"].addEventListener("click", openAdminLogin);
  els["bottom-admin"].addEventListener("click", openAdminLogin);
  els["open-admin-top"].addEventListener("click", openAdminLogin);
  els["app-title-click"].addEventListener("click", () => {
    state.admin.clickCount += 1;
    if (state.admin.clickCount >= 5) {
      state.admin.clickCount = 0;
      openAdminLogin();
    }
  });

  els["close-admin-login"].addEventListener("click", () => els["admin-login-modal"].close());
  els["admin-login-form"].addEventListener("submit", adminLogin);
  els["close-admin-panel"].addEventListener("click", () => els["admin-panel-modal"].close());

  els["admin-save-config"].addEventListener("click", saveAdminConfig);
  els["admin-post-form"].addEventListener("submit", saveAdminPost);
  els["admin-delete-post"].addEventListener("click", deleteAdminPost);
  els["admin-play-music"].addEventListener("click", () => {
    state.config.musicEnabled = true;
    persistConfig();
    syncMusicButtons();
    tryStartMusic();
  });
  els["admin-stop-music"].addEventListener("click", () => {
    state.config.musicEnabled = false;
    persistConfig();
    syncMusicButtons();
    els["bg-audio"].pause();
    stopSynthFallback();
  });

  els["export-json"].addEventListener("click", exportJson);
  els["import-json"].addEventListener("change", importJson);
  els["reset-demo"].addEventListener("click", resetDemo);
  els["print-page"].addEventListener("click", () => window.print());

  ["click", "keydown", "touchstart"].forEach((evt) => {
    document.addEventListener(evt, () => {
      if (state.config.musicEnabled) tryStartMusic();
    }, { once: true });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && document.activeElement !== els["search-input"]) {
      e.preventDefault();
      els["search-input"].focus();
    }
    if (e.key.toLowerCase() === "n") openComposer();
  });

  window.addEventListener("resize", updateStickyOffsets);
}

function enterApp() {
  els.landing.hidden = true;
  els.app.hidden = false;
  updateStickyOffsets();
  tryStartMusic();
}

function applyConfigToUI() {
  const c = state.config;
  els["hero-name"].textContent = c.name;
  els["hero-dates"].textContent = c.dates;
  els["hero-summary"].textContent = c.summary;
  els["hero-welcome"].textContent = c.welcome;
  if (els["qr-url"]) els["qr-url"].textContent = c.qrUrl;
  els["top-title"].textContent = state.config.locale === "he" ? "מה שהוא השאיר חי בכל אחד מאיתנו." : "Ce qu'il nous a laisse vit encore dans chacun de nous.";

  document.documentElement.style.setProperty("--accent", c.accentColor);

  if (c.heroPhoto) {
    els["hero-photo"].src = c.heroPhoto;
    els["hero-photo"].hidden = false;
    els["hero-photo-fallback"].hidden = true;
  } else {
    els["hero-photo"].hidden = true;
    els["hero-photo-fallback"].hidden = false;
  }

  syncMusicButtons();
}

function applyTheme() {
  document.body.classList.toggle("dark", state.config.theme === "dark");
  els["theme-toggle"].textContent = state.config.theme === "dark" ? "🌙" : "☀️";
}

function t(key) {
  const lang = state.config.locale === "he" ? "he" : "fr";
  const value = key.split(".").reduce((acc, part) => (acc ? acc[part] : undefined), I18N[lang]);
  return typeof value === "string" ? value : key;
}

function applyLocale() {
  const isHe = state.config.locale === "he";
  document.documentElement.lang = isHe ? "he" : "fr";
  document.documentElement.dir = isHe ? "rtl" : "ltr";
  document.body.classList.toggle("rtl", isHe);

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (key) el.textContent = t(key);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    if (key) el.setAttribute("placeholder", t(key));
  });
}

function initAudio() {
  const audio = els["bg-audio"];
  state.audioMissing = false;
  audio.src = state.config.musicData || state.config.musicPath || DEFAULT_CONFIG.musicPath;
  audio.volume = Number(state.config.musicVolume ?? DEFAULT_CONFIG.musicVolume);
  audio.addEventListener("error", () => {
    state.audioMissing = true;
    console.info("Papa 2.0: fichier musique introuvable (%s)", audio.src);
  });
}

function toggleMusic() {
  state.config.musicEnabled = !state.config.musicEnabled;
  persistConfig();
  syncMusicButtons();
  if (state.config.musicEnabled) {
    tryStartMusic();
  } else {
    els["bg-audio"].pause();
    stopSynthFallback();
  }
}

function syncMusicButtons() {
  const icon = state.config.musicEnabled ? "🔊" : "🔇";
  els["music-toggle"].textContent = icon;
  els["music-toggle-landing"].textContent = icon;
}

function tryStartMusic() {
  if (!state.config.musicEnabled) return;

  if (state.audioMissing) {
    startSynthFallback();
    return;
  }

  els["bg-audio"].play().catch(() => {
    // Keep silent until a valid user gesture or fallback if file is missing.
  });
}

function renderAll() {
  renderMemoryDay();
  renderQuickStats();
  renderFeed();
  renderBook();
  renderTimelineFocus();
  setupRevealAnimations();
}

function renderStories() {
  els["stories-list"].innerHTML = STORIES.map((s) => {
    const active = state.filters.story === s.toLowerCase();
    return `<button class="story ${active ? "active" : ""}" data-story="${s.toLowerCase()}">
      <span class="story-ring"></span>
      <span>${escapeHtml(state.config.locale === "he" ? (STORY_LABELS_HE[s] || s) : s)}</span>
    </button>`;
  }).join("");

  els["stories-list"].querySelectorAll(".story").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.filters.story = btn.dataset.story;
      state.filters.chip = "Tous";
      state.filters.period = "";
      persistFilters();
      renderStories();
      renderFilterChips();
      renderFeed();
      scrollToSection("#feed-anchor");
    });
  });
}

function renderFilterChips() {
  els["filter-chips"].innerHTML = FILTER_CHIPS.map((chip) => {
    const active = state.filters.chip === chip;
    const label = state.config.locale === "he" ? (CHIP_LABELS_HE[chip] || chip) : chip;
    return `<button class="chip ${active ? "active" : ""}" data-chip="${chip}">${escapeHtml(label)}</button>`;
  }).join("");

  els["filter-chips"].querySelectorAll(".chip").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.filters.chip = btn.dataset.chip;
      state.filters.story = "";
      state.filters.period = "";
      persistFilters();
      renderStories();
      renderFilterChips();
      renderFeed();
    });
  });
}

function renderTimeline() {
  els["timeline-range"].max = String(TIMELINE_PERIODS.length - 1);
  renderTimelineFocus();
}

function renderTimelineFocus() {
  const idx = Number(els["timeline-range"].value || 0);
  const period = TIMELINE_PERIODS[idx];
  const periodLabel = state.config.locale === "he" ? (HEBREW_PERIODS[period.key]?.label || period.label) : period.label;
  const periodText = state.config.locale === "he" ? (HEBREW_PERIODS[period.key]?.text || period.text) : period.text;
  els["timeline-periods"].innerHTML = TIMELINE_PERIODS.map((p, i) => {
    const label = state.config.locale === "he" ? (HEBREW_PERIODS[p.key]?.label || p.label) : p.label;
    return `<span class="timeline-pill ${i === idx ? "active" : ""}">${escapeHtml(label)}</span>`;
  }).join("");
  const samples = state.posts.filter((post) => matchPeriod(post, period.key)).slice(0, 3);

  els["timeline-focus"].innerHTML = `
    <h4>${escapeHtml(periodLabel)}</h4>
    <p>${escapeHtml(periodText)}</p>
    <div class="timeline-samples">
      ${samples.length ? samples.map((s) => `<article><strong>${escapeHtml(s.dateLabel)}</strong><p>${escapeHtml(truncate(s.caption, 94))}</p></article>`).join("") : `<p>${escapeHtml(state.config.locale === "he" ? "אין עדיין זיכרונות לתקופה הזו." : "Aucun souvenir associe pour cette periode.")}</p>`}
    </div>
  `;
}

function renderMemoryDay() {
  if (!state.posts.length) {
    els["memory-day"].innerHTML = `
      <h3>${escapeHtml(state.config.locale === "he" ? "זיכרון היום" : "Souvenir du jour")}</h3>
      <p>${escapeHtml(state.config.locale === "he" ? "הקיר מוכן לקבל את הזיכרון הראשון." : "Le mur est pret a accueillir son premier souvenir.")}</p>
      <button id="jump-memory" class="btn btn-soft btn-sm">${escapeHtml(state.config.locale === "he" ? "להוסיף זיכרון" : "Ajouter un souvenir")}</button>
    `;

    document.getElementById("jump-memory").addEventListener("click", openComposer);
    return;
  }

  const date = new Date().toISOString().slice(0, 10);
  const post = state.posts[hash(date) % state.posts.length];
  els["memory-day"].innerHTML = `
    <h3>${escapeHtml(state.config.locale === "he" ? "זיכרון היום" : "Souvenir du jour")}</h3>
    <p><strong>${escapeHtml(post.contributor)}</strong> - ${escapeHtml(post.dateLabel)}</p>
    <p>${escapeHtml(truncate(post.caption, 120))}</p>
    <button id="jump-memory" class="btn btn-soft btn-sm">${escapeHtml(state.config.locale === "he" ? "לצפות בזיכרון" : "Voir ce souvenir")}</button>
  `;

  document.getElementById("jump-memory").addEventListener("click", () => {
    scrollToSection("#feed-anchor");
    document.getElementById(`post-${post.id}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}

function renderQuickStats() {
  const locations = new Set(state.posts.map((p) => p.location).filter(Boolean)).size;
  const contributors = new Set(state.posts.map((p) => p.contributor).filter(Boolean)).size;
  const comments = state.posts.reduce((acc, p) => acc + p.comments.length, 0);
  const likes = state.posts.reduce((acc, p) => acc + reactionTotal(p), 0);

  const labels = state.config.locale === "he"
    ? { memories: "זכרונות", contributors: "משתתפים", places: "מקומות", interactions: "אינטראקציות" }
    : { memories: "Souvenirs", contributors: "Contributeurs", places: "Lieux", interactions: "Interactions" };

  els["quick-stats"].innerHTML = `
    <article><h4>${state.posts.length}</h4><p>${labels.memories}</p></article>
    <article><h4>${contributors}</h4><p>${labels.contributors}</p></article>
    <article><h4>${locations}</h4><p>${labels.places}</p></article>
    <article><h4>${comments + likes}</h4><p>${labels.interactions}</p></article>
  `;
}

function getFilteredPosts() {
  const typeMap = {
    Photos: ["photo"],
    Videos: ["video"],
    Audio: ["audio"],
    Textes: ["text"],
  };

  let list = state.posts.filter((p) => p.moderated !== false);

  if (state.filters.search) {
    const q = state.filters.search;
    list = list.filter((p) => [p.caption, p.contributor, p.location, p.period, ...(p.tags || [])].join(" ").toLowerCase().includes(q));
  }

  if (state.filters.story) {
    list = list.filter((p) => (p.tags || []).some((t) => t.includes(state.filters.story)) || p.type.includes(state.filters.story));
  }

  if (state.filters.period) {
    list = list.filter((p) => matchPeriod(p, state.filters.period));
  }

  if (state.filters.chip !== "Tous") {
    if (typeMap[state.filters.chip]) list = list.filter((p) => typeMap[state.filters.chip].includes(p.type));
    else list = list.filter((p) => (p.tags || []).includes(state.filters.chip.toLowerCase()));
  }

  if (state.filters.sort === "recent") list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  if (state.filters.sort === "old") list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  if (state.filters.sort === "loved") list.sort((a, b) => reactionTotal(b) - reactionTotal(a));

  list.sort((a, b) => (a.pinned === b.pinned ? 0 : a.pinned ? -1 : 1));
  return list;
}

function renderFeed() {
  const posts = getFilteredPosts();
  if (!posts.length) {
    const msg = state.config.locale === "he"
      ? "אין עדיין זכרונות. לחצו על + כדי לשתף את הזיכרון הראשון."
      : "Aucun souvenir pour l'instant. Cliquez sur + pour raconter le premier souvenir.";
    els.feed.innerHTML = `<article class="post empty">${escapeHtml(msg)}</article>`;
    return;
  }
  els.feed.innerHTML = posts.map(renderPost).join("");
  posts.forEach(bindPostEvents);
  setupRevealAnimations();
}

function renderPost(post) {
  const media = post.media[0] || { type: "text", title: "Souvenir", url: "", placeholder: true };
  const comments = post.comments.slice(-2);
  const saved = state.saved.has(post.id);

  return `
    <article class="post" id="post-${post.id}">
      <header class="post-head">
        <div class="author">
          <span class="avatar">${escapeHtml((post.contributor || "F").slice(0, 1).toUpperCase())}</span>
          <div>
            <strong>${escapeHtml(post.contributor || "Famille")}</strong>
            <p>${escapeHtml(post.dateLabel)}${post.location ? ` • ${escapeHtml(post.location)}` : ""}</p>
          </div>
        </div>
        ${post.pinned ? '<span class="pill">Epingle</span>' : ""}
      </header>

      <div class="post-media ${escapeAttr(media.type)}">${mediaMarkup(media)}</div>

      <div class="post-body">
        <p class="caption">${escapeHtml(post.caption)}</p>
        <div class="tags">${post.tags.map((tag) => `<span>#${escapeHtml(tag)}</span>`).join("")}</div>

        <div class="reactions-row">
          ${REACTIONS.map((r) => `<button class="reaction-btn" data-react-post="${post.id}" data-r="${r}">${r} <span>${post.reactions[r] || 0}</span></button>`).join("")}
        </div>

        <div class="actions-row">
          <button class="post-action" data-open-memory="${post.id}">${state.config.locale === "he" ? "פתח" : "Ouvrir"}</button>
          <button class="post-action" data-share="${post.id}">Partager</button>
          <button class="post-action" data-save="${post.id}">${saved ? "Enregistre" : "Enregistrer"}</button>
        </div>

        <div class="comments">
          ${comments.map((c) => `<p><strong>${escapeHtml(c.name)}</strong> ${escapeHtml(c.text)}</p>`).join("")}
          <form class="comment-form" data-comment-form="${post.id}">
            <input name="name" type="text" placeholder="Prenom (optionnel)" maxlength="24" />
            <input name="comment" type="text" required placeholder="Ecrire un commentaire..." />
            <button class="btn btn-soft btn-sm" type="submit">Publier</button>
          </form>
        </div>
      </div>
    </article>
  `;
}

function mediaMarkup(media) {
  if (media.url) {
    if (media.type === "photo") return `<img src="${media.url}" alt="Media souvenir" />`;
    if (media.type === "video") return `<video src="${media.url}" controls playsinline></video>`;
    if (media.type === "audio") return `<audio src="${media.url}" controls></audio>`;
  }

  if (media.type === "video") return `<div class="placeholder"><span class="play">▶</span><strong>${escapeHtml(media.title)}</strong></div>`;
  if (media.type === "audio") return `<div class="placeholder"><div class="wave"><span></span><span></span><span></span><span></span></div><strong>${escapeHtml(media.title)}</strong></div>`;
  return `<div class="placeholder"><strong>${escapeHtml(media.title)}</strong></div>`;
}

function bindPostEvents(post) {
  const card = document.getElementById(`post-${post.id}`);
  if (!card) return;

  const open = card.querySelector(`[data-open-memory="${post.id}"]`);
  open?.addEventListener("click", () => {
    openMemoryModal(post.id);
  });

  card.querySelectorAll(`[data-react-post="${post.id}"]`).forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.r;
      post.reactions[key] = (post.reactions[key] || 0) + 1;
      persistPosts();
      btn.classList.add("liked");
      setTimeout(() => btn.classList.remove("liked"), 360);
      renderFeed();
      renderQuickStats();
    });
  });

  const share = card.querySelector(`[data-share="${post.id}"]`);
  share?.addEventListener("click", async () => {
    const url = `${window.location.href.split("#")[0]}#post-${post.id}`;
    try {
      await navigator.clipboard.writeText(url);
      share.textContent = "Lien copie";
      setTimeout(() => (share.textContent = "Partager"), 1200);
    } catch {
      window.prompt("Copiez ce lien:", url);
    }
  });

  const save = card.querySelector(`[data-save="${post.id}"]`);
  save?.addEventListener("click", () => {
    if (state.saved.has(post.id)) state.saved.delete(post.id);
    else state.saved.add(post.id);
    persistSaved();
    renderFeed();
  });

  const form = card.querySelector(`[data-comment-form="${post.id}"]`);
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const text = String(fd.get("comment") || "").trim();
    if (!text) return;
    const name = String(fd.get("name") || "").trim() || "Famille";
    post.comments.push({ id: uid("c"), name, text, createdAt: Date.now() });
    persistPosts();
    renderFeed();
    renderQuickStats();
    if (state.admin.unlocked) renderAdminComments();
  });
}

function openMemoryModal(postId) {
  const post = state.posts.find((p) => p.id === postId);
  if (!post) return;

  const media = post.media[0] || { type: "text", title: "Souvenir", url: "", placeholder: true };
  const comments = post.comments || [];
  const likeLabel = state.config.locale === "he" ? "לייק" : "Liker";
  const commentPlaceholder = state.config.locale === "he" ? "כתבו תגובה..." : "Ecrire un commentaire...";
  const publishLabel = state.config.locale === "he" ? "פרסום" : "Publier";
  const namePlaceholder = state.config.locale === "he" ? "שם פרטי (אופציונלי)" : "Prenom (optionnel)";
  const contributorFallback = state.config.locale === "he" ? "משפחה" : "Famille";

  els["memory-modal"].dataset.postId = post.id;
  els["memory-modal-content"].innerHTML = `
    <article class="memory-detail">
      <header class="post-head">
        <div class="author">
          <span class="avatar">${escapeHtml((post.contributor || "F").slice(0, 1).toUpperCase())}</span>
          <div>
            <strong>${escapeHtml(post.contributor || contributorFallback)}</strong>
            <p>${escapeHtml(post.dateLabel)}${post.location ? ` • ${escapeHtml(post.location)}` : ""}</p>
          </div>
        </div>
      </header>

      <div class="post-media ${escapeAttr(media.type)}">${mediaMarkup(media)}</div>

      <div class="post-body">
        <p class="caption">${escapeHtml(post.caption)}</p>
        <div class="tags">${post.tags.map((tag) => `<span>#${escapeHtml(tag)}</span>`).join("")}</div>

        <div class="actions-row">
          <button class="post-action" data-modal-like="${post.id}">❤️ ${likeLabel}</button>
          <button class="post-action" data-share="${post.id}">Partager</button>
        </div>

        <div class="reactions-row">
          ${REACTIONS.map((r) => `<button class="reaction-btn" data-modal-react="${post.id}" data-r="${r}">${r} <span>${post.reactions[r] || 0}</span></button>`).join("")}
        </div>

        <div class="comments">
          ${comments.map((c) => `<p><strong>${escapeHtml(c.name)}</strong> ${escapeHtml(c.text)}</p>`).join("")}
          <form class="comment-form" data-modal-comment-form="${post.id}">
            <input name="name" type="text" placeholder="${escapeAttr(namePlaceholder)}" maxlength="24" />
            <input name="comment" type="text" required placeholder="${escapeAttr(commentPlaceholder)}" />
            <button class="btn btn-soft btn-sm" type="submit">${escapeHtml(publishLabel)}</button>
          </form>
          <div class="emoji-picker" data-emoji-for="${post.id}">
            ${REACTIONS.map((emoji) => `<button class="emoji-btn" type="button" data-add-emoji="${post.id}" data-emoji="${emoji}">${emoji}</button>`).join("")}
          </div>
        </div>
      </div>
    </article>
  `;

  bindMemoryModalEvents(post);
  if (!els["memory-modal"].open) els["memory-modal"].showModal();
}

function bindMemoryModalEvents(post) {
  const like = els["memory-modal-content"].querySelector(`[data-modal-like="${post.id}"]`);
  like?.addEventListener("click", () => {
    post.reactions["❤️"] = (post.reactions["❤️"] || 0) + 1;
    persistPosts();
    renderFeed();
    renderQuickStats();
    openMemoryModal(post.id);
    if (state.admin.unlocked) renderAdminPosts();
  });

  els["memory-modal-content"].querySelectorAll(`[data-modal-react="${post.id}"]`).forEach((btn) => {
    btn.addEventListener("click", () => {
      const key = btn.dataset.r;
      post.reactions[key] = (post.reactions[key] || 0) + 1;
      persistPosts();
      renderFeed();
      renderQuickStats();
      openMemoryModal(post.id);
      if (state.admin.unlocked) renderAdminPosts();
    });
  });

  const form = els["memory-modal-content"].querySelector(`[data-modal-comment-form="${post.id}"]`);
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const text = String(fd.get("comment") || "").trim();
    if (!text) return;
    const name = String(fd.get("name") || "").trim() || (state.config.locale === "he" ? "משפחה" : "Famille");
    post.comments.push({ id: uid("c"), name, text, createdAt: Date.now() });
    persistPosts();
    renderFeed();
    renderQuickStats();
    openMemoryModal(post.id);
    if (state.admin.unlocked) renderAdminComments();
  });

  els["memory-modal-content"].querySelectorAll(`[data-add-emoji="${post.id}"]`).forEach((btn) => {
    btn.addEventListener("click", () => {
      const input = form?.querySelector('input[name="comment"]');
      if (!input) return;
      input.value = `${input.value}${btn.dataset.emoji || ""}`;
      input.focus();
    });
  });

  const share = els["memory-modal-content"].querySelector(`[data-share="${post.id}"]`);
  share?.addEventListener("click", async () => {
    const url = `${window.location.href.split("#")[0]}#post-${post.id}`;
    try {
      await navigator.clipboard.writeText(url);
      share.textContent = state.config.locale === "he" ? "הועתק" : "Lien copie";
      setTimeout(() => {
        share.textContent = "Partager";
      }, 1200);
    } catch {
      window.prompt(state.config.locale === "he" ? "העתיקו את הקישור:" : "Copiez ce lien:", url);
    }
  });
}

function openComposer() {
  enterApp();
  if (!els["composer-modal"].open) els["composer-modal"].showModal();
}

function previewComposer() {
  const file = els["composer-file"].files?.[0];
  if (!file) {
    els["composer-preview"].innerHTML = "";
    return;
  }

  const url = URL.createObjectURL(file);
  if (file.type.startsWith("image/")) els["composer-preview"].innerHTML = `<img src="${url}" alt="Apercu" />`;
  else if (file.type.startsWith("video/")) els["composer-preview"].innerHTML = `<video src="${url}" controls></video>`;
  else if (file.type.startsWith("audio/")) els["composer-preview"].innerHTML = `<audio src="${url}" controls></audio>`;
  else els["composer-preview"].textContent = "Fichier selectionne";
}

async function submitComposer(e) {
  e.preventDefault();
  const fd = new FormData(els["composer-form"]);
  const file = els["composer-file"].files?.[0];
  const chosenType = String(fd.get("type") || "text");

  let media = [{ type: chosenType, title: "Souvenir", url: "", placeholder: true }];
  if (file) {
    const url = await fileToDataUrl(file, 280000);
    const inferredType = file.type.startsWith("image/") ? "photo" : file.type.startsWith("video/") ? "video" : file.type.startsWith("audio/") ? "audio" : chosenType;
    media = [{ type: inferredType, title: file.name, url, placeholder: !url }];
  }

  const post = {
    id: uid("p"),
    contributor: String(fd.get("contributor") || "").trim() || "Famille",
    avatar: "",
    type: chosenType,
    caption: String(fd.get("caption") || "").trim(),
    dateLabel: String(fd.get("dateLabel") || "").trim() || "Souvenir recent",
    createdAt: new Date().toISOString(),
    location: String(fd.get("location") || "").trim(),
    period: String(fd.get("period") || "").trim().toLowerCase(),
    tags: String(fd.get("tags") || "").split(",").map((t) => t.trim().toLowerCase()).filter(Boolean),
    media,
    reactions: Object.fromEntries(REACTIONS.map((r) => [r, 0])),
    comments: [],
    pinned: false,
    moderated: true,
  };

  state.posts.unshift(post);
  persistPosts();
  els["composer-form"].reset();
  els["composer-preview"].innerHTML = "";
  els["composer-modal"].close();
  renderAll();
  renderMovement();
}

function renderMovement() {
  const items = state.posts.slice(0, 8);
  if (!items.length) {
    if (state.movement.timer) {
      clearInterval(state.movement.timer);
      state.movement.timer = null;
    }
    const title = state.config.locale === "he" ? "זכרונות בתנועה" : "Souvenirs en mouvement";
    const text = state.config.locale === "he" ? "הוסיפו זכרונות כדי להחיות את החלק הזה." : "Ajoutez des souvenirs pour faire vivre cette section.";
    els["movement-carousel"].innerHTML = `<article class="move-card" style="--pos:0"><h4>${escapeHtml(title)}</h4><p>${escapeHtml(text)}</p></article>`;
    return;
  }

  paintMovement(items);
  if (state.movement.timer) clearInterval(state.movement.timer);

  state.movement.timer = setInterval(() => {
    if (!state.movement.paused) {
      state.movement.idx = (state.movement.idx + 1) % items.length;
      paintMovement(items);
    }
  }, 3400);

  const root = els["movement-carousel"];
  root.onmouseenter = () => {
    state.movement.paused = true;
  };
  root.onmouseleave = () => {
    state.movement.paused = false;
  };

  let startX = 0;
  root.ontouchstart = (e) => {
    startX = e.changedTouches[0].clientX;
  };
  root.ontouchend = (e) => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) < 32) return;
    state.movement.idx = (state.movement.idx + (dx < 0 ? 1 : -1) + items.length) % items.length;
    paintMovement(items);
  };
}

function paintMovement(items) {
  const len = items.length;
  els["movement-carousel"].innerHTML = items.map((post, i) => {
    const rel = ((i - state.movement.idx + len) % len + len) % len;
    const pos = rel > len / 2 ? rel - len : rel;
    if (Math.abs(pos) > 2) return "";
    return `<article class="move-card" style="--pos:${pos}"><h4>${escapeHtml(post.contributor)}</h4><p>${escapeHtml(truncate(post.caption, 78))}</p></article>`;
  }).join("");
}

function renderBook() {
  const chapters = [
    { title: "Chapitre 1 : Ses debuts", tags: ["enfance", "jeunesse"] },
    { title: "Chapitre 2 : La famille", tags: ["famille", "mariage", "enfants"] },
    { title: "Chapitre 3 : Les moments simples", tags: ["fetes", "voyages", "drole", "cuisine"] },
    { title: "Chapitre 4 : Ce qu'il nous a laisse", tags: ["heritage", "valeurs", "voix"] },
  ];

  els["book-chapters"].innerHTML = chapters.map((c) => {
    const rows = state.posts.filter((p) => p.tags.some((t) => c.tags.includes(t))).slice(0, 3);
    return `<article class="chapter"><h4>${escapeHtml(c.title)}</h4>${rows.length ? `<ul>${rows.map((r) => `<li>${escapeHtml(r.dateLabel)} - ${escapeHtml(truncate(r.caption, 92))}</li>`).join("")}</ul>` : "<p>Aucun souvenir pour ce chapitre.</p>"}</article>`;
  }).join("");
}

function generateBookPage() {
  const picks = getFilteredPosts().slice(0, 5);
  const localeCode = state.config.locale === "he" ? "he-IL" : "fr-FR";
  const dateLabel = new Date().toLocaleDateString(localeCode, { dateStyle: "long" });
  els["generated-page"].hidden = false;
  els["generated-page"].innerHTML = `
    <h4>Page souvenir - ${escapeHtml(dateLabel)}</h4>
    <p>Resume imprime localement depuis vos souvenirs.</p>
    ${picks.map((p) => `<article><h5>${escapeHtml(p.dateLabel)} - ${escapeHtml(p.contributor)}</h5><p>${escapeHtml(p.caption)}</p></article>`).join("")}
  `;
  els["generated-page"].scrollIntoView({ behavior: "smooth", block: "start" });
}

function openAdminLogin() {
  els["admin-login-error"].hidden = true;
  els["admin-login-form"].reset();
  if (!els["admin-login-modal"].open) els["admin-login-modal"].showModal();
}

function adminLogin(e) {
  e.preventDefault();
  const fd = new FormData(els["admin-login-form"]);
  const pass = String(fd.get("password") || "");
  if (pass !== ADMIN_PASSWORD) {
    els["admin-login-error"].hidden = false;
    return;
  }

  state.admin.unlocked = true;
  els["admin-login-modal"].close();
  openAdminPanel();
}

function openAdminPanel() {
  fillAdminFields();
  renderAdminPosts();
  renderAdminComments();
  if (!els["admin-panel-modal"].open) els["admin-panel-modal"].showModal();
}

function fillAdminFields() {
  els["admin-name"].value = state.config.name;
  els["admin-dates"].value = state.config.dates;
  els["admin-summary"].value = state.config.summary;
  els["admin-welcome"].value = state.config.welcome;
  els["admin-music-path"].value = state.config.musicPath;
  els["admin-music-file"].value = "";
  els["admin-music-enabled"].checked = Boolean(state.config.musicEnabled);
  els["admin-music-volume"].value = String(Number(state.config.musicVolume ?? DEFAULT_CONFIG.musicVolume));
  els["admin-accent"].value = toHex(state.config.accentColor);
  els["admin-qr-url"].value = state.config.qrUrl;
}

async function saveAdminConfig() {
  state.config.name = els["admin-name"].value.trim() || "Papa";
  state.config.dates = els["admin-dates"].value.trim();
  state.config.summary = els["admin-summary"].value.trim();
  state.config.welcome = els["admin-welcome"].value.trim();
  state.config.musicPath = els["admin-music-path"].value.trim() || DEFAULT_CONFIG.musicPath;
  state.config.musicEnabled = Boolean(els["admin-music-enabled"].checked);
  state.config.musicVolume = Number(els["admin-music-volume"].value || DEFAULT_CONFIG.musicVolume);
  state.config.accentColor = els["admin-accent"].value;
  state.config.qrUrl = els["admin-qr-url"].value.trim() || DEFAULT_CONFIG.qrUrl;

  const file = els["admin-hero-photo"].files?.[0];
  if (file) state.config.heroPhoto = await fileToDataUrl(file, 300000);

  const musicFile = els["admin-music-file"].files?.[0];
  if (musicFile) {
    const dataUrl = await fileToDataUrl(musicFile, 7000000);
    if (dataUrl) state.config.musicData = dataUrl;
  }

  persistConfig();
  applyConfigToUI();
  initAudio();
  if (state.config.musicEnabled) {
    tryStartMusic();
  } else {
    els["bg-audio"].pause();
    stopSynthFallback();
  }
  drawQrPlaceholder();
}

function renderAdminPosts() {
  const pending = state.posts.filter((p) => p.moderated === false).length;
  const pendingTitle = state.config.locale === "he" ? `ממתינים לאישור: ${pending}` : `En attente de moderation: ${pending}`;
  const pendingInfo = state.config.locale === "he" ? "פרסמו או הסתירו כל זיכרון." : "Publiez ou masquez chaque souvenir.";
  els["admin-post-list"].innerHTML = `
    <article class="admin-item"><strong>${escapeHtml(pendingTitle)}</strong><small>${escapeHtml(pendingInfo)}</small></article>
    ${state.posts.map((p) => `<button class="admin-item" data-post-id="${p.id}">${escapeHtml(p.dateLabel)} - ${escapeHtml(truncate(p.caption, 46))}<small>${p.moderated === false ? (state.config.locale === "he" ? "מוסתר מהקיר" : "Masque du mur") : (state.config.locale === "he" ? "גלוי על הקיר" : "Visible sur le mur")}</small></button>`).join("")}
  `;

  els["admin-post-list"].querySelectorAll("[data-post-id]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const post = state.posts.find((p) => p.id === btn.dataset.postId);
      if (!post) return;
      const f = els["admin-post-form"].elements;
      f.id.value = post.id;
      f.contributor.value = post.contributor;
      f.caption.value = post.caption;
      f.dateLabel.value = post.dateLabel;
      f.location.value = post.location;
      f.period.value = post.period;
      f.tags.value = post.tags.join(", ");
      f.pinned.checked = post.pinned;
      f.moderated.checked = post.moderated !== false;
    });
  });
}

function saveAdminPost(e) {
  e.preventDefault();
  const f = els["admin-post-form"].elements;
  const post = state.posts.find((p) => p.id === f.id.value);
  if (!post) return;

  post.contributor = f.contributor.value.trim() || "Famille";
  post.caption = f.caption.value.trim();
  post.dateLabel = f.dateLabel.value.trim();
  post.location = f.location.value.trim();
  post.period = f.period.value.trim().toLowerCase();
  post.tags = f.tags.value.split(",").map((t) => t.trim().toLowerCase()).filter(Boolean);
  post.pinned = f.pinned.checked;
  post.moderated = f.moderated.checked;

  persistPosts();
  renderAll();
  renderMovement();
  renderAdminPosts();
}

function deleteAdminPost() {
  const id = els["admin-post-form"].elements.id.value;
  if (!id) return;
  state.posts = state.posts.filter((p) => p.id !== id);
  persistPosts();
  els["admin-post-form"].reset();
  renderAll();
  renderMovement();
  renderAdminPosts();
  renderAdminComments();
}

function renderAdminComments() {
  const rows = [];
  state.posts.forEach((p) => {
    p.comments.forEach((c) => rows.push({ postId: p.id, commentId: c.id, postDate: p.dateLabel, name: c.name, text: c.text }));
  });

  els["admin-comment-list"].innerHTML = rows.map((r) => `
    <article class="admin-comment">
      <p><strong>${escapeHtml(r.name)}</strong> · ${escapeHtml(r.postDate)}</p>
      <p>${escapeHtml(truncate(r.text, 94))}</p>
      <div class="admin-actions">
        <button class="btn btn-soft btn-sm" data-edit-comment="${r.commentId}" data-post="${r.postId}">Modifier</button>
        <button class="btn btn-soft btn-sm danger" data-delete-comment="${r.commentId}" data-post="${r.postId}">Supprimer</button>
      </div>
    </article>
  `).join("");

  els["admin-comment-list"].querySelectorAll("[data-edit-comment]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const post = state.posts.find((p) => p.id === btn.dataset.post);
      if (!post) return;
      const comment = post.comments.find((c) => c.id === btn.dataset.editComment);
      if (!comment) return;
      const next = window.prompt("Modifier le commentaire:", comment.text);
      if (next === null) return;
      comment.text = next.trim();
      persistPosts();
      renderFeed();
      renderQuickStats();
      renderAdminComments();
    });
  });

  els["admin-comment-list"].querySelectorAll("[data-delete-comment]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const post = state.posts.find((p) => p.id === btn.dataset.post);
      if (!post) return;
      post.comments = post.comments.filter((c) => c.id !== btn.dataset.deleteComment);
      persistPosts();
      renderFeed();
      renderQuickStats();
      renderAdminComments();
    });
  });
}

function exportJson() {
  const data = {
    exportedAt: new Date().toISOString(),
    config: state.config,
    posts: state.posts,
    filters: state.filters,
    saved: Array.from(state.saved),
  };
  download("papa2-data.json", JSON.stringify(data, null, 2), "application/json");
}

function importJson(e) {
  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result || "{}"));
      if (!Array.isArray(parsed.posts)) throw new Error("invalid");
      state.posts = parsed.posts;
      state.posts.forEach((p) => {
        if (typeof p.moderated === "undefined") p.moderated = true;
      });
      state.config = { ...DEFAULT_CONFIG, ...(parsed.config || {}) };
      if (!state.config.locale) state.config.locale = "fr";
      state.filters = { ...state.filters, ...(parsed.filters || {}) };
      state.saved = new Set(parsed.saved || []);
      persistAll();
      syncFilterInputs();
      applyLocale();
      applyTheme();
      applyConfigToUI();
      initAudio();
      renderStories();
      renderFilterChips();
      renderTimelineFocus();
      renderAll();
      renderMovement();
      drawQrPlaceholder();
      if (state.admin.unlocked) {
        fillAdminFields();
        renderAdminPosts();
        renderAdminComments();
      }
    } catch {
      window.alert("Import JSON invalide.");
    }
  };

  reader.readAsText(file);
  e.target.value = "";
}

function resetDemo() {
  state.posts = [];
  state.config = { ...DEFAULT_CONFIG };
  state.filters = { search: "", chip: "Tous", story: "", sort: "recent", period: "" };
  state.saved = new Set();
  persistAll();
  syncFilterInputs();
  applyLocale();
  applyTheme();
  applyConfigToUI();
  initAudio();
  renderStories();
  renderFilterChips();
  renderTimelineFocus();
  renderAll();
  renderMovement();
  drawQrPlaceholder();
}

function drawQrPlaceholder() {
  const canvas = els["qr-canvas"];
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  const size = 11;
  const url = state.config.qrUrl || DEFAULT_CONFIG.qrUrl;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#0d1a2a";

  for (let y = 0; y < 15; y += 1) {
    for (let x = 0; x < 15; x += 1) {
      if (hash(`${url}-${x}-${y}`) % 3 === 0) {
        ctx.fillRect(7 + x * size, 7 + y * size, size - 2, size - 2);
      }
    }
  }

  drawFinder(ctx, 7, 7, size);
  drawFinder(ctx, 7 + 10 * size, 7, size);
  drawFinder(ctx, 7, 7 + 10 * size, size);
}

function updateStickyOffsets() {
  const topbar = document.querySelector(".topbar");
  if (!topbar) return;
  const offset = Math.ceil(topbar.getBoundingClientRect().height + 16);
  document.documentElement.style.setProperty("--topbar-offset", `${offset}px`);
}

function drawFinder(ctx, x, y, s) {
  ctx.fillRect(x, y, s * 3, s * 3);
  ctx.fillStyle = "#fff";
  ctx.fillRect(x + s, y + s, s, s);
  ctx.fillStyle = "#0d1a2a";
}

function jumpFromHash() {
  if (!window.location.hash.startsWith("#post-")) return;
  enterApp();
  scrollToSection("#feed-anchor");
  document.querySelector(window.location.hash)?.scrollIntoView({ behavior: "smooth", block: "center" });
}

function showSkeletons() {
  const tpl = document.getElementById("skeleton-template");
  const frag = document.createDocumentFragment();
  for (let i = 0; i < 3; i += 1) frag.appendChild(tpl.content.cloneNode(true));
  els.feed.innerHTML = "";
  els.feed.appendChild(frag);
}

function scrollToSection(selector) {
  document.querySelector(selector)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function syncFilterInputs() {
  els["search-input"].value = state.filters.search || "";
  els["sort-select"].value = state.filters.sort || "recent";
}

function matchPeriod(post, key) {
  if ((post.period || "").includes(key)) return true;
  if ((post.tags || []).includes(key)) return true;
  if (key === "naissance") return (post.tags || []).includes("enfants");
  return false;
}

function reactionTotal(post) {
  return REACTIONS.reduce((acc, r) => acc + Number(post.reactions[r] || 0), 0);
}

function persistAll() {
  persistPosts();
  persistConfig();
  persistFilters();
  persistSaved();
}

function persistPosts() {
  localStorage.setItem(STORAGE_KEYS.posts, JSON.stringify(state.posts));
}

function persistConfig() {
  localStorage.setItem(STORAGE_KEYS.config, JSON.stringify(state.config));
}

function persistFilters() {
  localStorage.setItem(STORAGE_KEYS.filters, JSON.stringify(state.filters));
}

function persistSaved() {
  localStorage.setItem(STORAGE_KEYS.saved, JSON.stringify(Array.from(state.saved)));
}

function loadJson(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function fileToDataUrl(file, maxBytes) {
  return new Promise((resolve) => {
    if (file.size > maxBytes) {
      resolve("");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => resolve("");
    reader.readAsDataURL(file);
  });
}

function download(name, content, mime) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

function uid(prefix = "id") {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}-${Date.now().toString(36).slice(-4)}`;
}

function truncate(text, max) {
  const t = String(text || "");
  return t.length > max ? `${t.slice(0, max - 1)}...` : t;
}

function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i += 1) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function toHex(color) {
  return /^#[0-9A-Fa-f]{6}$/.test(color) ? color : DEFAULT_CONFIG.accentColor;
}

function escapeHtml(v) {
  return String(v || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttr(v) {
  return String(v || "").replace(/"/g, "&quot;");
}

function demoPosts() {
  return [];
}

function looksLikeLegacyDemo(posts) {
  if (!Array.isArray(posts) || posts.length < 8) return false;
  const ids = new Set(posts.map((p) => p.id));
  return ["p1", "p2", "p3", "p4", "p5", "p6"].every((id) => ids.has(id));
}

function setupRevealAnimations() {
  if (typeof window.IntersectionObserver === "undefined") return;

  if (!state.revealObserver) {
    state.revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            state.revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
  }

  document.querySelectorAll(".card, .post, .feed-wrap, .timeline-living, .movement").forEach((el) => {
    if (!el.classList.contains("reveal")) el.classList.add("reveal");
    if (!el.classList.contains("is-visible")) state.revealObserver.observe(el);
  });
}

function startSynthFallback() {
  if (state.synth.ctx) return;
  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return;
    const ctx = new Ctx();

    const freqs = [220, 277.18, 329.63];
    const nodes = freqs.map((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.value = 0.012 + idx * 0.004;
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      return { osc, gain };
    });

    state.synth = { ctx, nodes };
  } catch {
    // Ignore fallback audio errors silently.
  }
}

function stopSynthFallback() {
  if (!state.synth.ctx) return;
  state.synth.nodes.forEach(({ osc }) => {
    try {
      osc.stop();
    } catch {
      // no-op
    }
  });
  state.synth.ctx.close().catch(() => {});
  state.synth = { ctx: null, nodes: [] };
}
