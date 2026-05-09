const storageKey = `platform-guide-progress-${document.body.dataset.guide || "default"}`;
const checkboxes = Array.from(document.querySelectorAll("[data-step]"));
const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");
const navLinks = Array.from(document.querySelectorAll("[data-nav]"));
const searchInput = document.getElementById("searchInput");
const searchableCards = Array.from(document.querySelectorAll(".section-card.searchable, .info-card.searchable, .term-card.searchable, .command-card.searchable"));
const searchGroups = Array.from(document.querySelectorAll(".search-group"));
const emptyState = document.getElementById("emptyState");
const topButton = document.getElementById("topButton");

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(storageKey)) || {};
  } catch {
    return {};
  }
}

function saveProgress(progress) {
  localStorage.setItem(storageKey, JSON.stringify(progress));
}

function syncProgress() {
  const progress = loadProgress();
  checkboxes.forEach((box) => {
    box.checked = Boolean(progress[box.dataset.step]);
  });

  const doneCount = checkboxes.filter((box) => box.checked).length;
  progressText.textContent = `${doneCount} / ${checkboxes.length}`;
  progressBar.style.width = checkboxes.length ? `${(doneCount / checkboxes.length) * 100}%` : "0%";

  navLinks.forEach((link) => {
    link.classList.toggle("done", Boolean(progress[link.dataset.nav]));
  });
}

checkboxes.forEach((box) => {
  box.addEventListener("change", () => {
    const progress = loadProgress();
    progress[box.dataset.step] = box.checked;
    saveProgress(progress);
    syncProgress();
  });
});

function getTextForSearch(element) {
  const group = element.closest(".search-group");
  const groupHeader = group ? group.querySelector(".section-header") : null;
  const groupText = group ? `${groupHeader?.textContent || ""} ${group.dataset.keywords || ""}` : "";
  return `${element.textContent} ${element.dataset.keywords || ""} ${groupText}`.toLowerCase();
}

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function removeSearchHighlights() {
  document.querySelectorAll(".search-highlight").forEach((mark) => {
    const text = document.createTextNode(mark.textContent);
    mark.replaceWith(text);
    text.parentNode.normalize();
  });
}

function shouldSkipHighlightNode(node) {
  const parent = node.parentElement;
  return !parent || Boolean(parent.closest("script, style, input, textarea, button, .search-highlight"));
}

function highlightSearchValue(element, query) {
  if (!query) return;

  const matcher = new RegExp(escapeRegExp(query), "gi");
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (shouldSkipHighlightNode(node) || !matcher.test(node.nodeValue)) {
        matcher.lastIndex = 0;
        return NodeFilter.FILTER_REJECT;
      }
      matcher.lastIndex = 0;
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  nodes.forEach((node) => {
    const fragment = document.createDocumentFragment();
    const text = node.nodeValue;
    let lastIndex = 0;

    text.replace(matcher, (match, offset) => {
      fragment.append(document.createTextNode(text.slice(lastIndex, offset)));
      const mark = document.createElement("mark");
      mark.className = "search-highlight";
      mark.textContent = match;
      fragment.append(mark);
      lastIndex = offset + match.length;
      return match;
    });

    fragment.append(document.createTextNode(text.slice(lastIndex)));
    node.replaceWith(fragment);
    matcher.lastIndex = 0;
  });
}

function syncSearchGroups() {
  searchGroups.forEach((group) => {
    const childCards = Array.from(group.querySelectorAll(".info-card, .term-card, .command-card"));
    const groupMatched = !group.classList.contains("hidden");
    const hasVisibleChild = childCards.some((card) => !card.classList.contains("hidden"));
    group.classList.toggle("hidden", !(groupMatched || hasVisibleChild));
  });
}

function applySearch() {
  const query = searchInput.value.trim().toLowerCase();
  removeSearchHighlights();
  let visibleCount = 0;

  searchableCards.forEach((item) => {
    const isMatch = !query || getTextForSearch(item).includes(query);
    item.classList.toggle("hidden", !isMatch);
    if (isMatch) {
      visibleCount += 1;
      highlightSearchValue(item, query);
    }
  });

  syncSearchGroups();
  searchGroups.forEach((group) => {
    if (!group.classList.contains("hidden")) {
      const header = group.querySelector(".section-header");
      if (header) highlightSearchValue(header, query);
    }
  });
  emptyState.classList.toggle("show", visibleCount === 0);
}

searchInput.addEventListener("input", applySearch);

const observedSections = Array.from(document.querySelectorAll(".section-card"));
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.dataset.nav === entry.target.id);
    });
  });
}, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });

observedSections.forEach((section) => observer.observe(section));

topButton.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

syncProgress();
