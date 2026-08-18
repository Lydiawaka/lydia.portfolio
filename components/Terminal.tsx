"use client";
import { useEffect, useRef, useState } from "react";
import BootSequence from "./BootSequence";
import CommandInput from "./CommandInput";
import CommandBar from "./CommandBar";
import { findCommand } from "../lib/terminal/commandParser";
import commands from "../lib/terminal/commands";
import ProjectViewer from "./projects/ProjectViewer";
import { projects as projectsData } from "../lib/terminal/projectIndex";
import { useTheme } from "../lib/themes/ThemeProvider";
import { themes as themeDefs, themeOrder } from "../lib/themes/themes";

export default function Terminal() {
  const [lines, setLines] = useState<string[]>([]);
  const [ready, setReady] = useState(false);
  const [skipIntro, setSkipIntro] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const historyRef = useRef<string[]>([]);
  const { setTheme, theme } = useTheme();

  const append = (newLines: string[] | string) => {
    setLines((l) => l.concat(Array.isArray(newLines) ? newLines : [newLines]));
  };

  function handleInput(input: string) {
    append(`lydia@portfolio:~$ ${input}`);
    // push to history
    setHistory((h) => {
      const next = [...h, input];
      historyRef.current = next;
      return next;
    });
    const { command, args } = findCommand(input);
    if (!command) {
      append([`command not found: ${input}`, "", `Type \"help\" to see available commands.`]);
      return;
    }

    Promise.resolve(command.execute(args)).then((out) => {
        if (out.length === 1 && out[0] === "__CLEAR__") {
          setLines([]);
          return;
        }

        // theme tokens
        const setToken = out.find((s) => typeof s === "string" && s.startsWith("__SET_THEME__:"));
        const resetToken = out.find((s) => typeof s === "string" && s === "__RESET_THEME__");
        const nextToken = out.find((s) => typeof s === "string" && s === "__NEXT_THEME__");
        if (setToken) {
          const parts = (setToken as string).split(":");
          const name = parts[1] as keyof typeof themeDefs;
          try {
            setTheme(name as any);
            append(["Theme changed.", "", `Active theme: ${themeDefs[name].name}`, `Primary color: ${themeDefs[name].primary}`]);
          } catch (e) {
            append([`Failed to set theme: ${name}`]);
          }
          return;
        }
        if (nextToken) {
          const idx = themeOrder.indexOf(theme as string);
          const next = themeOrder[(idx + 1) % themeOrder.length];
          setTheme(next as any);
          append(["Theme changed.", "", `Active theme: ${themeDefs[next].name}`, `Primary color: ${themeDefs[next].primary}`]);
          return;
        }
        if (resetToken) {
          setTheme("green" as any);
          const t = themeDefs["green"];
          append(["Theme reset.", "", `Active theme: ${t.name}`]);
          return;
        }

        append(out);
    });
  }

  useEffect(() => {
    // small welcome if user is already past boot
    if (ready) append(["Welcome! Type `help` to begin."]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready]);

  function autocompleteFor(prefix: string) {
    const p = prefix.trim().toLowerCase();
    if (!p) return null;
    const names = commands.flatMap((c) => [c.name].concat(c.aliases ?? []));
    const match = names.find((n) => n.startsWith(p));
    return match ?? null;
  }

  function handleExecuteCommandFromBar(cmd: string) {
    handleInput(cmd);
  }

  return (
    <div className="terminal-container" onClick={() => {}}>
      <div className="terminal-window">
        <div className="terminal-header">
          <div className="dots">
            <span className="dot red" />
            <span className="dot yellow" />
            <span className="dot green" />
          </div>
          <div className="title">lydia@portfolio</div>
          <div className="theme-indicator">THEME: {themeDefs[theme as keyof typeof themeDefs]?.name.toUpperCase()}</div>
          <div className="spacer" />
          <button
            className="skip-btn"
            onClick={() => {
              setSkipIntro(true);
              setReady(true);
            }}
          >
            Skip intro
          </button>
        </div>

        <div className="terminal-body" aria-live="polite">
          {!ready && (
            <BootSequence
              skip={skipIntro}
              onComplete={() => {
                setReady(true);
              }}
            />
          )}

          {ready && (
            <div>
              {lines.map((l, idx) => {
                const projectMatch = l.match(/__PROJECT__:(\w+)/);
                const downloadMatch = l.match(/\[ DOWNLOAD PDF \ ]\s*(\S+)/i);
                const urlMatch = l.match(/https?:\/\/\S+/i);
                if (projectMatch) {
                  const id = projectMatch[1];
                  const p = projectsData.find((x) => x.id === id);
                  if (p) return <ProjectViewer key={id} project={p} />;
                  return <div key={idx} className="terminal-line">Project not found: {id}</div>;
                }
                if (downloadMatch) {
                  const url = downloadMatch[1];
                  return (
                    <div key={idx} className="terminal-line">
                      <a href={url} target="_blank" rel="noreferrer" className="text-terminal-green underline">
                        [ DOWNLOAD PDF ]
                      </a>
                    </div>
                  );
                }
                if (urlMatch) {
                  const url = urlMatch[0];
                  const parts = l.split(url);
                  return (
                    <div key={idx} className="terminal-line">
                      {parts[0]}
                      <a href={url} target="_blank" rel="noreferrer" className="text-terminal-green underline">
                        {url}
                      </a>
                      {parts[1]}
                    </div>
                  );
                }
                return (
                  <div key={idx} className="terminal-line">
                    {l}
                  </div>
                );
              })}
              <CommandInput
                onSubmit={handleInput}
                history={history}
                onNavigateHistory={() => {}}
                onAutocomplete={() => autocompleteFor((document.activeElement as HTMLInputElement)?.value || "")}
              />
            </div>
          )}
        </div>
        {ready && (
          <CommandBar
            commands={["help", "whoami", "projects", "skills", "experience", "education", "resume", "contact", "socials", "clear"]}
            onExecute={handleExecuteCommandFromBar}
          />
        )}
      </div>
    </div>
  );
}
