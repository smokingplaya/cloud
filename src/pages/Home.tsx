import { gamemodeDetails } from "@/features/gmodbackwardsapi/gamemodes";
import { useUiCommand } from "@/features/lua";
import { ImageButton, LanguageButton } from "@/shared/ui/Button";
import { LucideBlocks, LucideDoorOpen, LucideSettings } from "lucide-solid";

export function HomePage() {
  const { currentGamemode } = gamemodeDetails;

  return (
      <div class="w-80 h-full flex flex-col justify-center">
        <div class="flex flex-col space-y-12">
          {/* todo make asset src great again */}
          <img class="px-6" src={`asset://garrysmod/gamemodes/${currentGamemode()}/logo.png`}/>
          <div class="flex flex-col space-y-9">
            <div class="flex flex-col space-y-4">
              <LanguageButton href="/newgame" placeholder="Start New Game">new_game</LanguageButton>
              <LanguageButton href="/servers" placeholder="Find Multiplayer Game">find_mp_game</LanguageButton>
            </div>

            <div class="flex flex-row w-full gap-4">
              <ImageButton class="flex-1">{LucideBlocks}</ImageButton>
              <ImageButton onClick={() => useUiCommand("OpenOptionsDialog")} class="flex-1">{LucideSettings}</ImageButton>
              <ImageButton onClick={() => useUiCommand("Quit")} class="flex-1">{LucideDoorOpen}</ImageButton>
            </div>
          </div>
        </div>
      </div>
  )
}