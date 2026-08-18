"use client";
import { useEffect, useRef, useState } from "react";
import { TerminalInputProps } from "./types";

export default function CommandInput({ onSubmit, disabled, history = [], onNavigateHistory, onAutocomplete }: TerminalInputProps) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [histIndex, setHistIndex] = useState<number | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [disabled]);

  function submit() {
    if (!value.trim()) return;
    onSubmit(value.trim());
    setValue("");
  }

  return (
    <div className="flex items-center gap-3 w-full">
      <div className="prompt">lydia@portfolio:~$</div>
      <input
        aria-label="Terminal input"
        ref={inputRef}
        disabled={disabled}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") submit();
          else if (e.key === "ArrowUp") {
            if (history.length === 0) return;
            setHistIndex((hi) => {
              const next = hi === null ? history.length - 1 : Math.max(0, hi - 1);
              const val = history[next] ?? "";
              setValue(val);
              onNavigateHistory?.(val);
              return next;
            });
          } else if (e.key === "ArrowDown") {
            if (history.length === 0) return;
            setHistIndex((hi) => {
              if (hi === null) return null;
              const next = Math.min(history.length - 1, hi + 1);
              const val = history[next] ?? "";
              setValue(val);
              onNavigateHistory?.(val);
              return next;
            });
          } else if (e.key === "Tab") {
            e.preventDefault();
            const suggestion = onAutocomplete?.();
            if (suggestion) setValue(suggestion);
          }
        }}
        className="flex-1 bg-transparent outline-none font-mono text-terminal-green"
      />
    </div>
  );
}
