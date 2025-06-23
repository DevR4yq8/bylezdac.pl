gsap.registerPlugin(ScrollTrigger);

const canvas = document.querySelector('canvas.webgl');

if (canvas) {
    const scene = new THREE.Scene();
    const sizes = { width: window.innerWidth, height: window.innerHeight };

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0x00ffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const particlesGeometry = new THREE.BufferGeometry();
    const count = 5000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 20;
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.025, sizeAttenuation: true, color: 0xffffff, blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    const loader = new THREE.GLTFLoader();
    loader.load(
        'https://cdn.jsdelivr.net/gh/brijesh-1804/3d-model-car-threejs@main/public/models/dodge/scene.glb',
        (gltf) => {
            const carModel = gltf.scene;
            carModel.scale.set(1.5, 1.5, 1.5);
            carModel.position.y = -0.5;
            scene.add(carModel);
        }
    );

    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
    camera.position.z = 5;
    scene.add(camera);

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".section-hero",
            start: "top top",
            end: "bottom top",
            scrub: 1,
        }
    });
    tl.to(particles.rotation, { x: 1, y: 2, ease: "power1.inOut" }, 0);
    tl.to(camera.position, { z: 8, ease: "power1.inOut" }, 0);

    gsap.from('.project-card', {
        scrollTrigger: { trigger: '.projects-grid', start: 'top 80%' },
        duration: 1, y: 100, opacity: 0, stagger: 0.2, ease: 'power3.out'
    });

    const clock = new THREE.Clock();
    const animate = () => {
        particles.rotation.y += 0.0005;
        renderer.render(scene, camera);
        window.requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener('resize', () => {
        sizes.width = window.innerWidth;
        sizes.height = window.innerHeight;
        camera.aspect = sizes.width / sizes.height;
        camera.updateProjectionMatrix();
        renderer.setSize(sizes.width, sizes.height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
}