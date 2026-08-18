"use client";

import { useEffect, useState } from "react";

type BootSequenceProps = {
  onComplete?: () => void;
  skip?: boolean;
};

const lines = [
  "initializing portfolio engine ... ok",
  "loading developer profile ... ok",
  "loading projects ... ok",
  "loading experience ... ok",
  "loading skills ... ok",
  "",
  "starting session for visitor@lydia.dev",
  "",
  "██╗     ██╗   ██╗██████╗ ██╗ █████╗",
  "██║     ╚██╗ ██╔╝██╔══██╗██║██╔══██╗",
  "██║      ╚████╔╝ ██║  ██║██║███████║",
  "██║       ╚██╔╝  ██║  ██║██║██╔══██║",
  "███████╗   ██║   ██████╔╝██║██║  ██║",
  "╚══════╝   ╚═╝   ╚═════╝ ╚═╝╚═╝  ╚═╝",
  "",
  "terminal access granted.",
  "",
  "type help to begin.",
  "",
];

export default function BootSequence({
  onComplete,
  skip,
}: BootSequenceProps) {
  const [printed, setPrinted] = useState<string[]>([]);

  useEffect(() => {
    if (skip) {
      setPrinted(lines);
      onComplete?.();
      return;
    }

    let i = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      setPrinted((previous) => [...previous, lines[i]]);
      i += 1;

      if (i >= lines.length) {
        onComplete?.();
        return;
      }

      const delay = lines[i] === "" ? 80 : 220;

      timeoutId = setTimeout(tick, delay);
    };

    timeoutId = setTimeout(tick, 300);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [onComplete, skip]);

  return (
    <div className="terminal-block">
      {printed.map((line, index) => (
        <div key={index} className="terminal-line">
          {line || "\u00A0"}
        </div>
      ))}
    </div>
  );
}