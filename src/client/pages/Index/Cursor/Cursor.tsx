import { useEffect, useRef, useState } from "react";
import styles from "./Cursor.module.scss";

// Тип для одной частицы следа
interface TrailPoint {
  x: number;
  y: number;
  id: number;
}

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const speed = 0.35;

  const [trails, setTrails] = useState<TrailPoint[]>([]);
  
  const lastTrailPos = useRef({ x: 0, y: 0 });

  const trailDistance = 7.5;
  const stayDuration = 150;
  const fadeDuration = 650;

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      targetPos.current.x = e.clientX;
      targetPos.current.y = e.clientY;

      const dist = Math.hypot(
        e.clientX - lastTrailPos.current.x,
        e.clientY - lastTrailPos.current.y
      );

      if (dist > trailDistance) {
        lastTrailPos.current = { x: e.clientX, y: e.clientY };
        
        const newPoint: TrailPoint = {
          x: e.clientX,
          y: e.clientY,
          id: Date.now() + Math.random(),
        };

        setTrails((prev) => [...prev, newPoint].slice(-20)); 
      }
    };

    let requestRef: number;
    const animate = () => {
      const distX = targetPos.current.x - currentPos.current.x;
      const distY = targetPos.current.y - currentPos.current.y;
      currentPos.current.x += distX * speed;
      currentPos.current.y += distY * speed;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;
      }
      requestRef = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", mouseMove);
    requestRef = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      cancelAnimationFrame(requestRef);
    };
  }, []);

  const removeTrail = (id: number) => {
    setTrails((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <>
      {trails.map((trail) => (
        <div
          key={trail.id}
          className={styles["trail-dot"]}
          style={{
            left: trail.x,
            top: trail.y,
            animationDuration: `${fadeDuration}ms`,
            animationDelay: `${stayDuration}ms`,
          }}
          onAnimationEnd={() => removeTrail(trail.id)}
        />
      ))}

      <div className={styles["cursor"]} ref={cursorRef}></div>
    </>
  );
}