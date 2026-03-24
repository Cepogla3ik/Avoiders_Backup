import type { Vec2Like } from "@shared/utils/Vec2Like";

interface SegmentData {
  position: Vec2Like;
  width: number;
  height: number;
}

interface EntityData {
  position: Vec2Like;
  radius: number;
  color?: string;
}

export default class Renderer {
  private ctx: CanvasRenderingContext2D;
  private running = false;

  private segments: SegmentData[] = [];
  private entities: EntityData[] = [];

  constructor(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas context not found");
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    this.resize(canvas);
    window.addEventListener("resize", () => this.resize(canvas));
    
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
  resize(canvas: HTMLCanvasElement) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  setWorldData(segments: SegmentData[], entities: EntityData[]) {
    console.log("SET WORLD DATA:", segments);
    
    this.segments = segments;
    this.entities = entities;
  }
  
  updateEntities(entities: EntityData[]) {
    this.entities = entities;
  }

  private render() {
    if (!this.running) return;

    const ctx = this.ctx;
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    
    this.drawSegments();

    requestAnimationFrame(() => this.render());
  }

  private drawSegments() {
    const ctx = this.ctx;
    const segScale: number = 10;

    for (const seg of this.segments) {
      const { position, width, height } = seg;
      const { x: segX, y: segY } = position;
      
      const segWidth: number = width / segScale;
      const segHeight: number = height / segScale;
      
      ctx.fillStyle = "gray";
      ctx.fillRect(segX, segY, segWidth*10, segHeight*10);
      
      ctx.strokeStyle = "dimgray";
      const segStrokeWidth: number = 2;
      for (let h = 0; h < segWidth + 1; h++) {
        ctx.beginPath();
        ctx.lineWidth = segStrokeWidth;
        
        ctx.moveTo(segX + h*10, segY);
        ctx.lineTo(segX + h*10, segY + height);
        ctx.stroke();
      }
    }
  }
}