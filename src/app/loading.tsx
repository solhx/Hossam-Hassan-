// src/app/loading.tsx
// ─── Global Loading UI (Streaming Suspense) ───

export default function Loading() {
  return (
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center bg-[var(--bg-primary)]"
      role="progressbar"
      aria-label="Loading page content"
      aria-busy="true"
    >
      <div className="flex flex-col items-center gap-6">
        {/* Animated logo/spinner */}
        <div className="relative h-16 w-16">
          {/* Outer ring */}
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-green-500 opacity-75" />
          {/* Inner ring */}
          <div
            className="absolute inset-2 animate-spin rounded-full border-2 border-transparent border-b-green-400 opacity-50"
            style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}
          />
          {/* Center dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
          </div>
        </div>

        <span className="font-mono text-body-sm tracking-wider text-[var(--fg-muted)]">
          Loading...
        </span>
      </div>
    </div>
  );
}