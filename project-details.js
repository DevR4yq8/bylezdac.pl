import { getProjectById } from './projects.js';

function loadProjectDetails() {
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('id');

    if (!projectId) {
        window.location.href = '../index.html';
        return;
    }

    const project = getProjectById(parseInt(projectId));
    if (!project) {
        window.location.href = '../index.html';
        return;
    }

    const projectContent = document.getElementById('project-content');
    projectContent.innerHTML = `
        <a href="../index.html" class="back-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Projects
        </a>
        
        <div class="project-header">
            <h1 class="project-title">${project.title}</h1>
        </div>

        <img src="${project.image}" alt="${project.title}" class="project-image">

        <div class="project-details">
            <div class="project-description">
                ${project.fullDescription}
            </div>
            
            <div class="technologies">
                <h2 class="text-xl font-bold mb-4">Technologies Used</h2>
                <div class="flex flex-wrap gap-2">
                    ${project.technologies.map(tech => `
                        <span class="px-3 py-1 bg-white/10 rounded-full text-sm">
                            ${tech}
                        </span>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

document.addEventListener('DOMContentLoaded', loadProjectDetails);