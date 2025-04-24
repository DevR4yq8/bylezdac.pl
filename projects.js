// UWAGA: Użycie nieoficjalnego API dla przypiętych repozytoriów dla uproszczenia.
// W środowisku produkcyjnym rozważ użycie oficjalnego API GitHub GraphQL.
const GITHUB_USERNAME = 'DxRayq';
const PINNED_REPOS_API_URL = `https://gh-pinned-repos.egoist.dev/?username=${GITHUB_USERNAME}`;
const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;

// Funkcja do pobierania przypiętych repozytoriów
async function fetchPinnedRepos() {
    try {
        const response = await fetch(PINNED_REPOS_API_URL);
        if (!response.ok) {
            throw new Error(`Błąd HTTP! status: ${response.status}`);
        }
        const repos = await response.json();
        // console.log("Pobrane repozytoria:", repos); // Do debugowania
        return repos;
    } catch (error) {
        console.error("Nie można pobrać przypiętych repozytoriów:", error);
        return []; // Zwróć pustą tablicę w przypadku błędu
    }
}

// Funkcja do ładowania projektów do DOM
export async function loadProjects() {
    const projectsContainer = document.getElementById('projects');
    if (!projectsContainer) return; // Wyjdź, jeśli kontener nie został znaleziony

    projectsContainer.innerHTML = ''; // Wyczyść istniejącą zawartość statyczną, jeśli istnieje

    const pinnedRepos = await fetchPinnedRepos();

    if (pinnedRepos.length === 0) {
        projectsContainer.innerHTML = '<p style="text-align: center; grid-column: 1 / -1; opacity: 0.8;">Nie można załadować przypiętych projektów. Odwiedź GitHub bezpośrednio.</p>';
        // Opcjonalnie dodaj tutaj również link "Zobacz więcej"
        addMoreProjectsLink(projectsContainer.parentNode); // Dodaj link nawet jeśli pobieranie się nie powiedzie
        return;
    }

    pinnedRepos.forEach(repo => {
        // Zmapuj dane z API na strukturę potrzebną dla createProjectCard
        const projectData = {
            title: repo.repo,
            // Użyj opisu repozytorium, zapewnij tekst zastępczy
            description: repo.description || 'Brak opisu.',
            // Użyj obrazka Open Graph, jeśli jest dostępny, zapewnij domyślny/zastępczy
            image: repo.image || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80', // Obraz zastępczy
            // Użyj linku do repozytorium
            url: repo.link
        };
        const card = createProjectCard(projectData);
        projectsContainer.appendChild(card);
    });

    // Dodaj link "Zobacz więcej projektów" po siatce projektów
    // Zakładając, że projectsContainer jest bezpośrednim dzieckiem sekcji
    addMoreProjectsLink(projectsContainer.parentNode);
}

// Funkcja tworząca pojedynczy element karty projektu
function createProjectCard(project) {
    const card = document.createElement('article');
    card.className = 'project-card';

    // Dodaj nasłuchiwacz zdarzeń kliknięcia do karty, aby nawigować do URL projektu
    card.addEventListener('click', () => {
        window.open(project.url, '_blank'); // Otwórz w nowej karcie
    });

    // Domyślny obrazek, jeśli pobrany nie załaduje się poprawnie
    const fallbackImage = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80';

    card.innerHTML = `
        <div class="project-content">
            <img
                src="${project.image}"
                alt="${project.title}"
                class="project-image"
                onerror="this.onerror=null;this.src='${fallbackImage}';" <!-- Obsługa błędów ładowania obrazka -->
            >
            <div class="project-info">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="visit-link">Odwiedź Projekt →</div> <!-- Przetłumaczony tekst linku -->
            </div>
        </div>
    `;

    return card;
}

// Funkcja dodająca link "Zobacz więcej"
function addMoreProjectsLink(containerElement) {
    // Sprawdź, czy link już istnieje
    if (containerElement.querySelector('.view-more-section')) {
        return;
    }

    const viewMoreSection = document.createElement('div');
    // Dodaj klasę container dla spójnej szerokości
    viewMoreSection.className = 'view-more-section container';
    viewMoreSection.innerHTML = `
        <a href="${GITHUB_PROFILE_URL}?tab=repositories" target="_blank" class="view-more-link">
            Zobacz więcej projektów na GitHub → <!-- Przetłumaczony tekst linku -->
        </a>
    `;
    // Dodaj po kontenerze siatki projektów
    containerElement.appendChild(viewMoreSection);
}
