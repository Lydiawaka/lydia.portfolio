export type TerminalOutput = string[];

export type TerminalCommand = {
  name: string;
  aliases?: string[];
  description: string;
  execute: (args?: string[]) => TerminalOutput | Promise<TerminalOutput>;
};
