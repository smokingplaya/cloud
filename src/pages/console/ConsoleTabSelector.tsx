import { Button } from "@/shared/ui/Button";
import type { Accessor, JSXElement } from "solid-js";

export function ConsoleTabSelector({ children }: { children?: JSXElement }) {
  return (
    <div class="flex px-4.5 gap-x-1.5">
      { children }
    </div>
  )
}

export function ConsoleTabButton({ children, selected, onClick, name }: { children: JSXElement, selected: Accessor<string>, onClick?: () => void, name: string }) {
  const isSelected = () => selected() === name;

  return (
    <Button
      class={`text-base px-3 py-0.5 uppercase ${ isSelected() ? "" : "" } not-hover:opacity-50`}
      onClick={onClick}
    >
      { isSelected() ? "" : "" } {children}
    </Button>
  );
}