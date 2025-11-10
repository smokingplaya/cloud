import { invoke } from "@teammeadows/atomicapi";

export async function runCommand(commandLine: string) {
  return await invoke("commandLine", commandLine);
}