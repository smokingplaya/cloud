import { createStore } from "solid-js/store";

type MapList = Record<string, string[]>;

const [maplistStore, updateMaplistStore] = createStore<MapList>({});
export const mapStore = { maplistStore, updateMaplistStore };

// https://github.com/Facepunch/garrysmod/blob/af2079d5b4015ccef8e0ed7a05a2bc746a6265d7/garrysmod/lua/menu/getmaps.lua#L276
(window as any).UpdateAddonMaps = updateMaplistStore;
(window as any).UpdateMaps = updateMaplistStore;