gsap.registerPlugin(ScrollTrigger);

// SCENE
const scene = new THREE.Scene();

// CAMERA
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.z = 6;

// RENDERER
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#webgl'),
  alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);

// LIGHT
const light = new THREE.PointLight(0x00ffff, 2);
light.position.set(2, 3, 4);
scene.add(light);

// OBJECT (IMMERSIVE CORE)
const geometry = new THREE.IcosahedronGeometry(2, 1);
const material = new THREE.MeshStandardMaterial({
  color: 0x1111ff,
  wireframe: true
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// MOUSE INTERACTION
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 2;
  const y = (e.clientY / window.innerHeight - 0.5) * 2;

  gsap.to(mesh.rotation, {
    x: y * 2,
    y: x * 2,
    duration: 1
  });
});

// SCROLL ANIMATION
gsap.to(mesh.rotation, {
  y: 10,
  scrollTrigger: {
    trigger: ".scene",
    start: "top top",
    end: "bottom bottom",
    scrub: true
  }
});

// TEXT REVEAL
gsap.utils.toArray(".scene h2").forEach((el) => {
  gsap.to(el, {
    opacity: 1,
    y: -50,
    scrollTrigger: {
      trigger: el,
      start: "top 80%",
      scrub: true
    }
  });
});

// LOOP
function animate() {
  requestAnimationFrame(animate);
  mesh.rotation.x += 0.002;
  renderer.render(scene, camera);
}
animate();