import Particle from "./Particle";

const particles: Particle[] = [];
const particleCount = 3000;
const colors = ["#f72585", "#b5179e", "#7209b7", "#560bad", "#480ca8"] as const;
let mouseX: number;
let mouseY: number;

function buildParticles(canvas: HTMLCanvasElement) {
  particles.length = 0;
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      dx: Math.random() * 2 - 1,
      dy: Math.random() * 2 - 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      radius: Math.random() * 18,
    }));
  }
}

const mousePositions: { x: number; y: number; }[] = [];

// Exports the requestAnimationFrame function so it can be canceled from a useEffect cleanup
export let animationFrame: number;

// Exports the resize function so it can be removed from a useEffect cleanup
export function listenToResize(canvas: HTMLCanvasElement) {
  canvas.width = window.innerWidth * 2;
  canvas.height = window.innerHeight * 2;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
}

// Exports the mouseMove function so it can be removed from a useEffect cleanup
export function mouseMove(e: MouseEvent, particles: Particle[]) {
  mouseX = e.clientX;
  mouseY = e.clientY;

  mousePositions.push({ x: mouseX, y: mouseY });

  if (mousePositions.length > 3) {
    mousePositions.shift();
  }

  if (mousePositions.length !== 3) return;

  const mouseXSpeed = (mousePositions[2]?.x - mousePositions[0]?.x) / 100;
  const mouseYSpeed = (mousePositions[2]?.y - mousePositions[0]?.y) / 100;

  particles.forEach(particle => {
    // Calculates the distance from the mouse to the particle
    const mouseDistance = Math.sqrt(Math.pow(mouseX - (particle.x / 2), 2) + Math.pow(mouseY - (particle.y / 2), 2));

    if ((Math.abs((particle.x / 2) - mouseX) < 50 && Math.abs((particle.y / 2) - mouseY) < 50)) {
      particle.dx += mouseXSpeed * 60 / mouseDistance * 3;
      particle.dy += mouseYSpeed * 60 / mouseDistance * 3;
    }
  });
}

/**
 * 
 * @description Executes canvas logic for a particle effect
 * @param canvas The canvasRef.current
 */
export default function canvasAction(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  listenToResize(canvas);
  buildParticles(canvas);
  window.addEventListener("resize", () => listenToResize(canvas));
  canvas.addEventListener("mousemove", e => mouseMove(e, particles));

  function animate() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
      particle.draw(ctx);
      particle.update(canvas);
    });
    // draws cursor
    ctx.beginPath();
    ctx.arc(mouseX * 2, mouseY * 2, 25, 0, Math.PI * 2, false);
    ctx.fillStyle = "#222";
    ctx.fill();
    animationFrame = requestAnimationFrame(animate);
  }
  animate();
}
