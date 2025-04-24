import { initScene } from './scene.js';
import { loadProjects } from './projects.js';
import { setupScrollAnimations } from './animations.js';

document.addEventListener('DOMContentLoaded', async () => {
    initScene();
    try {
        await loadProjects(); 
    } catch (error) {
        console.error("Nie udało się załadować projektów:", error);
    }
    setupScrollAnimations();
});
