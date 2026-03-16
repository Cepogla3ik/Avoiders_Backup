import GameWorld from "@server/GameWorld/GameWorld";

export default class Renderer {
  constructor(canvas: HTMLCanvasElement) {
    canvas.getContext("2d");
  }
  // TODO

  start() {
    const gameWorld = new GameWorld();
    console.log("CanvasGame launched!", gameWorld);
  }
  stop() {
    console.log("CanvasGame stopped");
  }
}