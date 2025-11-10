import { createSignal, For } from "solid-js";
import { ConsoleTabButton, ConsoleTabSelector } from "./ConsoleTabSelector";
import { ConsoleTabLogs } from "./tabs/ConsoleTabLogs";
import { ConsoleTabLua } from "./tabs/ConsoleTabLua";
import { ConsoleTabNetwork } from "./tabs/ConsoleTabNetwork";

const tabs = [
  { name: "Logs", component: ConsoleTabLogs },
  { name: "Network", component: ConsoleTabNetwork },
  { name: "Lua", component: ConsoleTabLua },
];

export function ConsoleContent() {
  const [selectedTab, setSelectedTab] = createSignal(tabs[0].name);

  const currentTab = () => tabs.find(t => t.name === selectedTab());

  return (
    <div class="flex flex-col flex-1">
      <ConsoleTabSelector>
        <For each={tabs}>
          {(tab) => (
            <ConsoleTabButton
              name={tab.name}
              selected={selectedTab}
              onClick={() => setSelectedTab(tab.name)}
            >
              {tab.name}
            </ConsoleTabButton>
          )}
        </For>
      </ConsoleTabSelector>

      <div class="flex flex-1 mt-4">
        {(() => {
          const Component = currentTab()?.component;
          return Component ? <Component /> : null;
        })()}
      </div>
    </div>
  );
}