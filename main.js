import { initScene } from './scene.js';
import { loadProjects } from './projects.js';
import { setupScrollAnimations } from './animations.js';

// Initialize all modules
document.addEventListener('DOMContentLoaded', () => {
    initScene();
    loadProjects();
    setupScrollAnimations();
});