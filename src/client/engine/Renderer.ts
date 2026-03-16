/* export default class Renderer {
  private ctx: CanvasRenderingContext2D;
  private running = false;

  private segments: any[] = [];
  private entities: any[] = [];

  constructor(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas context not found");
    
    this.ctx = ctx;
  }
  // TODO

  start() {
    this.running = true;
    requestAnimationFrame(() => this.render());
  }
  stop() {
    this.running = false;
  }

  setWorldData(segments: any[], entities: any[]) {
    this.segments = segments;
    this.entities = entities;
  }

  private render() {
    if (!this.running) return;

    const ctx = this.ctx;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    requestAnimationFrame(() => this.render());
  }

  private drawSegments() {
    const ctx = this.ctx;

    for (const seg of this.segments) {
      ctx.fillStyle = "gray";

      ctx.fillRect(
        seg.position.x,
        seg.position.y,
        seg.width,
        seg.height
      );
    }
  }
} */