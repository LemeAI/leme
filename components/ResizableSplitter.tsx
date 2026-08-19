"use client";

import { useEffect, useRef, useState } from "react";

interface ResizableSplitterProps {
  onResize: (delta: number) => void;
  onResizeStart?: () => void;
  onResizeEnd?: () => void;
  className?: string;
}

/**
 * Divisor vertical arrastável para redimensionar painéis lado a lado.
 * A área clicável é maior do que o traço visível para facilitar o uso.
 */
export default function ResizableSplitter({
  onResize,
  onResizeStart,
  onResizeEnd,
  className = "",
}: ResizableSplitterProps) {
  const [isDragging, setIsDragging] = useState(false);
  const lastX = useRef<number | null>(null);

  useEffect(() => {
    if (!isDragging) return;

    function handleMove(clientX: number) {
      if (lastX.current === null) {
        lastX.current = clientX;
        return;
      }
      const delta = clientX - lastX.current;
      if (delta !== 0) {
        onResize(delta);
        lastX.current = clientX;
      }
    }

    function handleMouseMove(e: MouseEvent) {
      handleMove(e.clientX);
    }

    function handleTouchMove(e: TouchEvent) {
      handleMove(e.touches[0].clientX);
    }

    function stop() {
      setIsDragging(false);
      lastX.current = null;
      onResizeEnd?.();
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", stop);
    window.addEventListener("touchcancel", stop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", stop);
      window.removeEventListener("touchcancel", stop);
    };
  }, [isDragging, onResize, onResizeEnd]);

  function start(clientX: number) {
    setIsDragging(true);
    lastX.current = clientX;
    onResizeStart?.();
  }

  return (
    <div
      className={
        "group relative hidden w-4 shrink-0 cursor-col-resize items-center justify-center sm:flex " + className
      }
      onMouseDown={(e) => {
        e.preventDefault();
        start(e.clientX);
      }}
      onTouchStart={(e) => {
        e.preventDefault();
        start(e.touches[0].clientX);
      }}
      role="separator"
      aria-label="Redimensionar painéis"
    >
      <div
        className={
          "h-10 w-1 rounded-full transition-colors " +
          (isDragging ? "bg-brand-500" : "bg-line group-hover:bg-brand-500")
        }
      />
    </div>
  );
}
