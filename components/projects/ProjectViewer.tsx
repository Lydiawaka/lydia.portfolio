"use client";
import React from "react";

type Project = {
  title: string;
  description: string;
  technologies: string[];
  status?: string;
  github?: string;
  liveUrl?: string;
};

type Props = { project: Project };

export default function ProjectViewer({ project }: Props) {
  return (
    <div className="project-viewer font-mono text-terminal-green">
      <div className="divider">────────────────────────────────</div>
      <div className="project-title">PROJECT: {project.title.toUpperCase()}</div>
      <div>STATUS: {project.status?.toUpperCase() ?? "UNKNOWN"}</div>
      <div className="mt-2">DESCRIPTION:</div>
      <div>{project.description}</div>
      <div className="mt-2">TECHNOLOGY:</div>
      <div>{project.technologies.join("\n")}</div>
      <div className="mt-2">FEATURES:</div>
      <div>- See project documentation or demo</div>
      <div className="mt-2">LINKS:</div>
      <div>[ LIVE PROJECT ] {project.liveUrl ? project.liveUrl : ""}</div>
      <div>[ SOURCE CODE ] {project.github ? project.github : ""}</div>
      <div className="divider">────────────────────────────────</div>
    </div>
  );
}
