const GITHUB_USERNAME = 'DxRayq';
const PINNED_REPOS_API_URL = `https://gh-pinned-repos.egoist.dev/?username=${GITHUB_USERNAME}`;
const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;

async function fetchPinnedRepos() {
    try {
        const response = await fetch(PINNED_REPOS_API_URL);
        if (!response.ok) {
            throw new Error(`Błąd HTTP! status: ${response.status}`);
        }
        const repos = await response.json();
        return repos;
    } catch (error) {
        console.error("Nie można pobrać przypiętych repozytoriów:", error);
        return [];
    }
}

export async function loadProjects() {
    const projectsContainer = document.getElementById('projects');
    if (!projectsContainer) return;

    projectsContainer.innerHTML = '';

    const pinnedRepos = await fetchPinnedRepos();

    if (pinnedRepos.length === 0) {
        projectsContainer.innerHTML = '<p style="text-align: center; grid-column: 1 / -1; opacity: 0.8;">Nie można załadować przypiętych projektów. Odwiedź GitHub bezpośrednio.</p>';
        addMoreProjectsLink(projectsContainer.parentNode); 
        return;
    }

    pinnedRepos.forEach(repo => {
        const projectData = {
            title: repo.repo,
            description: repo.description || 'Brak opisu.',
            image: repo.image || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80',
            url: repo.link
        };
        const card = createProjectCard(projectData);
        projectsContainer.appendChild(card);
    });

    addMoreProjectsLink(projectsContainer.parentNode);
}

function createProjectCard(project) {
    const card = document.createElement('article');
    card.className = 'project-card';

    card.addEventListener('click', () => {
        window.open(project.url, '_blank');
    });

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

function addMoreProjectsLink(containerElement) {
    if (containerElement.querySelector('.view-more-section')) {
        return;
    }

    const viewMoreSection = document.createElement('div');
    viewMoreSection.className = 'view-more-section container';
    viewMoreSection.innerHTML = `
        <a href="${GITHUB_PROFILE_URL}?tab=repositories" target="_blank" class="view-more-link">
            Zobacz więcej projektów na GitHub → <!-- Przetłumaczony tekst linku -->
        </a>
    `;
    containerElement.appendChild(viewMoreSection);
}
