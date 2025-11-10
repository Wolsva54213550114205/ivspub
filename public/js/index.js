document.addEventListener('DOMContentLoaded', () => {
const header = document.querySelector('.header');
const hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', () => {
    header.classList.toggle('expanded');
});
});
window.addEventListener('load', () => {
    const popup = document.getElementById('discordPopup');
    const closeBtn = document.getElementById('closePopup');
    popup.classList.add('active');

    closeBtn.addEventListener('click', () => {
        popup.classList.remove('active');
    });

    popup.addEventListener('click', (e) => {
        if(e.target === popup) {
            popup.classList.remove('active');
        }
    });

});

// ---------------------------
// Gestion des clics internes pour SPA
// ---------------------------
document.addEventListener('click', (e) => {
  const a = e.target.closest('a');
  if (!a) return;

  // Vérifie si le lien est interne
  if (a.href.startsWith(window.location.origin)) {
    e.preventDefault(); // bloque le rechargement
    loadPage(a.pathname);
  }
});

// ---------------------------
// Gestion du bouton "retour/avant" du navigateur
// ---------------------------
window.addEventListener('popstate', () => {
  loadPage(window.location.pathname, false);
});

// ---------------------------
// Fonction pour charger le contenu via fetch
// ---------------------------
async function loadPage(url, push = true) {
  try {
    const res = await fetch(url, { headers: { 'X-Requested-With': 'fetch' } });
    if (!res.ok) throw new Error('Erreur HTTP ' + res.status);

    const htmlText = await res.text();

    // Parser le HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlText, 'text/html');

    // Remplacer le <body>
    document.body.innerHTML = doc.body.innerHTML;

    // Mettre à jour l'URL dans la barre d'adresse
    if (push) history.pushState(null, '', url);

    // Recharger les scripts nécessaires
    reloadScripts(doc);

    // Réinitialiser scroll
    window.scrollTo(0, 0);

  } catch (err) {
    console.error('Erreur chargement page:', err);
  }
}

// ---------------------------
// Fonction pour réexécuter les scripts de la page
// ---------------------------
function reloadScripts(doc) {
  const scripts = doc.querySelectorAll('script');
  scripts.forEach(oldScript => {
    const newScript = document.createElement('script');
    if (oldScript.src) {
      newScript.src = oldScript.src;
      newScript.async = false;
    } else {
      newScript.textContent = oldScript.textContent;
    }
    document.body.appendChild(newScript);
  });
}

// ---------------------------
// Optionnel: Gestion recherche overlay pour /chaines
// ---------------------------
function initSearch() {
  const searchInput = document.getElementById('searchInput');
  const suggestions = document.getElementById('suggestions');
  const overlay = document.getElementById('searchOverlay');

  if (!searchInput || !suggestions || !overlay) return;

  searchInput.addEventListener('input', () => {
    const value = searchInput.value.toLowerCase();
    suggestions.style.display = value ? 'block' : 'none';

    Array.from(suggestions.querySelectorAll('.suggestion')).forEach(s => {
      const alt = s.querySelector('img')?.alt.toLowerCase() || '';
      s.style.display = alt.includes(value) ? 'block' : 'none';
    });
  });

  searchInput.addEventListener('focus', () => overlay.style.display = 'block');
  searchInput.addEventListener('blur', () => setTimeout(() => overlay.style.display = 'none', 200));
}

// ---------------------------
// Initialisation pour la page actuelle
// ---------------------------
document.addEventListener('DOMContentLoaded', () => {
  initSearch();
});
