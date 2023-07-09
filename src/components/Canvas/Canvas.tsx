import { useRef, useEffect } from "react";
import canvasAction, {
  listenToResize,
  mouseMove,
  animationFrame,
} from "./canvasAction";

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvasAction(canvas);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", () => listenToResize);
      canvas.removeEventListener("mousemove", () => mouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} />;
}
