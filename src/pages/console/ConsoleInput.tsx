import { runCommand } from "@/features/gmodbackwardsapi/console";
import { LucideSendHorizontal } from "lucide-solid";

// todo: figure out how to replace default console with this one
export function ConsoleInput() {
  let inputRef: HTMLInputElement | undefined;

  const onSend = async () => {
    const value = inputRef!.value;

    if (!value)
      return;

    await runCommand(value);
    inputRef!.value = "";
    inputRef!.focus();
  };

  const onKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div
      class="flex gap-x-3 rounded-b-xl bg-[#454033] p-3 px-4 cursor-text"
      onClick={() => inputRef?.focus()}
    >
      <input
        ref={inputRef}
        class="flex-1 bg-[#454033] placeholder:text-[#67604E] text-[#E1CB95] focus:outline-none"
        placeholder="Command..."
        onKeyPress={onKeyPress}
      />

      <button
        class="text-[#E1CB95] hover:text-[#B8A578] cursor-pointer transition"
        onClick={onSend}
      >
        <LucideSendHorizontal/>
      </button>
    </div>
  );
}