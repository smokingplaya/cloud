import { createSignal } from "solid-js"
import { gamemodeDetails, gamemodeListDetails, getGamemodeTitle } from "@/features/gmodbackwardsapi/gamemodes"
import { Menu as LucideMenu } from "lucide-solid"
import { mapStore } from "@/features/gmodbackwardsapi/maps";
import { GameMap, GameMapGrid } from "@/widgets/GameMap";

export function NewGamePage() {
  const [openSidebar, setSidebarOpen] = createSignal(false)

  const { currentGamemode } = gamemodeDetails
  const gamemode = currentGamemode()
  const title = getGamemodeTitle(gamemode)!

  const { maplistStore } = mapStore;
  const maps = maplistStore[title] || {};
  const mapCount = Object.keys(maps).length;

  return (
    <main class="flex size-full rounded-2xl bg-[#5F5847AD] relative overflow-hidden p-12 space-x-4">
      {/* Sidebar */}
      <div class="h-full flex items-start">
        <button class="cursor-pointer">
          <LucideMenu class="text-[#E1CB94] hover:text-[#E1CB94A6] transition w-11 h-11"/>
        </button>
      </div>
      {/* Maps */}
      <div class="flex flex-col size-full space-y-4">
        {/* Maps header */}
        <div class="w-full h-auto py-2">
          <div class="flex flex-col space-y-2">
            <span class="text-4xl text-[#E1CB95] font-medium leading-6">{title}</span>
            <span class="text-2xl text-[#9E8F6B]">{mapCount} maps available</span>
          </div>
        </div>
        {/* Map list */}
        <GameMapGrid>
          {maps.map(map => {
            return <GameMap>{map}</GameMap>
          })}
        </GameMapGrid>
      </div>
    </main>
  )
}

// <div class="flex flex-col">
//   <span class="text-4xl text-[#E1CB95] font-medium">{title}</span>
//   <span class="text-2xl text-[#9E8F6B]">0 maps available</span>
// </div>