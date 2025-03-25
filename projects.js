const projects = [
    {
        id: 1,
        title: "Bio",
        description: "",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTenW8tUjyBkLysQSrzLQo-_GtJ4diMDDFXFw&s",
        url: "https://bio.bylezdac.pl"
    },
    {
        id: 2,
        title: "AI",
        description: "Najczęściej nie działa, bo nie mam serwera. Postawione na dockerze.",
        image: "https://imgs.search.brave.com/7rnvLHT0ocrk9oM6uN_2onFNjv05V9PX2sjzNXmTDpQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9leHRl/cm5hbC1wcmV2aWV3/LnJlZGQuaXQvb2xs/YW1hLW5vdy1vZmZp/Y2lhbC1zdXBwb3J0/cy1sbGFtYS0zLTIt/dmlzaW9uLXYwLXMw/RDdpNFJjbzB0cldo/OUJ1MXVFa2dub0pK/TEEzVU5LVUE5dnM1/N3NlSUkuanBnP3dp/ZHRoPTY0MCZjcm9w/PXNtYXJ0JmF1dG89/d2VicCZzPWU1MDY2/Y2MwNjU2N2E3NGM0/YWYzYTJiMDg1MDky/NTk0MTllZmI4ZmU",
        url: "https://ai.bylezdac.pl"
    },
    {
        id: 3,
        title: "Projekt 3",
        description: "Wkrótce...",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
        url: "https://bylezdac.pl"
    }
];

export function loadProjects() {
    const projectsContainer = document.getElementById('projects');

    projects.forEach(project => {
        const card = createProjectCard(project);
        projectsContainer.appendChild(card);
    });
}

function createProjectCard(project) {
    const card = document.createElement('article');
    card.className = 'project-card';

    // Add click event listener to the card
    card.addEventListener('click', () => {
        window.location.href = project.url;
    });

    card.innerHTML = `
        <div class="project-content">
            <img src="${project.image}" alt="${project.title}" class="project-image">
            <div class="project-info">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="visit-link">Visit Project →</div>
            </div>
        </div>
    `;

    return card;
}