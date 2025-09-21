import type { JSXElement } from "solid-js";

type GameMapDetails = {
  title: string,
  kind: string,
  base: string
};

function deserializeGameMapName(base: string): GameMapDetails {
  const parts = base.split("_");
  const kind = parts[0].toUpperCase();
  const titleParts = parts.slice(1).map(p => p[0].toUpperCase() + p.slice(1));
  return {
    title: titleParts.join(" "),
    kind,
    base
  };
}

export function GameMap({ children }: { children: string }) {
  const details = deserializeGameMapName(children);

  return (
    <div class="group relative cursor-pointer rounded-2xl overflow-hidden aspect-square">
      <div
        class="w-full h-full bg-black bg-cover bg-center transform transition duration-500 ease-out scale-100 saturate-[25%] group-hover:scale-110 group-hover:saturate-100"
        style={{ "background-image": `url(asset://mapimage/${children})` }}
      ></div>

      <div class="absolute inset-0 p-4 flex flex-col justify-between">
        <div class="flex justify-end">
          <span class="text-xs font-medium px-1.5 py-1 rounded-lg text-[#E1CB95] bg-[#e1cb9532]">
            {details.kind}
          </span>
        </div>
        <div class="flex">
          <span class="text-xl font-medium text-white leading-5">
            {details.title}
          </span>
        </div>
      </div>
    </div>
  )
}

export function GameMapGrid({ children }: { children: JSXElement }) {
  return (
    <div
      class="grid gap-4 grid-cols-[repeat(auto-fit,minmax(12rem,1fr))]"
    >
      {children}
    </div>
  )
}