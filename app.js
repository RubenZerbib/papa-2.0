const STORAGE_KEYS = {
  posts: "papa2_posts",
  filters: "papa2_filters",
  theme: "papa2_theme",
  memoryDay: "papa2_memory_day",
  saved: "papa2_saved_posts",
};

const REACTIONS = ["❤️", "🕯️", "🙏", "🤍", "😂", "😢"];

const STORIES = [
  "Famille",
  "Vacances",
  "Fetes",
  "Voix",
  "Videos",
  "Lieux",
  "Heritage",
  "Drole",
  "Cuisine",
  "Enfance",
];

const FILTER_CHIPS = ["Tous", "Photos", "Videos", "Audio", "Textes", "Famille", "Voyages", "Fetes", "Heritage"];

const TIMELINE_EVENTS = [
  "Naissance",
  "Enfance",
  "Jeunesse",
  "Mariage",
  "Naissance des enfants",
  "Voyages",
  "Moments en famille",
  "Transmission",
  "Souvenirs apres son depart",
];

const TIMELINE_KEYWORDS = {
  naissance: ["naissance", "debuts", "1987", "jeunesse"],
  enfance: ["enfance", "velo", "enfant", "atelier"],
  jeunesse: ["jeunesse", "voyage", "cassette"],
  mariage: ["mariage", "famille", "fete"],
  "naissance des enfants": ["enfants", "famille", "enfance"],
  voyages: ["voyages", "vacances", "lisbonne", "sete"],
  "moments en famille": ["famille", "dimanche", "maison"],
  transmission: ["transmission", "valeurs", "heritage", "recette"],
  "souvenirs apres son depart": ["souvenir", "anniversaire", "bougie", "laisse"],
};

const BASE_URL = "https://rubenzerbib.github.io/papa-2.0/";

const demoPosts = [
  {
    id: "p1",
    type: "photo",
    contributor: "Lina",
    caption: "Cette photo de table du dimanche me rappelle sa facon de decouper le pain en souriant avant meme de s'asseoir.",
    dateLabel: "Printemps 1994",
    createdAt: "1994-04-10T12:00:00.000Z",
    location: "Lyon",
    tags: ["famille", "dimanche", "cuisine"],
    media: [{ type: "photo", title: "Table du dimanche", url: "", placeholder: true }],
    reactions: { "❤️": 17, "🕯️": 3, "🙏": 8, "🤍": 4, "😂": 5, "😢": 2 },
    comments: [
      { id: uid(), name: "Nora", text: "On entend presque sa voix.", createdAt: Date.now() - 50000 },
      { id: uid(), name: "Yassine", text: "Et son tablier bleu!", createdAt: Date.now() - 22000 },
    ],
    pinned: true,
  },
  {
    id: "p2",
    type: "video",
    contributor: "Famille",
    caption: "Ancienne cassette numerisee. Il nous apprend a faire du velo avec une patience infinie.",
    dateLabel: "Ete 1991",
    createdAt: "1991-07-18T15:00:00.000Z",
    location: "Valence",
    tags: ["enfance", "video", "transmission"],
    media: [
      { type: "video", title: "Lecon de velo", url: "", placeholder: true },
      { type: "photo", title: "Pause glace", url: "", placeholder: true },
    ],
    reactions: baseReactions(12),
    comments: [],
    pinned: false,
  },
  {
    id: "p3",
    type: "audio",
    contributor: "Karim",
    caption: "Message vocal retrouve: il dit seulement " +
      '"rentrez bien, je vous attends"' +
      ". Trois mots qui tiennent toute une maison.",
    dateLabel: "2006",
    createdAt: "2006-10-09T10:00:00.000Z",
    location: "Paris",
    tags: ["voix", "audio", "famille"],
    media: [{ type: "audio", title: "Message du soir", url: "", placeholder: true }],
    reactions: baseReactions(21),
    comments: [],
    pinned: false,
  },
  {
    id: "p4",
    type: "text",
    contributor: "Leila",
    caption: "Histoire drole: il cachait les gateaux pour les " +
      "invites, puis il oubliait ou il les avait ranges. On les retrouvait un mois plus tard.",
    dateLabel: "Hiver 2001",
    createdAt: "2001-12-01T18:00:00.000Z",
    location: "Grenoble",
    tags: ["drole", "fetes"],
    media: [{ type: "text", title: "Anecdote", url: "", placeholder: true }],
    reactions: baseReactions(9),
    comments: [],
    pinned: false,
  },
  {
    id: "p5",
    type: "photo",
    contributor: "Ines",
    caption: "Vacances en bord de mer. Il ramassait des coquillages comme des tresors et les nommait tous.",
    dateLabel: "Aout 1998",
    createdAt: "1998-08-20T09:00:00.000Z",
    location: "Sete",
    tags: ["vacances", "voyages", "famille"],
    media: [{ type: "photo", title: "Coquillages", url: "", placeholder: true }],
    reactions: baseReactions(15),
    comments: [],
    pinned: false,
  },
  {
    id: "p6",
    type: "mixed",
    contributor: "Maya",
    caption: "Carnet de voyage: billets de train, carte postale, et sa phrase preferee: " +
      '"on part pour revenir plus riches de liens"' +
      ".",
    dateLabel: "2009",
    createdAt: "2009-04-21T14:00:00.000Z",
    location: "Lisbonne",
    tags: ["voyages", "heritage", "document"],
    media: [
      { type: "document", title: "Carte postale", url: "", placeholder: true },
      { type: "photo", title: "Billets", url: "", placeholder: true },
    ],
    reactions: baseReactions(11),
    comments: [],
    pinned: false,
  },
  {
    id: "p7",
    type: "text",
    contributor: "Nadia",
    caption: "Sa recette des poivrons farcis: " +
      "prendre son temps, gouter, recommencer, et toujours ajouter une blague.",
    dateLabel: "Fete familiale 2012",
    createdAt: "2012-06-15T20:00:00.000Z",
    location: "Montpellier",
    tags: ["cuisine", "fetes", "famille"],
    media: [{ type: "text", title: "Recette", url: "", placeholder: true }],
    reactions: baseReactions(23),
    comments: [],
    pinned: false,
  },
  {
    id: "p8",
    type: "quote",
    contributor: "Famille",
    caption: "Ce qu'il repetait souvent: " +
      '"la douceur n'est pas une faiblesse, c'est une force qui rassemble"' +
      ".",
    dateLabel: "Transmission",
    createdAt: "2015-03-03T13:00:00.000Z",
    location: "Lyon",
    tags: ["heritage", "valeurs"],
    media: [{ type: "text", title: "Citation", url: "", placeholder: true }],
    reactions: baseReactions(28),
    comments: [],
    pinned: false,
  },
  {
    id: "p9",
    type: "document",
    contributor: "Sam",
    caption: "Lettre retrouvee dans un livre. Chaque ligne ressemble a une main posee sur l'epaule.",
    dateLabel: "1987",
    createdAt: "1987-11-22T07:00:00.000Z",
    location: "Oran",
    tags: ["lettre", "document", "famille"],
    media: [{ type: "document", title: "Lettre manuscrite", url: "", placeholder: true }],
    reactions: baseReactions(19),
    comments: [],
    pinned: false,
  },
  {
    id: "p10",
    type: "anniversary",
    contributor: "Famille",
    caption: "Aujourd'hui, nous allumons une bougie et nous partageons ce qui continue de vivre grace a lui.",
    dateLabel: "Date de souvenir",
    createdAt: "2025-06-18T08:00:00.000Z",
    location: "Maison familiale",
    tags: ["anniversaire", "souvenir", "famille"],
    media: [{ type: "photo", title: "Bougie", url: "", placeholder: true }],
    reactions: baseReactions(30),
    comments: [],
    pinned: true,
  },
  {
    id: "p11",
    type: "photo",
    contributor: "Rami",
    caption: "Mon souvenir d'enfant: ses grandes mains qui savaient reparer un jouet et une journee en meme temps.",
    dateLabel: "1996",
    createdAt: "1996-02-14T16:00:00.000Z",
    location: "Lyon",
    tags: ["enfance", "famille"],
    media: [{ type: "photo", title: "Atelier", url: "", placeholder: true }],
    reactions: baseReactions(14),
    comments: [],
    pinned: false,
  },
  {
    id: "p12",
    type: "text",
    contributor: "Famille",
    caption: "Ce qu'il nous a laisse: une facon d'accueillir, de transmettre, de rire meme les jours lourds.",
    dateLabel: "Aujourd'hui",
    createdAt: "2026-01-08T09:30:00.000Z",
    location: "Partout avec nous",
    tags: ["heritage", "valeurs", "famille"],
    media: [{ type: "text", title: "Ce qu'il nous a laisse", url: "", placeholder: true }],
    reactions: baseReactions(26),
    comments: [],
    pinned: true,
  },
];

const state = {
  posts: [],
  savedPosts: new Set(),
  filters: {
    search: "",
    chip: "Tous",
    sort: "recent",
    story: "",
    timeline: "",
    location: "",
  },
  activeView: "feed",
  expandedComments: new Set(),
};

const els = {};

document.addEventListener("DOMContentLoaded", init);

function init() {
  cacheElements();
  loadTheme();
  initData();
  renderStories();
  renderFilterChips();
  bindEvents();
  showSkeletons();
  setTimeout(() => {
    renderAll();
    renderSampleRemembrance();
    drawQrPlaceholder();
  }, 350);
}

function cacheElements() {
  els.landing = document.getElementById("landing");
  els.app = document.getElementById("app");
  els.enterBtn = document.getElementById("enter-btn");
  els.openComposerFromLanding = document.getElementById("open-composer-from-landing");
  els.themeToggle = document.getElementById("theme-toggle");
  els.searchInput = document.getElementById("search-input");
  els.sortSelect = document.getElementById("sort-select");
  els.filterChips = document.getElementById("filter-chips");
  els.clearFilters = document.getElementById("clear-filters");
  els.feed = document.getElementById("feed");
  els.storiesList = document.getElementById("stories-list");
  els.timelineEvents = document.getElementById("timeline-events");
  els.bookChapters = document.getElementById("book-chapters");
  els.generatePage = document.getElementById("generate-page");
  els.generatedPage = document.getElementById("generated-page");
  els.memoryDay = document.getElementById("memory-day");
  els.placesGrid = document.getElementById("places-grid");
  els.modal = document.getElementById("composer-modal");
  els.closeComposer = document.getElementById("close-composer");
  els.composerForm = document.getElementById("composer-form");
  els.fab = document.getElementById("fab-add");
  els.bottomAdd = document.getElementById("bottom-add");
  els.sampleRemembrance = document.getElementById("sample-remembrance");
  els.exportJson = document.getElementById("export-json");
  els.importJson = document.getElementById("import-json");
  els.resetDemo = document.getElementById("reset-demo");
  els.printPage = document.getElementById("print-page");
  els.qrCanvas = document.getElementById("qr-canvas");
}

function bindEvents() {
  els.enterBtn.addEventListener("click", () => {
    els.landing.hidden = true;
    els.app.hidden = false;
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  els.openComposerFromLanding.addEventListener("click", () => {
    els.landing.hidden = true;
    els.app.hidden = false;
    openComposer();
  });

  els.themeToggle.addEventListener("click", toggleTheme);

  els.searchInput.addEventListener("input", (e) => {
    state.filters.search = e.target.value.trim().toLowerCase();
    persistFilters();
    renderFeed();
  });

  els.sortSelect.addEventListener("change", (e) => {
    state.filters.sort = e.target.value;
    persistFilters();
    renderFeed();
  });

  els.clearFilters.addEventListener("click", () => {
    state.filters = {
      search: "",
      chip: "Tous",
      sort: "recent",
      story: "",
      timeline: "",
      location: "",
    };
    persistFilters();
    syncFilterInputs();
    renderAll();
  });

  document.querySelectorAll("[data-view]").forEach((btn) => {
    btn.addEventListener("click", () => setView(btn.dataset.view));
  });

  document.querySelectorAll(".nav-item").forEach((btn) => {
    btn.addEventListener("click", () => setView(btn.dataset.view));
  });

  document.querySelectorAll(".bottom-nav-item[data-view]").forEach((btn) => {
    btn.addEventListener("click", () => setView(btn.dataset.view));
  });

  els.fab.addEventListener("click", openComposer);
  els.bottomAdd.addEventListener("click", openComposer);
  els.closeComposer.addEventListener("click", () => els.modal.close());

  els.composerForm.addEventListener("submit", handleCreatePost);

  els.generatePage.addEventListener("click", generateMemoryPage);

  els.exportJson.addEventListener("click", exportPostsJson);
  els.importJson.addEventListener("change", importPostsJson);
  els.resetDemo.addEventListener("click", resetDemoData);
  els.printPage.addEventListener("click", () => window.print());
}

function initData() {
  const storedPosts = localStorage.getItem(STORAGE_KEYS.posts);
  const storedFilters = localStorage.getItem(STORAGE_KEYS.filters);
  const storedSaved = localStorage.getItem(STORAGE_KEYS.saved);

  state.posts = storedPosts ? JSON.parse(storedPosts) : structuredClone(demoPosts);
  state.savedPosts = new Set(storedSaved ? JSON.parse(storedSaved) : []);

  if (!storedPosts) persistPosts();

  if (storedFilters) {
    state.filters = { ...state.filters, ...JSON.parse(storedFilters) };
  }
  syncFilterInputs();
}

function renderAll() {
  renderMemoryDay();
  renderFeed();
  renderTimeline();
  renderBook();
  renderPlaces();
}

function renderStories() {
  els.storiesList.innerHTML = STORIES.map(
    (story) => `
      <button class="story ${state.filters.story === story.toLowerCase() ? "active" : ""}" data-story="${story.toLowerCase()}" aria-label="Filtrer par ${story}">
        <span class="story-thumb" aria-hidden="true"></span>
        <span>${story}</span>
      </button>`
  ).join("");

  els.storiesList.querySelectorAll(".story").forEach((storyBtn) => {
    storyBtn.addEventListener("click", () => {
      state.filters.story = storyBtn.dataset.story;
      state.filters.chip = "Tous";
      persistFilters();
      renderStories();
      renderFeed();
      setView("feed");
      scrollToFeed();
    });
  });
}

function renderFilterChips() {
  els.filterChips.innerHTML = FILTER_CHIPS.map(
    (chip) => `<button class="chip ${state.filters.chip === chip ? "active" : ""}" data-chip="${chip}">${chip}</button>`
  ).join("");

  els.filterChips.querySelectorAll(".chip").forEach((chipBtn) => {
    chipBtn.addEventListener("click", () => {
      state.filters.chip = chipBtn.dataset.chip;
      state.filters.story = "";
      persistFilters();
      renderFilterChips();
      renderStories();
      renderFeed();
    });
  });
}

function renderMemoryDay() {
  const today = new Date().toISOString().slice(0, 10);
  const stored = JSON.parse(localStorage.getItem(STORAGE_KEYS.memoryDay) || "null");
  let post;

  if (stored && stored.date === today) {
    post = state.posts.find((p) => p.id === stored.postId);
  }

  if (!post) {
    post = state.posts[Math.floor(hash(today) % state.posts.length)];
    localStorage.setItem(STORAGE_KEYS.memoryDay, JSON.stringify({ date: today, postId: post.id }));
  }

  els.memoryDay.innerHTML = `
    <h3>Souvenir du jour</h3>
    <p><strong>${escapeHtml(post.contributor || "Famille")}</strong> - ${escapeHtml(post.dateLabel)}</p>
    <p>${truncate(post.caption, 120)}</p>
    <button class="btn btn-soft btn-sm" id="jump-memory-day">Voir ce souvenir</button>
  `;

  document.getElementById("jump-memory-day").addEventListener("click", () => {
    setView("feed");
    renderFeed();
    const target = document.getElementById(`post-${post.id}`);
    target?.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}

function renderFeed() {
  renderFilterChips();
  const posts = getFilteredPosts();

  if (!posts.length) {
    els.feed.innerHTML = `<article class="card"><p>Aucun souvenir ne correspond a votre recherche.</p></article>`;
    return;
  }

  els.feed.innerHTML = posts.map((post) => renderPost(post)).join("");

  posts.forEach((post) => bindPostEvents(post));
}

function renderPost(post) {
  const comments = post.comments || [];
  const showAll = state.expandedComments.has(post.id);
  const visibleComments = showAll ? comments : comments.slice(-2);
  const isSaved = state.savedPosts.has(post.id);

  return `
    <article class="post" id="post-${post.id}">
      <header class="post-header">
        <div class="author">
          <span class="avatar">${(post.contributor || "F").slice(0, 1).toUpperCase()}</span>
          <div>
            <strong>${escapeHtml(post.contributor || "Famille")}</strong>
            <p>${escapeHtml(post.dateLabel)}${post.location ? ` • ${escapeHtml(post.location)}` : ""}</p>
          </div>
        </div>
        <span class="post-type">${escapeHtml(post.type)}</span>
      </header>

      ${renderCarousel(post)}

      <div class="post-body">
        <p class="caption" data-caption="${post.id}">${renderCaption(post)}</p>
        <div class="tags">${(post.tags || []).map((tag) => `<span>#${escapeHtml(tag)}</span>`).join("")}</div>

        <div class="reactions" role="group" aria-label="Reactions">
          ${REACTIONS.map(
            (emoji) =>
              `<button class="reaction-btn" data-post="${post.id}" data-reaction="${emoji}" aria-label="Reaction ${emoji}">${emoji} <span>${post.reactions?.[emoji] || 0}</span></button>`
          ).join("")}
        </div>

        <div class="post-actions-row">
          <button class="post-action" data-share="${post.id}">Copier le lien</button>
          <button class="post-action" data-save="${post.id}">${isSaved ? "Retire" : "Sauvegarder"}</button>
        </div>

        <div class="comments">
          ${visibleComments
            .map(
              (c) => `<div class="comment-item"><b>${escapeHtml(c.name || "Anonyme")}</b>${escapeHtml(c.text)}</div>`
            )
            .join("")}

          ${comments.length > 2 ? `<button class="post-action" data-toggle-comments="${post.id}">${showAll ? "Replier" : "Voir tous les commentaires"}</button>` : ""}

          <form class="comment-form" data-comment-form="${post.id}">
            <input type="text" name="name" maxlength="24" placeholder="Prenom (optionnel)" aria-label="Prenom" />
            <input type="text" name="comment" required placeholder="Ecrire un commentaire..." aria-label="Commentaire" />
            <button class="btn btn-soft btn-sm" type="submit">Publier</button>
          </form>
        </div>
      </div>
    </article>
  `;
}

function renderCarousel(post) {
  const media = post.media?.length ? post.media : [{ type: "text", title: "Souvenir", placeholder: true }];

  return `
    <div class="media-carousel" data-carousel="${post.id}">
      ${media
        .map((m, i) => {
          const slideClass = mapMediaTypeToClass(m.type);
          const content = m.url
            ? mediaNodeForUrl(m)
            : `<strong>${escapeHtml(m.title || "Souvenir")}</strong>`;
          return `
            <div class="slide ${slideClass} ${i === 0 ? "active" : ""}" data-slide="${i}">
              ${content}
              ${m.type === "video" ? '<span class="play-overlay" aria-hidden="true">▶</span>' : ""}
              ${m.type === "audio" ? '<div class="waveform" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></div>' : ""}
            </div>
          `;
        })
        .join("")}
      ${media.length > 1 ? `
        <div class="carousel-nav">
          <button data-prev="${post.id}" aria-label="Media precedente">‹</button>
          <button data-next="${post.id}" aria-label="Media suivante">›</button>
        </div>
        <div class="dots">
          ${media
            .map(
              (_, i) => `<button data-dot="${post.id}" data-index="${i}" class="${i === 0 ? "active" : ""}" aria-label="Aller au media ${i + 1}"></button>`
            )
            .join("")}
        </div>`
      : ""}
    </div>
  `;
}

function mediaNodeForUrl(mediaItem) {
  if (mediaItem.type === "photo") {
    return `<img src="${mediaItem.url}" alt="${escapeHtml(mediaItem.title || "photo")}" style="width:100%;height:100%;object-fit:cover;border-radius:12px;" />`;
  }
  if (mediaItem.type === "video") {
    return `<video src="${mediaItem.url}" controls style="width:100%;height:100%;object-fit:cover;border-radius:12px;"></video>`;
  }
  if (mediaItem.type === "audio") {
    return `<audio src="${mediaItem.url}" controls style="width:100%;"></audio>`;
  }
  return `<strong>${escapeHtml(mediaItem.title || "Souvenir")}</strong>`;
}

function bindPostEvents(post) {
  document.querySelectorAll(`[data-post="${post.id}"]`).forEach((btn) => {
    btn.addEventListener("click", () => {
      const reaction = btn.dataset.reaction;
      post.reactions[reaction] = (post.reactions[reaction] || 0) + 1;
      persistPosts();
      btn.classList.add("pulse");
      setTimeout(() => btn.classList.remove("pulse"), 400);
      renderFeed();
    });
  });

  const shareBtn = document.querySelector(`[data-share="${post.id}"]`);
  shareBtn?.addEventListener("click", async () => {
    const url = `${BASE_URL}#post-${post.id}`;
    try {
      await navigator.clipboard.writeText(url);
      shareBtn.textContent = "Lien copie";
      setTimeout(() => (shareBtn.textContent = "Copier le lien"), 1200);
    } catch {
      window.prompt("Copiez ce lien:", url);
    }
  });

  const saveBtn = document.querySelector(`[data-save="${post.id}"]`);
  saveBtn?.addEventListener("click", () => {
    if (state.savedPosts.has(post.id)) {
      state.savedPosts.delete(post.id);
    } else {
      state.savedPosts.add(post.id);
    }
    persistSavedPosts();
    renderFeed();
  });

  const toggleBtn = document.querySelector(`[data-toggle-comments="${post.id}"]`);
  toggleBtn?.addEventListener("click", () => {
    if (state.expandedComments.has(post.id)) {
      state.expandedComments.delete(post.id);
    } else {
      state.expandedComments.add(post.id);
    }
    renderFeed();
  });

  const form = document.querySelector(`[data-comment-form="${post.id}"]`);
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const text = String(data.get("comment") || "").trim();
    if (!text) return;
    const name = String(data.get("name") || "").trim();

    post.comments = post.comments || [];
    post.comments.push({
      id: uid(),
      name: name || "Famille",
      text,
      createdAt: Date.now(),
    });
    persistPosts();
    state.expandedComments.add(post.id);
    renderFeed();
  });

  bindCarousel(post.id);
  bindReadMore(post);
}

function bindReadMore(post) {
  const btn = document.querySelector(`[data-read-more="${post.id}"]`);
  btn?.addEventListener("click", () => {
    const p = state.posts.find((x) => x.id === post.id);
    if (!p) return;
    p.expanded = !p.expanded;
    persistPosts();
    renderFeed();
  });
}

function bindCarousel(postId) {
  const container = document.querySelector(`[data-carousel="${postId}"]`);
  if (!container) return;

  let index = 0;
  const slides = Array.from(container.querySelectorAll(".slide"));
  const dots = Array.from(container.querySelectorAll("[data-dot]"));

  const setSlide = (next) => {
    index = (next + slides.length) % slides.length;
    slides.forEach((s, i) => s.classList.toggle("active", i === index));
    dots.forEach((d, i) => d.classList.toggle("active", i === index));
  };

  container.querySelector(`[data-prev="${postId}"]`)?.addEventListener("click", () => setSlide(index - 1));
  container.querySelector(`[data-next="${postId}"]`)?.addEventListener("click", () => setSlide(index + 1));

  dots.forEach((dot) => {
    dot.addEventListener("click", () => setSlide(Number(dot.dataset.index)));
  });

  let touchStartX = 0;
  container.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  container.addEventListener("touchend", (e) => {
    const diff = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(diff) < 30) return;
    setSlide(diff < 0 ? index + 1 : index - 1);
  });
}

function handleCreatePost(e) {
  e.preventDefault();
  const formData = new FormData(els.composerForm);

  const post = {
    id: uid("p"),
    type: normalizeType(String(formData.get("type") || "text")),
    contributor: String(formData.get("contributor") || "").trim() || "Famille",
    caption: String(formData.get("caption") || "").trim(),
    dateLabel: String(formData.get("dateLabel") || "").trim() || "Souvenir recent",
    createdAt: new Date().toISOString(),
    location: String(formData.get("location") || "").trim(),
    tags: String(formData.get("tags") || "")
      .split(",")
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean),
    media: [],
    reactions: baseReactions(0),
    comments: [],
    pinned: false,
  };

  const files = [
    { input: els.composerForm.querySelector('input[name="photo"]')?.files?.[0], type: "photo", title: "Photo locale" },
    { input: els.composerForm.querySelector('input[name="video"]')?.files?.[0], type: "video", title: "Video locale" },
    { input: els.composerForm.querySelector('input[name="audio"]')?.files?.[0], type: "audio", title: "Audio local" },
  ].filter((f) => f.input);

  Promise.all(files.map((f) => fileToSmallDataUrl(f.input).then((url) => ({ ...f, url })))).then((fileMedia) => {
    post.media = fileMedia.map((f) => ({
      type: f.type,
      title: f.title,
      url: f.url,
      placeholder: !Boolean(f.url),
    }));

    if (!post.media.length) {
      post.media = [{ type: post.type, title: "Souvenir", url: "", placeholder: true }];
    }

    state.posts.unshift(post);
    persistPosts();
    els.composerForm.reset();
    els.modal.close();
    setView("feed");
    renderAll();
    scrollToFeed();
  });
}

function fileToSmallDataUrl(file) {
  return new Promise((resolve) => {
    const maxBytes = 180000;
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

function renderTimeline() {
  els.timelineEvents.innerHTML = TIMELINE_EVENTS.map(
    (eventName) => `
      <article class="timeline-item" data-timeline="${eventName.toLowerCase()}">
        <h4>${eventName}</h4>
        <p>Explorer les souvenirs relies a cette periode.</p>
      </article>
    `
  ).join("");

  els.timelineEvents.querySelectorAll(".timeline-item").forEach((item) => {
    item.addEventListener("click", () => {
      state.filters.timeline = item.dataset.timeline;
      state.filters.search = "";
      persistFilters();
      setView("feed");
      renderFeed();
      scrollToFeed();
    });
  });
}

function renderBook() {
  const chapters = [
    { title: "Chapitre 1: Ses debuts", match: ["naissance", "enfance", "jeunesse"] },
    { title: "Chapitre 2: La famille", match: ["famille", "mariage", "enfants"] },
    { title: "Chapitre 3: Les moments simples", match: ["cuisine", "fetes", "drole"] },
    { title: "Chapitre 4: Ce qu'il nous a laisse", match: ["heritage", "transmission", "valeurs"] },
  ];

  els.bookChapters.innerHTML = chapters
    .map((chapter) => {
      const matches = state.posts.filter((post) => post.tags?.some((tag) => chapter.match.includes(tag))).slice(0, 3);
      return `
        <article class="chapter">
          <h4>${chapter.title}</h4>
          ${matches.length
            ? `<ul>${matches.map((m) => `<li>${escapeHtml(m.dateLabel)} - ${escapeHtml(truncate(m.caption, 90))}</li>`).join("")}</ul>`
            : "<p>Aucun souvenir classe pour ce chapitre.</p>"}
        </article>
      `;
    })
    .join("");
}

function generateMemoryPage() {
  const candidates = getFilteredPosts().slice(0, 4);
  const selected = candidates.length ? candidates : state.posts.slice(0, 4);
  const todayLabel = new Date().toLocaleDateString("fr-FR", { dateStyle: "long" });

  els.generatedPage.hidden = false;
  els.generatedPage.innerHTML = `
    <h4>Page souvenir - ${todayLabel}</h4>
    <p>Un recueil cree sur cet appareil, a partager et imprimer.</p>
    ${selected
      .map(
        (post) => `
        <article>
          <h5>${escapeHtml(post.dateLabel)} - ${escapeHtml(post.contributor || "Famille")}</h5>
          <p>${escapeHtml(post.caption)}</p>
        </article>
      `
      )
      .join("")}
  `;

  els.generatedPage.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderPlaces() {
  const locationMap = {};
  state.posts.forEach((post) => {
    const key = post.location?.trim() || "Lieu non precise";
    locationMap[key] = (locationMap[key] || 0) + 1;
  });

  const locations = Object.entries(locationMap).sort((a, b) => b[1] - a[1]);

  els.placesGrid.innerHTML = locations
    .map(
      ([location, count]) => `
      <article class="place-card" data-location="${escapeAttr(location.toLowerCase())}">
        <h4>${escapeHtml(location)}</h4>
        <p>${count} souvenir(s)</p>
      </article>
    `
    )
    .join("");

  els.placesGrid.querySelectorAll(".place-card").forEach((card) => {
    card.addEventListener("click", () => {
      state.filters.location = card.dataset.location;
      persistFilters();
      setView("feed");
      renderFeed();
      scrollToFeed();
    });
  });
}

function renderSampleRemembrance() {
  const remembrance = state.posts.find((p) => p.type === "anniversary") || state.posts[0];
  els.sampleRemembrance.innerHTML = `
    <strong>Publication de recueillement</strong>
    <p>${escapeHtml(remembrance.caption)}</p>
  `;
}

function setView(view) {
  state.activeView = view;

  document.querySelectorAll("[data-view-panel]").forEach((panel) => {
    panel.hidden = panel.dataset.viewPanel !== view;
  });

  document.querySelectorAll(".nav-item[data-view]").forEach((item) => {
    item.classList.toggle("active", item.dataset.view === view);
  });

  document.querySelectorAll(".bottom-nav-item[data-view]").forEach((item) => {
    item.classList.toggle("active", item.dataset.view === view);
  });
}

function getFilteredPosts() {
  const chipMap = {
    Photos: ["photo"],
    Videos: ["video"],
    Audio: ["audio"],
    Textes: ["text", "histoire", "quote"],
  };

  let posts = [...state.posts];

  if (state.filters.search) {
    const q = state.filters.search;
    posts = posts.filter((post) => {
      const haystack = [
        post.caption,
        post.contributor,
        post.location,
        post.type,
        ...(post.tags || []),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }

  if (state.filters.chip !== "Tous") {
    if (chipMap[state.filters.chip]) {
      posts = posts.filter((post) => chipMap[state.filters.chip].includes(post.type));
    } else {
      posts = posts.filter((post) => post.tags?.includes(state.filters.chip.toLowerCase()));
    }
  }

  if (state.filters.story) {
    posts = posts.filter((post) => {
      const target = state.filters.story;
      const tags = (post.tags || []).map((t) => t.toLowerCase());
      return tags.some((tag) => tag.includes(target)) || post.type.toLowerCase().includes(target);
    });
  }

  if (state.filters.timeline) {
    const keywords = TIMELINE_KEYWORDS[state.filters.timeline] || [state.filters.timeline];
    posts = posts.filter((post) => {
      const corpus = `${post.caption} ${(post.tags || []).join(" ")}`.toLowerCase();
      return keywords.some((kw) => corpus.includes(kw));
    });
  }

  if (state.filters.location) {
    posts = posts.filter((post) => (post.location || "").toLowerCase().includes(state.filters.location));
  }

  if (state.filters.sort === "recent") {
    posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else if (state.filters.sort === "old") {
    posts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  } else {
    posts.sort((a, b) => totalReactions(b) - totalReactions(a));
  }

  return posts;
}

function openComposer() {
  if (!els.modal.open) {
    els.modal.showModal();
  }
}

function toggleTheme() {
  const next = document.body.classList.toggle("dark");
  localStorage.setItem(STORAGE_KEYS.theme, next ? "dark" : "light");
  els.themeToggle.textContent = next ? "🌙" : "☀️";
}

function loadTheme() {
  const theme = localStorage.getItem(STORAGE_KEYS.theme);
  if (theme === "dark") {
    document.body.classList.add("dark");
    els.themeToggle.textContent = "🌙";
  } else {
    document.body.classList.remove("dark");
    els.themeToggle.textContent = "☀️";
  }
}

function exportPostsJson() {
  const payload = {
    exportedAt: new Date().toISOString(),
    posts: state.posts,
  };

  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "papa2-memories.json";
  a.click();
  URL.revokeObjectURL(url);
}

function importPostsJson(e) {
  const file = e.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result || "{}"));
      if (!Array.isArray(parsed.posts)) throw new Error("Invalid format");
      state.posts = parsed.posts;
      persistPosts();
      renderAll();
    } catch {
      alert("Import impossible: fichier JSON invalide.");
    }
  };
  reader.readAsText(file);
  e.target.value = "";
}

function resetDemoData() {
  state.posts = structuredClone(demoPosts);
  state.savedPosts = new Set();
  state.expandedComments.clear();
  state.filters = {
    search: "",
    chip: "Tous",
    sort: "recent",
    story: "",
    timeline: "",
    location: "",
  };
  persistPosts();
  persistSavedPosts();
  persistFilters();
  syncFilterInputs();
  renderAll();
}

function drawQrPlaceholder() {
  const canvas = els.qrCanvas;
  const ctx = canvas.getContext("2d");
  const size = 12;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#111";

  for (let y = 0; y < 15; y += 1) {
    for (let x = 0; x < 15; x += 1) {
      const v = hash(`${BASE_URL}-${x}-${y}`) % 3;
      if (v === 0) {
        ctx.fillRect(8 + x * size, 8 + y * size, size - 2, size - 2);
      }
    }
  }

  drawFinder(ctx, 8, 8, size);
  drawFinder(ctx, 8 + 10 * size, 8, size);
  drawFinder(ctx, 8, 8 + 10 * size, size);
}

function drawFinder(ctx, x, y, step) {
  ctx.fillRect(x, y, step * 3, step * 3);
  ctx.fillStyle = "#fff";
  ctx.fillRect(x + step, y + step, step, step);
  ctx.fillStyle = "#111";
}

function showSkeletons() {
  const tpl = document.getElementById("skeleton-template");
  const frag = document.createDocumentFragment();
  for (let i = 0; i < 3; i += 1) {
    frag.appendChild(tpl.content.cloneNode(true));
  }
  els.feed.innerHTML = "";
  els.feed.appendChild(frag);
}

function renderCaption(post) {
  const text = post.caption || "";
  if (text.length <= 150) return escapeHtml(text);
  if (post.expanded) {
    return `${escapeHtml(text)} <button class="more-btn" data-read-more="${post.id}">voir moins</button>`;
  }
  return `${escapeHtml(text.slice(0, 150))}... <button class="more-btn" data-read-more="${post.id}">voir plus</button>`;
}

function mapMediaTypeToClass(type) {
  if (["photo", "video", "audio", "document", "text", "mixed"].includes(type)) return type;
  if (type === "quote" || type === "histoire") return "text";
  return "mixed";
}

function normalizeType(type) {
  if (type === "video" || type === "audio" || type === "photo") return type;
  if (type === "texte") return "text";
  if (type === "histoire") return "histoire";
  if (type === "lieu") return "text";
  return "text";
}

function scrollToFeed() {
  document.getElementById("feed-view")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function syncFilterInputs() {
  els.searchInput.value = state.filters.search || "";
  els.sortSelect.value = state.filters.sort || "recent";
}

function persistPosts() {
  localStorage.setItem(STORAGE_KEYS.posts, JSON.stringify(state.posts));
}

function persistFilters() {
  localStorage.setItem(STORAGE_KEYS.filters, JSON.stringify(state.filters));
}

function persistSavedPosts() {
  localStorage.setItem(STORAGE_KEYS.saved, JSON.stringify(Array.from(state.savedPosts)));
}

function baseReactions(seed) {
  return {
    "❤️": seed,
    "🕯️": Math.floor(seed / 4),
    "🙏": Math.floor(seed / 3),
    "🤍": Math.floor(seed / 5),
    "😂": Math.floor(seed / 6),
    "😢": Math.floor(seed / 7),
  };
}

function totalReactions(post) {
  return REACTIONS.reduce((acc, r) => acc + Number(post.reactions?.[r] || 0), 0);
}

function truncate(text, max) {
  return text.length > max ? `${text.slice(0, max - 1)}...` : text;
}

function uid(prefix = "id") {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}-${Date.now().toString(36).slice(-4)}`;
}

function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i += 1) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttr(value) {
  return String(value || "").replace(/"/g, "&quot;");
}
