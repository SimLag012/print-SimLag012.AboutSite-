// --- THREE.JS BACKGROUND ---
const canvas = document.querySelector('#bg-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// Geometry: A torus with a wireframe for a techy look
const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const material = new THREE.MeshBasicMaterial({ 
    color: 0x00f2ff, 
    wireframe: true, 
    transparent: true, 
    opacity: 0.15 
});
const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);

// Particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 1500;
const posArray = new Float32Array(particlesCount * 3);

for(let i=0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 100;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.05,
    color: 0xbc00ff,
    transparent: true,
    opacity: 0.8
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Mouse Interaction
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

function animate() {
    requestAnimationFrame(animate);

    torusKnot.rotation.x += 0.005;
    torusKnot.rotation.y += 0.005;

    particlesMesh.rotation.y = mouseX * 0.0001;
    particlesMesh.rotation.x = -mouseY * 0.0001;

    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// --- GSAP ANIMATIONS ---
gsap.registerPlugin(ScrollTrigger);

// Loader
window.addEventListener('load', () => {
    const tl = gsap.timeline();
    
    tl.to('.progress', { width: '100%', duration: 1.5, ease: 'power4.inOut' })
      .to('#loader', { y: '-100%', duration: 1, ease: 'expo.inOut' })
      .from('.nav-links li', { y: -50, opacity: 0, stagger: 0.1, duration: 0.8, ease: 'back.out(1.7)' }, '-=0.5')
      .from('.hero-content h1', { scale: 0.8, opacity: 0, duration: 1.2, ease: 'expo.out' }, '-=0.5')
      .from('.hero-content p, .cta-group', { y: 30, opacity: 0, stagger: 0.2, duration: 0.8 }, '-=0.8');
});

// Scroll Reveals
const reveals = document.querySelectorAll('.reveal');
reveals.forEach((el) => {
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
});

// Project Cards Stagger
gsap.from('.project-card', {
    scrollTrigger: {
        trigger: '.project-grid',
        start: 'top 80%'
    },
    y: 100,
    opacity: 0,
    stagger: 0.15,
    duration: 1,
    ease: 'power4.out'
});

// Tilt Initialization
VanillaTilt.init(document.querySelectorAll(".project-card"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
});
