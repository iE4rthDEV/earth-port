import React from "react";
import { hasLiveUrl } from "@/types/project";
import Button from "./Button";

interface ProjectLinksProps {
  liveUrl: string | null;
  githubUrl: string | null;
}

const LiveIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    aria-hidden="true"
    focusable="false"
    className="size-5 stroke-primary-content"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    />
  </svg>
);

const GithubIcon = () => (
  <svg
    viewBox="0 0 24 24"
    height="20"
    width="20"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <path
      fill="currentColor"
      d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
    />
  </svg>
);

const ProjectLinks: React.FC<ProjectLinksProps> = ({ liveUrl, githubUrl }) => {
  const showLive = hasLiveUrl(liveUrl);
  const showGithub = githubUrl !== null;

  if (!showLive && !showGithub) return null;

  return (
    <div data-project-links className="flex flex-col gap-3 sm:flex-row">
      {showLive && liveUrl && (
        <Button
          href={liveUrl}
          external
          variant="primary"
          size="lg"
          className="w-full sm:w-auto"
        >
          <LiveIcon />
          <span className="sr-only">Open </span>
          <span>live preview</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </Button>
      )}
      {showGithub && githubUrl && (
        <Button
          href={githubUrl}
          external
          variant="secondary"
          size="lg"
          className="w-full sm:w-auto"
        >
          <GithubIcon />
          <span className="sr-only">Open </span>
          <span>GitHub repository</span>
          <span className="sr-only"> (opens in a new tab)</span>
        </Button>
      )}
    </div>
  );
};

export default ProjectLinks;
