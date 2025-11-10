import { formatTime, getUnixstamp } from "@/features/time";
import { createEffect, createSignal } from "solid-js";
import { ConsoleInput } from "../ConsoleInput";

type ConsoleRowLevel = "debug" | "info" | "warn" | "error";

type ConsoleRowMessage = {
  body: string,
  level: ConsoleRowLevel,
  prefix?: string;
};

type ConsoleRowKindMap = {
  message: ConsoleRowMessage,
  json: object,
  user_input: string;
};

export type ConsoleRow<K extends keyof ConsoleRowKindMap = keyof ConsoleRowKindMap> = {
  [P in K]: { timestamp: number, kind: P; body: ConsoleRowKindMap[P] }
}[K];

export function ConsoleTabLogs() {
  const [rows, setRows] = createSignal<ConsoleRow[]>([]);
  const time = getUnixstamp();

  createEffect(() => {
    setRows([
      // examples
      { timestamp: time, kind: "message", body: { body: "Example message", level: "info" } },
      { timestamp: time, kind: "user_input", body: "lua_run_menu PrintTable(cloud)" },
      { timestamp: time, kind: "message", body: { body: "table 0x022193912", level: "info" } },
      { timestamp: time+1, kind: "message", body: { body: "No brain found", level: "error" } },
      { timestamp: time+1, kind: "message", body: { body: "banned player Jakanta (STEAM_1:0:16741032)", level: "info", prefix: "ulx" } },
      { timestamp: time, kind: "json", body: { console: { execute: "function", clear: "function" } } },
    ])
  });

  return (
    <div class="flex-1 flex flex-col">
      <div class="flex flex-col flex-1 px-4.5 gap-y-0.5 overflow-y-auto overflow-x-hidden">
        {
          rows().map(row => <ConsoleRow>{row}</ConsoleRow>)
        }
      </div>

      <ConsoleInput/>
    </div>
  )
}

function ConsoleRow({ children }: { children: ConsoleRow }) {
  switch (children.kind) {
    case "message":
      return <ConsoleRowMessage prefix={children.body.prefix} timestamp={children.timestamp}>{children.body}</ConsoleRowMessage>
    case "json":
      return <ConsoleRowJSON>{children.body}</ConsoleRowJSON>
    case "user_input":
      return <ConsoleRowUserInput>{children.body}</ConsoleRowUserInput>
  }
}

const mapLevelBackground: Record<ConsoleRowLevel, string> = {
  "debug": "#AEBCD5",
  "info": "#CCD5AE",
  "warn": "#EABC71",
  "error": "#D5AEAE"
};

const mapLevelLabelColor: Record<ConsoleRowLevel, string> = {
  "debug": "#AEBCD5",
  "info": "#C0C4B0",
  "warn": "#EABC71",
  "error": "#D5AEAE"
}

function ConsoleChip({ children, color }: { children?: string, color: string }) {
  // 40 means ~25% of transparency
  return <span class="py-0.5 px-1.5 rounded-lg uppercase" style={{ color: color, background: `${color}40` }}>{children}</span>
}

function ConsoleRowMessage({ children, timestamp, prefix }: { children: ConsoleRowMessage, timestamp: number, prefix?: string }) {
  const formattedTime = formatTime(timestamp);
  const level = children.level;

  return (
    <div class="py-0.5 px-0.5 flex items-center space-x-1 rounded-lg hover:bg-black/30 transition cursor-pointer">
      <ConsoleChip color={mapLevelBackground["info"]}>{formattedTime}</ConsoleChip>
      <ConsoleChip color={mapLevelBackground[level]}>{level}</ConsoleChip>
      {
        prefix && <ConsoleChip color={mapLevelBackground["warn"]}>{children.prefix}</ConsoleChip>
      }
      <span class="pl-0.5" style={{color: mapLevelLabelColor[level]}}>{children.body}</span>
    </div>
  )
}

function ConsoleRowUserInput({ children }: { children: string }) {
  return (
    <span style={{ color: mapLevelLabelColor["info"] }}>$ {children}</span>
  )
}

function ConsoleRowJSON({ children }: { children: object }) {
  return <></>
}