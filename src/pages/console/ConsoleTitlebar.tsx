import { LucideTerminal, LucideX } from "lucide-solid";
import { createEffect, createSignal } from "solid-js";

export function ConsoleTitlebar({ onPointerDown }: { onPointerDown: (e: PointerEvent) => void }) {
  const [title, setTitle] = createSignal("");

  createEffect(async () => {
    setTitle("Developer console"); // todo get phrase of it
    // setTitle(await getPhrase(""));
  });

  return (
    <div
      class="flex justify-between p-4.5 pb-4"
      onPointerDown={onPointerDown}
    >
      <span class="flex text-base text-[#E1CB95] gap-x-2.5 uppercase"><LucideTerminal/> {title()}</span>
      <button class="bg-none text-[#E1CB95] hover:text-[#B8A578] cursor-pointer transition"><LucideX/></button>
    </div>
  )
}