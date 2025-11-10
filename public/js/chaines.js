document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const hamburger = document.querySelector('.hamburger');
  hamburger.addEventListener('click', () => {
    header.classList.toggle('expanded');
  });
});

const openBtn = document.getElementById('searchButton');
const overlay = document.getElementById('searchOverlay');
const container = document.querySelector('.search-container');
const input = document.getElementById('searchInput');
const suggestions = document.getElementById('suggestions');
const suggestionItems = document.querySelectorAll('.suggestion');

openBtn.addEventListener('click', () => {
  overlay.style.display = 'flex';
  input.focus();
});

input.addEventListener('input', () => {
  const query = input.value.trim().toLowerCase();
  let matchCount = 0;

  if (query !== "") {
    suggestions.style.display = 'flex';
    suggestionItems.forEach(item => {
      const alt = item.querySelector('img').alt.toLowerCase();
      if (alt.includes(query)) {
        item.style.display = 'block';
        matchCount++;
      } else {
        item.style.display = 'none';
      }
    });
  } else {
    suggestions.style.display = 'none';
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === "Escape") closeOverlay();
});

overlay.addEventListener('click', (e) => {
  if (!container.contains(e.target)) closeOverlay();
});

function closeOverlay() {
  overlay.style.display = 'none';
  input.value = '';
  suggestions.style.display = 'none';
  suggestionItems.forEach(item => item.style.display = 'block');
}