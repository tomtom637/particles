type IParticle = {
  x: number;
  y: number;
  dx: number;
  dy: number;
  color: string;
  radius: number;
};

export default class Particle {
  x: number;
  y: number;
  dx: number;
  dy: number;
  color: string;
  radius: number;
  constructor({ x, y, dx, dy, color, radius }: IParticle) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.color = color;
    this.radius = radius;
  }
  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  update(canvas: HTMLCanvasElement) {
    this.x += this.dx;
    this.y += this.dy;
    if (this.x > canvas.width && this.dx > 0) {
      this.dx = -this.dx;
    }
    if (this.x < 0 && this.dx < 0) {
      this.dx = -this.dx;
    }
    if (this.y > canvas.height && this.dy > 0) {
      this.dy = -this.dy;
    }
    if (this.y < 0 && this.dy < 0) {
      this.dy = -this.dy;
    }
    if (Math.abs(this.dx) > 1.5) {
      this.dx *= 0.97;
    }
    if (Math.abs(this.dy) > 1.5) {
      this.dy *= 0.97;
    }
  }
}