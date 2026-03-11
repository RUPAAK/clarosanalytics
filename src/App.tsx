import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

function App() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    if (!mobileNavOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileNavOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileNavOpen]);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950 lg:h-screen lg:overflow-hidden">
      <div className="grid min-h-screen w-full grid-cols-1 lg:h-full lg:grid-cols-[260px_1fr]">
        <aside className="hidden border-r border-zinc-200 bg-white lg:sticky lg:top-0 lg:block lg:h-screen lg:overflow-y-auto">
          <div className="flex h-16 items-center px-6">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-zinc-950 text-sm font-semibold text-white">
                CA
              </div>
              <div className="leading-tight">
                <div className="text-sm font-semibold">Analytics</div>
                <div className="text-xs text-zinc-600">Dashboard</div>
              </div>
            </div>
          </div>

          <nav className="px-3 py-3">
            <SideNavItem to="/" end label="Home" />
            <SideNavItem to="/data" label="Data" />
          </nav>
        </aside>

        <div className="flex min-w-0 flex-col lg:min-h-0">
          <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur">
            <div className="flex h-16 items-center justify-between px-4 lg:px-8">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setMobileNavOpen(true)}
                  className="inline-flex h-9 items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-950 shadow-sm hover:bg-zinc-50 lg:hidden"
                  aria-label="Open navigation menu"
                  aria-haspopup="dialog"
                  aria-expanded={mobileNavOpen}
                >
                  <span className="text-base leading-none">☰</span>
                  <span className="text-xs text-zinc-600">Menu</span>
                </button>
                <div>
                  <div className="text-sm font-semibold">Dashboard</div>
                  <div className="text-xs text-zinc-600">Home & Data</div>
                </div>
              </div>
            </div>

            <div className="border-t border-zinc-200 bg-white lg:hidden">
              <nav className="flex items-center gap-2 px-3 py-2">
                <TopNavItem to="/" end label="Home" />
                <TopNavItem to="/data" label="Data" />
              </nav>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 lg:overflow-y-auto lg:px-8">
            <Outlet />
          </main>
        </div>
      </div>

      {mobileNavOpen ? (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
        >
          <button
            type="button"
            className="absolute inset-0 cursor-default bg-black/40"
            onClick={() => setMobileNavOpen(false)}
            aria-label="Close navigation menu"
          />

          <div className="absolute left-0 top-0 flex h-full w-[86vw] max-w-sm flex-col border-r border-zinc-200 bg-white shadow-xl">
            <div className="flex h-16 items-center justify-between px-4">
              <div className="flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-2xl bg-zinc-950 text-sm font-semibold text-white">
                  CA
                </div>
                <div className="leading-tight">
                  <div className="text-sm font-semibold">Analytics</div>
                  <div className="text-xs text-zinc-600">Dashboard</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setMobileNavOpen(false)}
                className="inline-flex h-9 items-center justify-center rounded-xl border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-950 shadow-sm hover:bg-zinc-50"
                aria-label="Close navigation menu"
              >
                ✕
              </button>
            </div>

            <nav className="px-3 py-3">
              <MobileSideNavItem
                to="/"
                end
                label="Home"
                onNavigate={() => setMobileNavOpen(false)}
              />
              <MobileSideNavItem
                to="/data"
                label="Data"
                onNavigate={() => setMobileNavOpen(false)}
              />
            </nav>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function SideNavItem({
  to,
  label,
  end,
}: {
  to: string;
  label: string;
  end?: boolean;
}) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        [
          "group flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium",
          isActive
            ? "bg-zinc-950 text-white"
            : "text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950",
        ].join(" ")
      }
    >
      <span>{label}</span>
      <span className="text-xs opacity-70 group-hover:opacity-100">→</span>
    </NavLink>
  );
}

function TopNavItem({
  to,
  label,
  end,
}: {
  to: string;
  label: string;
  end?: boolean;
}) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        [
          "inline-flex h-9 items-center justify-center rounded-xl px-3 text-sm font-medium",
          isActive
            ? "bg-zinc-950 text-white"
            : "border border-zinc-200 bg-white text-zinc-950 hover:bg-zinc-50",
        ].join(" ")
      }
    >
      {label}
    </NavLink>
  );
}

function MobileSideNavItem({
  to,
  label,
  end,
  onNavigate,
}: {
  to: string;
  label: string;
  end?: boolean;
  onNavigate: () => void;
}) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onNavigate}
      className={({ isActive }) =>
        [
          "group flex items-center justify-between rounded-xl px-3 py-2 text-sm font-medium",
          isActive
            ? "bg-zinc-950 text-white"
            : "text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950",
        ].join(" ")
      }
    >
      <span>{label}</span>
      <span className="text-xs opacity-70 group-hover:opacity-100">→</span>
    </NavLink>
  );
}

export default App;
