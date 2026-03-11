import { NavLink, Outlet } from "react-router-dom";

function App() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950">
      <div className="grid min-h-screen w-full grid-cols-1 lg:grid-cols-[260px_1fr]">
        <aside className="hidden border-r border-zinc-200 bg-white lg:block">
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

        <div className="flex min-w-0 flex-col">
          <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/80 backdrop-blur">
            <div className="flex h-16 items-center justify-between px-4 lg:px-8">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-2xl bg-zinc-950 text-xs font-semibold text-white lg:hidden">
                  Clarosanalytics
                </div>
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

          <main className="flex-1 px-4 py-6 lg:px-8">
            <Outlet />
          </main>
        </div>
      </div>
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

export default App;
