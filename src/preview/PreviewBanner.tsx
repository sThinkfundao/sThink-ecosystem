import Button from "../components/Button.tsx";
import { PREVIEW_AVAILABLE, setPreviewActive, usePreviewActive } from "./previewMode.ts";

/**
 * Says plainly that the values on screen are fabricated, and offers the way
 * back to the honest empty states. Renders in development only.
 */
export default function PreviewBanner() {
  const active = usePreviewActive();
  if (!PREVIEW_AVAILABLE) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center p-3">
      <div className="overlay pointer-events-auto flex max-w-[min(92vw,44rem)] items-center gap-3 rounded-sm py-2 pl-0 pr-3">
        <span
          aria-hidden="true"
          className="h-9 w-2 shrink-0 rounded-l-sm bg-[repeating-linear-gradient(135deg,var(--color-steel)_0_4px,transparent_4px_8px)]"
        />
        {active ? (
          <>
            <p className="text-ui text-steel">
              <span className="font-display mr-2 text-label text-ice">Preview data</span>
              Sample values for layout review. Nothing here is real market data.
            </p>
            <Button onClick={() => setPreviewActive(false)} className="ml-auto shrink-0">
              Show empty states
            </Button>
          </>
        ) : (
          <>
            <p className="text-ui text-teal">
              <span className="font-display mr-2 text-label text-steel">Empty states</span>
              What the client sees until a contract address is configured.
            </p>
            <Button onClick={() => setPreviewActive(true)} className="ml-auto shrink-0">
              Show sample data
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
