const storageKey = `platform-guide-progress-${document.body.dataset.guide || "default"}`;
const checkboxes = Array.from(document.querySelectorAll("[data-step]"));
const progressText = document.getElementById("progressText");
const progressBar = document.getElementById("progressBar");
const navLinks = Array.from(document.querySelectorAll("[data-nav]"));
const searchInput = document.getElementById("searchInput");
const searchableItems = Array.from(document.querySelectorAll(".searchable"));
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
  return `${element.textContent} ${element.dataset.keywords || ""}`.toLowerCase();
}

function applySearch() {
  const query = searchInput.value.trim().toLowerCase();
  let anyVisible = false;

  searchableItems.forEach((item) => {
    const isMatch = !query || getTextForSearch(item).includes(query);
    item.classList.toggle("hidden", !isMatch);
    if (isMatch) anyVisible = true;
  });

  emptyState.classList.toggle("show", !anyVisible);
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
