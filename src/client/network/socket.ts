import { getRenderer } from "../engine/rendererStore";

const protocol = location.protocol === "https:" ? "wss" : "ws";
const ws = new WebSocket(`${protocol}://${location.host}/ws`);

ws.addEventListener("open", () => console.log("connected"));

ws.addEventListener("message", (event) => {
  const data = JSON.parse(event.data);

  const renderer = getRenderer();
  if (!renderer) return;
  
  if (data.type === "init") renderer.setWorldData(data.area.segments, data.entities);
  
  if (data.type === "update") renderer.updateEntities(data.entities);
  
  console.log("RECEIVE:", data);
});


let mouseX = 0;
let mouseY = 0;

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

setInterval(() => {
  if (ws.readyState !== WebSocket.OPEN) return;

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


ws.addEventListener("close", () => console.log("disconnected"));
ws.addEventListener("error", (e) => console.error("ws error", e));

export default ws;