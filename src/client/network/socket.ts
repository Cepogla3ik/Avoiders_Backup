import { getRenderer } from "../engine/rendererStore";

let ws: WebSocket | null = null;
let pendingInit = null;

export function connect() {
  const protocol = location.protocol === "https:" ? "wss" : "ws";
  ws = new WebSocket(`${protocol}://${location.host}/ws`);

  ws.addEventListener("open", () => console.log("connected"));

  ws.addEventListener("message", (event) => {
    const data = JSON.parse(event.data);
    const renderer = getRenderer();

    if (data.type === "init") {
      console.log("INIT DATA:", data.area.segments);
      
      if (!renderer) {
        pendingInit = data;
        return;
      }

      renderer.setWorldData(data.area.segments, data.entities);
    }

    if (data.type === "update") {
      if (!renderer) return;
      renderer.updateEntities(data.entities);
    }
  });

  ws.addEventListener("close", () => console.log("disconnected"));
  ws.addEventListener("error", (e) => console.error("ws error", e));
}

export function applyPendingInit(renderer: Renderer) {
  if (pendingInit) {
    renderer.setWorldData(pendingInit.area.segments, pendingInit.entities);
    pendingInit = null;
  }
}

let mouseX = 0;
let mouseY = 0;

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

setInterval(() => {
  if (!ws || ws.readyState !== WebSocket.OPEN) return;

  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  let dx = mouseX - centerX;
  let dy = mouseY - centerY;

  const length = Math.sqrt(dx * dx + dy * dy);
  if (length > 0) {
    dx /= length;
    dy /= length;
  }

  ws.send(JSON.stringify({ direction: { x: dx, y: dy } }));
}, 16);