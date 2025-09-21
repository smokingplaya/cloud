import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";

const [currentGamemode, setCurrentGamemode] = createSignal("sandbox"); // because of sandbox is default gamemode
export const gamemodeDetails = { currentGamemode, setCurrentGamemode };

const [gamemodeList, setGamemodeList] = createStore<GamemodeList[]>([]);
export const gamemodeListDetails = { gamemodeList, setGamemodeList };

interface GamemodeList {
  maps: string,
  title: string,
  name: string;
  workshopid: 0;
  menusystem: boolean;
};

function a(list: GamemodeList[]) {
  console.log("got update on GamemodeList");
  console.log(JSON.stringify(list));
  setGamemodeList(list);
}

// https://github.com/Facepunch/garrysmod/blob/cb3b0a85d475315e81369455899af60b0ff64164/garrysmod/lua/menu/mainmenu.lua#L116
// https://github.com/Facepunch/garrysmod/blob/cb3b0a85d475315e81369455899af60b0ff64164/garrysmod/html/js/menu/control.Menu.js#L205
(window as any).UpdateGamemodes = a;
(window as any).UpdateCurrentGamemode = setCurrentGamemode;

export function getGamemodeTitle(name: string): string | undefined {
  return gamemodeList.find(g => g.name == name)?.title;
}