import { createSignal } from "solid-js";
import { ConsoleTitlebar } from "./ConsoleTitlebar";
import { ConsoleContent } from "./ConsoleContent";

export function ConsoleWindow() {
  let windowRef: HTMLDivElement | undefined;
  const [width, setWidth] = createSignal(900);
  const [height, setHeight] = createSignal(600);
  const [pos, setPos] = createSignal({ x: 600, y: 200 });

  const startDrag = (e: PointerEvent) => {
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);

    const startX = e.clientX - pos().x;
    const startY = e.clientY - pos().y;

    const onPointerMove = (ev: PointerEvent) => {
      requestAnimationFrame(() => {
        setPos({ x: ev.clientX - startX, y: ev.clientY - startY });
      });
    };

    const onPointerUp = (ev: PointerEvent) => {
      (ev.target as HTMLElement).releasePointerCapture(ev.pointerId);
      windowRef?.removeEventListener("pointermove", onPointerMove);
      windowRef?.removeEventListener("pointerup", onPointerUp);
    };

    windowRef?.addEventListener("pointermove", onPointerMove);
    windowRef?.addEventListener("pointerup", onPointerUp);
  };

  const startResize = (corner: "right" | "bottom" | "corner", e: PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);

    const startWidth = width();
    const startHeight = height();
    const startX = e.clientX;
    const startY = e.clientY;

    const onPointerMove = (ev: PointerEvent) => {
      requestAnimationFrame(() => {
        if (corner === "right" || corner === "corner") setWidth(Math.max(200, startWidth + (ev.clientX - startX)));
        if (corner === "bottom" || corner === "corner") setHeight(Math.max(150, startHeight + (ev.clientY - startY)));
      });
    };

    const onPointerUp = (ev: PointerEvent) => {
      (ev.target as HTMLElement).releasePointerCapture(ev.pointerId);
      windowRef?.removeEventListener("pointermove", onPointerMove);
      windowRef?.removeEventListener("pointerup", onPointerUp);
    };

    windowRef?.addEventListener("pointermove", onPointerMove);
    windowRef?.addEventListener("pointerup", onPointerUp);
  };

  return (
    <div
      ref={windowRef}
      style={{
        width: `${width()}px`,
        height: `${height()}px`,
        transform: `translate(${pos().x}px, ${pos().y}px)`,
        position: 'absolute',
      }}
      class="flex flex-col flex-1 bg-[#5F5847DD] rounded-xl pointer-events-auto relative"
    >
      <ConsoleTitlebar onPointerDown={startDrag} />
      <ConsoleContent/>
      <div
        onPointerDown={(e) => startResize("right", e)}
        class="absolute top-0 right-0 h-full w-2 cursor-ew-resize"
      />
      <div
        onPointerDown={(e) => startResize("bottom", e)}
        class="absolute bottom-0 left-0 w-full h-2 cursor-ns-resize"
      />
      <div
        onPointerDown={(e) => startResize("corner", e)}
        class="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize"
      />
    </div>
  )
}
