import { decrement, increment } from '../features/counter/counterSlice'
import { useAppDispatch, useAppSelector } from '../app/hooks'

export default function HomePage() {
  const value = useAppSelector((s) => s.counter.value)
  const dispatch = useAppDispatch()

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold tracking-tight">Home</h1>
        <p className="text-sm text-zinc-600">
          Dashboard overview using a white background with black/gray shades.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <div className="text-xs font-medium uppercase tracking-wide text-zinc-600">
            Active metric
          </div>
          <div className="mt-2 text-3xl font-semibold tabular-nums">
            {value}
          </div>
          <div className="mt-1 text-sm text-zinc-600">
            Stored in Redux (demo value).
          </div>

          <div className="mt-4 flex items-center gap-2">
            <button
              type="button"
              onClick={() => dispatch(decrement())}
              className="inline-flex h-9 items-center justify-center rounded-xl border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-950 shadow-sm hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-900/10"
            >
              Decrease
            </button>
            <button
              type="button"
              onClick={() => dispatch(increment())}
              className="inline-flex h-9 items-center justify-center rounded-xl bg-zinc-950 px-3 text-sm font-medium text-white shadow-sm hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-900/30"
            >
              Increase
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <div className="text-xs font-medium uppercase tracking-wide text-zinc-600">
            Notes
          </div>
          <div className="mt-2 space-y-2 text-sm text-zinc-700">
            <p>
              Use the sidebar to navigate between <span className="font-medium">Home</span> and{' '}
              <span className="font-medium">Data</span>.
            </p>
            <p>
              This layout is meant to feel like a dashboard: clean surfaces, subtle borders, and tight spacing.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <div className="text-xs font-medium uppercase tracking-wide text-zinc-600">
            Quick actions
          </div>
          <div className="mt-3 grid gap-2">
            <button
              type="button"
              className="inline-flex h-10 items-center justify-between rounded-xl border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-950 shadow-sm hover:bg-zinc-50"
            >
              Export
              <span className="text-xs text-zinc-600">CSV</span>
            </button>
            <button
              type="button"
              className="inline-flex h-10 items-center justify-between rounded-xl border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-950 shadow-sm hover:bg-zinc-50"
            >
              Refresh
              <span className="text-xs text-zinc-600">Now</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

