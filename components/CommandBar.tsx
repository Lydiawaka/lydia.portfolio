"use client";
import React from "react";

type Props = {
  commands: string[];
  onExecute: (cmd: string) => void;
};

export default function CommandBar({ commands, onExecute }: Props) {
  return (
    <nav className="command-bar" aria-label="Quick commands">
      <ul className="flex gap-3 flex-wrap">
        {commands.map((c) => (
          <li key={c}>
            <button
              className="command-btn"
              onClick={() => onExecute(c)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") onExecute(c);
              }}
            >
              {c}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
