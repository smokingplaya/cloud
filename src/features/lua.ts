export function runLua(code: string) {
	if (arguments.length === 1) {
		console.log("RUNLUA:" + code);
		return;
	}

	let str = "";
	let argIndex = 1;

	for (let i = 0; i < code.length; i++) {
		if (code[i] === '%') {
			i++;
			if (code[i] === 's') {
				str += `"${arguments[argIndex].replace(/["\\]/g, '\\$&')}"`;
				argIndex++;
				continue;
			}
			if (code[i] === 'i') {
				str += arguments[argIndex];
				argIndex++;
				continue;
			}
		}
		str += code[i];
	}

	console.log("RUNLUA:" + str);
};

type UiCommands = "ResumeGame" | "OpenServerBrowser" | "Disconnect" | "Quit" | "QuitNoConfirm" | "OpenBenchmarkDialog" | "OpenCreateMultiplayerGameDialog"
	| "OpenLoadCommentaryDialog" | "OpenLoadGameDialog" | "OpenNewGameDialog" | "OpenOptionsDialog"
	| "OpenPlayerListDialog" | "OpenSaveGameDialog";

export function useUiCommand(command: UiCommands) {
	runLua(`RunGameUICommand("${command}")`);
}