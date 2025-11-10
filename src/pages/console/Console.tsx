import { ConsoleWindow } from "./ConsoleWindow";

export function Console() {
  return (
    <div class="absolute inset-0 pointer-events-none">
      <ConsoleWindow/>
    </div>
  )
}