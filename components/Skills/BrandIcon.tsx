"use client";

import React from "react";
import {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiTypescript,
  SiAngular,
  SiVuedotjs,
  SiNodedotjs,
  SiNpm,
  SiGit,
  SiGitlab,
  SiJenkins,
  SiGradle,
  SiDocker,
  SiKubernetes,
  SiMysql,
  SiPostman,
  SiConfluence,
  SiPerplexity,
  SiGithubcopilot,
} from "react-icons/si";
import { Hexagon, Bot, Boxes, Cpu } from "lucide-react";

type Props = {
  name: string;
  className?: string;
  title?: string; // accessible title if needed
  size?: number;  // px
};

const map: Record<string, React.ReactNode> = {
  react: <SiReact />,
  "next.js": <SiNextdotjs />,
  nextjs: <SiNextdotjs />,
  javascript: <SiJavascript />,
  typescript: <SiTypescript />,
  angular: <SiAngular />,
  vue: <SiVuedotjs />,
  node: <SiNodedotjs />,
  "node.js": <SiNodedotjs />,
  npm: <SiNpm />,
  git: <SiGit />,
  gitlab: <SiGitlab />,
  jenkins: <SiJenkins />,
  gradle: <SiGradle />,
  docker: <SiDocker />,
  kubernetes: <SiKubernetes />,
  mysql: <SiMysql />,
  postman: <SiPostman />,
  confluence: <SiConfluence />,
  perplexity: <SiPerplexity />,
  "github copilot": <SiGithubcopilot />,
};

function normalize(input: string) {
  return input.toLowerCase().replace(/\./g, "").trim();
}

export function BrandIcon({ name, className, title, size = 16 }: Props) {
  const key = normalize(name);
  const icon = map[key];

  const commonProps = {
    "aria-hidden": true,
    width: size,
    height: size,
    className,
  } as React.SVGProps<SVGSVGElement>;

  if (icon) {
    // Clone to apply sizing/class
    return React.cloneElement(icon as React.ReactElement, commonProps);
  }

  // Neutral fallbacks for MCP/Cline/BrowserTools/PeopleSoft/etc.
  if (key.includes("mcp")) return <Hexagon {...commonProps} />;
  if (key.includes("cline")) return <Bot {...commonProps} />;
  if (key.includes("browser")) return <Boxes {...commonProps} />;
  if (key.includes("peoplesoft")) return <Cpu {...commonProps} />;

  return <Hexagon {...commonProps} />;
}
