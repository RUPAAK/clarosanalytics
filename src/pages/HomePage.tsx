import { decrement, increment } from "../features/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import readmeContent from "../../README.md?raw";

export default function HomePage() {
  const value = useAppSelector((s) => s.counter.value);
  const { data: charactersData, loading: charactersLoading } = useAppSelector(
    (s) => s.characters,
  );
  const dispatch = useAppDispatch();

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold tracking-tight">Home</h1>
        <p className="text-sm text-zinc-600">
          Dashboard overview using a white background with black/gray shades.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="sm:col-span-2 lg:col-span-3 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <div className="mb-3 text-xs font-medium uppercase tracking-wide text-zinc-600">
            README
          </div>
          <div className="max-h-80 overflow-auto rounded-xl border border-zinc-100 bg-zinc-50 px-4 py-3 text-xs font-mono whitespace-pre-wrap text-zinc-800">
            {readmeContent}
          </div>
        </div>
      </section>
    </div>
  );
}
