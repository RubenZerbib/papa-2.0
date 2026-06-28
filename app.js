const STORAGE_KEYS = {
  posts: "papa2_posts_v3",
  config: "papa2_config_v3",
  filters: "papa2_filters_v3",
  saved: "papa2_saved_v3",
};

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
  dates: "1956 - 2023",
  summary: "Une vie de transmission, de douceur et de force.",
  welcome: "Un mur commun, construit par ceux qui l'aiment.",
  heroPhoto: "",
  musicPath: "assets/music/background.mp3",
  musicEnabled: true,
  accentColor: "#5f84ab",
  qrUrl: "https://rubenzerbib.github.io/papa-2.0/",
  theme: "light",
};

const state = {
  posts: [],
  config: { ...DEFAULT_CONFIG },
  filters: { search: "", chip: "Tous", story: "", sort: "recent", period: "" },
  saved: new Set(),
  admin: { unlocked: false, clickCount: 0 },
  movement: { idx: 0, paused: false, timer: null },
};

const els = {};

document.addEventListener("DOMContentLoaded", init);

function init() {
  cacheEls();
  hydrateState();
  applyTheme();
  applyConfigToUI();
  initAudio();
  bindEvents();
  showSkeletons();

  setTimeout(() => {
    renderStories();
    renderFilterChips();
    renderTimeline();
    renderAll();
    renderMovement();
    drawQrPlaceholder();
    jumpFromHash();
  }, 220);
}

function cacheEls() {
  const ids = [
    "landing", "app", "enter-btn", "open-composer-from-landing", "music-toggle-landing", "music-toggle", "theme-toggle",
    "hero-photo", "hero-photo-fallback", "hero-name", "hero-dates", "hero-summary", "hero-welcome", "top-title", "app-title-click",
    "search-input", "sort-select", "filter-chips", "clear-filters", "stories-list", "timeline-range", "timeline-periods", "timeline-focus",
    "timeline-filter-btn", "movement-carousel", "feed", "memory-day", "quick-stats", "book-chapters", "generate-page", "generated-page",
    "qr-canvas", "qr-url", "composer-modal", "composer-form", "composer-file", "composer-preview", "close-composer", "fab-add", "bottom-add",
    "admin-dot", "bottom-admin", "admin-login-modal", "admin-login-form", "close-admin-login", "admin-login-error", "admin-panel-modal",
    "close-admin-panel", "admin-hero-photo", "admin-name", "admin-dates", "admin-summary", "admin-welcome", "admin-music-path", "admin-accent",
    "admin-qr-url", "admin-save-config", "admin-post-list", "admin-post-form", "admin-delete-post", "admin-comment-list", "export-json",
    "import-json", "reset-demo", "print-page", "bg-audio",
  ];

  ids.forEach((id) => {
    els[id] = document.getElementById(id);
  });
}

function hydrateState() {
  state.posts = loadJson(STORAGE_KEYS.posts) || demoPosts();
  state.config = { ...DEFAULT_CONFIG, ...(loadJson(STORAGE_KEYS.config) || {}) };
  state.filters = { ...state.filters, ...(loadJson(STORAGE_KEYS.filters) || {}) };
  state.saved = new Set(loadJson(STORAGE_KEYS.saved) || []);
  persistAll();
  syncFilterInputs();
}

function bindEvents() {
  els["enter-btn"].addEventListener("click", enterApp);
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
  els["composer-file"].addEventListener("change", previewComposer);
  els["composer-form"].addEventListener("submit", submitComposer);

  els["generate-page"].addEventListener("click", generateBookPage);

  els["admin-dot"].addEventListener("click", openAdminLogin);
  els["bottom-admin"].addEventListener("click", openAdminLogin);
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
}

function enterApp() {
  els.landing.hidden = true;
  els.app.hidden = false;
  tryStartMusic();
}

function applyConfigToUI() {
  const c = state.config;
  els["hero-name"].textContent = c.name;
  els["hero-dates"].textContent = c.dates;
  els["hero-summary"].textContent = c.summary;
  els["hero-welcome"].textContent = c.welcome;
  els["qr-url"].textContent = c.qrUrl;
  els["top-title"].textContent = "Ce qu'il nous a laisse vit encore dans chacun de nous.";

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

function initAudio() {
  const audio = els["bg-audio"];
  audio.src = state.config.musicPath || DEFAULT_CONFIG.musicPath;
  audio.volume = 0.35;
  audio.addEventListener("error", () => {
    console.info("Papa 2.0: fichier musique introuvable (%s)", audio.src);
  });
}

function toggleMusic() {
  state.config.musicEnabled = !state.config.musicEnabled;
  persistConfig();
  syncMusicButtons();
  if (state.config.musicEnabled) tryStartMusic();
  else els["bg-audio"].pause();
}

function syncMusicButtons() {
  const icon = state.config.musicEnabled ? "🔊" : "🔇";
  els["music-toggle"].textContent = icon;
  els["music-toggle-landing"].textContent = icon;
}

function tryStartMusic() {
  if (!state.config.musicEnabled) return;
  els["bg-audio"].play().catch(() => {});
}

function renderAll() {
  renderMemoryDay();
  renderQuickStats();
  renderFeed();
  renderBook();
}

function renderStories() {
  els["stories-list"].innerHTML = STORIES.map((s) => {
    const active = state.filters.story === s.toLowerCase();
    return `<button class="story ${active ? "active" : ""}" data-story="${s.toLowerCase()}">
      <span class="story-ring"></span>
      <span>${escapeHtml(s)}</span>
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
    return `<button class="chip ${active ? "active" : ""}" data-chip="${chip}">${escapeHtml(chip)}</button>`;
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
  els["timeline-periods"].innerHTML = TIMELINE_PERIODS.map((p, i) => `<span class="timeline-pill ${i === idx ? "active" : ""}">${escapeHtml(p.label)}</span>`).join("");
  const samples = state.posts.filter((post) => matchPeriod(post, period.key)).slice(0, 3);

  els["timeline-focus"].innerHTML = `
    <h4>${escapeHtml(period.label)}</h4>
    <p>${escapeHtml(period.text)}</p>
    <div class="timeline-samples">
      ${samples.length ? samples.map((s) => `<article><strong>${escapeHtml(s.dateLabel)}</strong><p>${escapeHtml(truncate(s.caption, 94))}</p></article>`).join("") : "<p>Aucun souvenir associe pour cette periode.</p>"}
    </div>
  `;
}

function renderMemoryDay() {
  const date = new Date().toISOString().slice(0, 10);
  const post = state.posts[hash(date) % state.posts.length];
  els["memory-day"].innerHTML = `
    <h3>Souvenir du jour</h3>
    <p><strong>${escapeHtml(post.contributor)}</strong> - ${escapeHtml(post.dateLabel)}</p>
    <p>${escapeHtml(truncate(post.caption, 120))}</p>
    <button id="jump-memory" class="btn btn-soft btn-sm">Voir ce souvenir</button>
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

  els["quick-stats"].innerHTML = `
    <article><h4>${state.posts.length}</h4><p>Souvenirs</p></article>
    <article><h4>${contributors}</h4><p>Contributeurs</p></article>
    <article><h4>${locations}</h4><p>Lieux</p></article>
    <article><h4>${comments + likes}</h4><p>Interactions</p></article>
  `;
}

function getFilteredPosts() {
  const typeMap = {
    Photos: ["photo"],
    Videos: ["video"],
    Audio: ["audio"],
    Textes: ["text"],
  };

  let list = [...state.posts];

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
    els.feed.innerHTML = `<article class="post empty">Aucun souvenir ne correspond a votre recherche.</article>`;
    return;
  }
  els.feed.innerHTML = posts.map(renderPost).join("");
  posts.forEach(bindPostEvents);
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
  document.querySelectorAll(`[data-react-post="${post.id}"]`).forEach((btn) => {
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

  const share = document.querySelector(`[data-share="${post.id}"]`);
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

  const save = document.querySelector(`[data-save="${post.id}"]`);
  save?.addEventListener("click", () => {
    if (state.saved.has(post.id)) state.saved.delete(post.id);
    else state.saved.add(post.id);
    persistSaved();
    renderFeed();
  });

  const form = document.querySelector(`[data-comment-form="${post.id}"]`);
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
  if (!items.length) return;

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
  const dateLabel = new Date().toLocaleDateString("fr-FR", { dateStyle: "long" });
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
  if (!els["admin-login-modal"].open) els["admin-login-modal"].showModal();
}

function adminLogin(e) {
  e.preventDefault();
  const fd = new FormData(els["admin-login-form"]);
  const user = String(fd.get("username") || "");
  const pass = String(fd.get("password") || "");
  if (user !== "rubenz" || pass !== "270792") {
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
  els["admin-accent"].value = toHex(state.config.accentColor);
  els["admin-qr-url"].value = state.config.qrUrl;
}

async function saveAdminConfig() {
  state.config.name = els["admin-name"].value.trim() || "Papa";
  state.config.dates = els["admin-dates"].value.trim();
  state.config.summary = els["admin-summary"].value.trim();
  state.config.welcome = els["admin-welcome"].value.trim();
  state.config.musicPath = els["admin-music-path"].value.trim() || DEFAULT_CONFIG.musicPath;
  state.config.accentColor = els["admin-accent"].value;
  state.config.qrUrl = els["admin-qr-url"].value.trim() || DEFAULT_CONFIG.qrUrl;

  const file = els["admin-hero-photo"].files?.[0];
  if (file) state.config.heroPhoto = await fileToDataUrl(file, 300000);

  persistConfig();
  applyConfigToUI();
  initAudio();
  drawQrPlaceholder();
}

function renderAdminPosts() {
  els["admin-post-list"].innerHTML = state.posts.map((p) => `<button class="admin-item" data-post-id="${p.id}">${escapeHtml(p.dateLabel)} - ${escapeHtml(truncate(p.caption, 46))}</button>`).join("");

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
      state.config = { ...DEFAULT_CONFIG, ...(parsed.config || {}) };
      state.filters = { ...state.filters, ...(parsed.filters || {}) };
      state.saved = new Set(parsed.saved || []);
      persistAll();
      syncFilterInputs();
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
  state.posts = demoPosts();
  state.config = { ...DEFAULT_CONFIG };
  state.filters = { search: "", chip: "Tous", story: "", sort: "recent", period: "" };
  state.saved = new Set();
  persistAll();
  syncFilterInputs();
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
  const make = (i, input) => ({
    id: `p${i}`,
    avatar: "",
    reactions: { "❤️": 8 + i, "🕯️": 2 + (i % 4), "🙏": 4 + (i % 3), "🤍": 2 + (i % 2), "😂": i % 5, "😢": 1 + (i % 3) },
    comments: [],
    pinned: i === 10 || i === 12,
    ...input,
  });

  return [
    make(1, { contributor: "Lina", type: "photo", caption: "Photo de famille autour de la table. Son regard disait: prenez le temps d'etre ensemble.", dateLabel: "Printemps 1994", createdAt: "1994-04-12T10:00:00Z", location: "Lyon", period: "enfance", tags: ["famille", "enfance"], media: [{ type: "photo", title: "Table du dimanche", url: "", placeholder: true }] }),
    make(2, { contributor: "Samir", type: "text", caption: "Souvenir drole: il cachait les desserts pour les invites, puis oubliait ou.", dateLabel: "Hiver 2001", createdAt: "2001-12-09T11:00:00Z", location: "Grenoble", period: "famille", tags: ["drole", "fetes"], media: [{ type: "text", title: "Anecdote", url: "", placeholder: true }] }),
    make(3, { contributor: "Ines", type: "photo", caption: "Voyage en bord de mer. Il ramassait les coquillages comme des tresors.", dateLabel: "Ete 1998", createdAt: "1998-08-18T09:00:00Z", location: "Sete", period: "voyages", tags: ["voyages", "famille"], media: [{ type: "photo", title: "Coquillages", url: "", placeholder: true }] }),
    make(4, { contributor: "Nadia", type: "photo", caption: "Fete familiale. Les bougies, les voix, et sa facon de remercier chacun.", dateLabel: "Juin 2012", createdAt: "2012-06-15T20:00:00Z", location: "Montpellier", period: "famille", tags: ["fetes", "famille"], media: [{ type: "photo", title: "Fete familiale", url: "", placeholder: true }] }),
    make(5, { contributor: "Karim", type: "audio", caption: "Message vocal retrouve: \"Rentrez bien, je vous attends.\"", dateLabel: "2006", createdAt: "2006-10-11T08:00:00Z", location: "Paris", period: "famille", tags: ["voix", "heritage"], media: [{ type: "audio", title: "Voix du soir", url: "", placeholder: true }] }),
    make(6, { contributor: "Famille", type: "video", caption: "Ancienne video numerisee: il nous apprend a faire du velo avec une patience infinie.", dateLabel: "Ete 1991", createdAt: "1991-07-15T18:00:00Z", location: "Valence", period: "enfance", tags: ["videos", "enfance"], media: [{ type: "video", title: "Lecon de velo", url: "", placeholder: true }] }),
    make(7, { contributor: "Lea", type: "text", caption: "Sa recette de poivrons farcis: gouter, corriger, rire, recommencer.", dateLabel: "Mai 2011", createdAt: "2011-05-02T09:00:00Z", location: "Lyon", period: "famille", tags: ["cuisine", "famille"], media: [{ type: "text", title: "Recette", url: "", placeholder: true }] }),
    make(8, { contributor: "Maya", type: "text", caption: "Sa valeur transmise: la douceur n'est pas une faiblesse, c'est une force.", dateLabel: "Transmission", createdAt: "2015-03-03T13:00:00Z", location: "Lyon", period: "heritage", tags: ["heritage", "valeurs"], media: [{ type: "text", title: "Valeur", url: "", placeholder: true }] }),
    make(9, { contributor: "Rami", type: "photo", caption: "Lettre retrouvee dans un vieux livre. Une ecriture qui rassure encore.", dateLabel: "1987", createdAt: "1987-11-21T10:00:00Z", location: "Oran", period: "jeunesse", tags: ["heritage", "lettre"], media: [{ type: "photo", title: "Lettre", url: "", placeholder: true }] }),
    make(10, { contributor: "Nora", type: "text", caption: "Mon souvenir d'enfant: ses grandes mains reparaient les jouets et les coeurs.", dateLabel: "1996", createdAt: "1996-02-14T16:00:00Z", location: "Lyon", period: "enfance", tags: ["enfance", "famille"], media: [{ type: "text", title: "Souvenir d'enfant", url: "", placeholder: true }] }),
    make(11, { contributor: "Famille", type: "photo", caption: "Post anniversaire: une bougie pour ce qui continue de vivre grace a lui.", dateLabel: "Date anniversaire", createdAt: "2025-06-18T08:00:00Z", location: "Maison familiale", period: "heritage", tags: ["fetes", "souvenir", "famille"], media: [{ type: "photo", title: "Bougie", url: "", placeholder: true }] }),
    make(12, { contributor: "Famille", type: "text", caption: "Ce qu'il nous a laisse: la facon d'accueillir, de transmettre et de tenir ensemble.", dateLabel: "Aujourd'hui", createdAt: "2026-01-08T09:30:00Z", location: "Partout avec nous", period: "heritage", tags: ["heritage", "valeurs", "famille"], media: [{ type: "text", title: "Ce qu'il nous a laisse", url: "", placeholder: true }] }),
  ];
}
