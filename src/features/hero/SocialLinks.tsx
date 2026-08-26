import type { ReactNode } from "react";
import { external, isSet, type Maybe } from "../../config.ts";

interface SocialEntry {
  name: string;
  url: Maybe<string>;
  icon: ReactNode;
}

const ICON_CLASS = "h-4 w-4";

const ENTRIES: SocialEntry[] = [
  {
    name: "X",
    url: external.social.x,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={ICON_CLASS} aria-hidden="true">
        <path d="M18.9 2H22l-9.3 10.6L23.5 22h-7.4l-5.8-6.8L3.6 22H.5l9.9-11.3L1 2h7.6l5.2 6.2L18.9 2Zm-1.3 18h1.7L7.7 3.9H5.9L17.6 20Z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    url: external.repo,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className={ICON_CLASS} aria-hidden="true">
        <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.8 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.66.41.36.78 1.05.78 2.13v3.16c0 .31.2.68.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
      </svg>
    ),
  },
];

/* An entry whose URL is not configured yet simply doesn't render, so the
   row never links somewhere dead. */
export default function SocialLinks() {
  return (
    <ul className="flex items-center gap-2">
      {ENTRIES.map(({ name, url, icon }) =>
        isSet(url) ? (
          <li key={name}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              title={name}
              className="hit flex h-8 w-8 items-center justify-center rounded-sm border border-edge bg-surface text-steel transition-colors duration-100 hover:border-steel/40 hover:text-ice active:translate-y-px"
            >
              {icon}
            </a>
          </li>
        ) : null,
      )}
    </ul>
  );
}
