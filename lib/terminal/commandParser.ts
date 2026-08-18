import commands from "./commands";
import type { TerminalCommand } from "./commandTypes";

export function findCommand(input: string): { command?: TerminalCommand; args: string[] } {
  const parts = input.trim().split(/\s+/).filter(Boolean);
  const name = parts.shift() ?? "";
  const args = parts;
  if (!name) return { args };
  const lower = name.toLowerCase();

  const command = commands.find((c) => {
    if (c.name.toLowerCase() === lower) return true;
    if (c.aliases && c.aliases.map((a) => a.toLowerCase()).includes(lower)) return true;
    return false;
  });

  return { command, args };
}
