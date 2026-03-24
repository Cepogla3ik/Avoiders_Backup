import { useEffect, useRef } from 'react';
import Renderer from '@client/engine/Renderer';
import { setRenderer } from "@client/engine/rendererStore";
import styles from './Game.module.scss';
import { applyPendingInit, connect } from "@client/network/socket.ts";

export default function Game() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rendererRef = useRef<Renderer | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new Renderer(canvas);
    rendererRef.current = renderer;
    
    setRenderer(renderer);
    
    connect();
    applyPendingInit(renderer);

    renderer.start();

    return () => {
      renderer.stop();
      rendererRef.current = null;
      setRenderer(null);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
    />
  );
}
