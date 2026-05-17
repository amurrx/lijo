import * as THREE from 'https://unpkg.com/three@0.164.1/build/three.module.js';

const canvas = document.getElementById('bg3d');
if (canvas) {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 100);
  camera.position.set(0, 1.3, 5.5);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

  const key = new THREE.PointLight(0xff273c, 12, 20); key.position.set(2, 3, 4);
  const rim = new THREE.PointLight(0xffffff, 4, 20); rim.position.set(-3, 2, -4);
  scene.add(key, rim);

  const floor = new THREE.Mesh(new THREE.CircleGeometry(10, 64), new THREE.MeshStandardMaterial({ color: 0x0b0b0f, metalness: 0.95, roughness: 0.15 }));
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);

  const orb = new THREE.Mesh(new THREE.IcosahedronGeometry(1.2, 1), new THREE.MeshStandardMaterial({ color: 0xbb1020, metalness: 0.7, roughness: 0.18 }));
  orb.position.y = 1.25;
  scene.add(orb);

  const stars = new THREE.Points(
    new THREE.BufferGeometry().setAttribute('position', new THREE.Float32BufferAttribute(Array.from({ length: 1200 }, () => (Math.random() - 0.5) * 30), 3)),
    new THREE.PointsMaterial({ color: 0xffffff, size: 0.028 })
  );
  scene.add(stars);

  const clock = new THREE.Clock();
  function animate() {
    const t = clock.getElapsedTime();
    orb.rotation.y += 0.005;
    orb.position.y = 1.25 + Math.sin(t * 1.2) * 0.12;
    stars.rotation.y = t * 0.03;
    camera.position.x += (mouse.x * 0.55 - camera.position.x) * 0.03;
    camera.position.y += ((1.3 + mouse.y * 0.25) - camera.position.y) * 0.03;
    camera.lookAt(0, 1.1, 0);
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  const mouse = { x: 0, y: 0 };
  addEventListener('pointermove', e => { mouse.x = (e.clientX / innerWidth - 0.5) * 2; mouse.y = -(e.clientY / innerHeight - 0.5) * 2; });
  addEventListener('resize', () => { camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth, innerHeight); });
  animate();
}
