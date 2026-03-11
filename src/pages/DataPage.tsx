import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  fetchCharacters,
  initialCharactersQuery,
  setCharactersQuery,
} from "../features/characters/charactersStore";
import type { CharactersQuery } from "../features/characters/charactersTypes";

function useDebouncedValue<T>(value: T, delayMs: number) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = window.setTimeout(() => setDebounced(value), delayMs);
    return () => window.clearTimeout(t);
  }, [value, delayMs]);
  return debounced;
}

export default function DataPage() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const dispatch = useAppDispatch();
  const { query, data, loading, error } = useAppSelector((s) => s.characters);

  const debouncedSearch = useDebouncedValue(query.search.trim(), 350);

  const queryParams = useMemo(() => {
    return {
      page: query.page,
      search: debouncedSearch,
      status: query.status,
      gender: query.gender,
    };
  }, [query.page, debouncedSearch, query.status, query.gender]);

  useEffect(() => {
    dispatch(setCharactersQuery(queryParams));
    dispatch(fetchCharacters());
  }, [dispatch, queryParams]);

  const totalPages = data?.info.pages ?? 1;
  const canPrev = query.page > 1 && !loading;
  const canNext = query.page < totalPages && !loading;

  useEffect(() => {
    if (!mobileFiltersOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileFiltersOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileFiltersOpen]);

  const activeFiltersCount =
    (query.search.trim() ? 1 : 0) +
    (query.status ? 1 : 0) +
    (query.gender ? 1 : 0);

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold tracking-tight">Data</h1>
      </header>

      <section className="rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-zinc-200 px-5 py-4 md:flex-row md:items-center md:justify-between">
          <div className="min-w-0">
            <div className="text-sm font-medium">Characters</div>
            <div className="mt-0.5 text-xs text-zinc-600">
              Page <span className="font-medium text-zinc-900">{query.page}</span> of{" "}
              <span className="font-medium text-zinc-900">{totalPages}</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2 md:hidden">
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="inline-flex h-10 items-center justify-center rounded-xl border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-950 shadow-sm hover:bg-zinc-50"
              >
                Filters
                {activeFiltersCount ? (
                  <span className="ml-2 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-zinc-950 px-1.5 text-[11px] font-semibold text-white">
                    {activeFiltersCount}
                  </span>
                ) : null}
              </button>
              <button
                type="button"
                onClick={() => {
                  dispatch(setCharactersQuery(initialCharactersQuery));
                  dispatch(fetchCharacters());
                }}
                className="inline-flex h-10 items-center justify-center rounded-xl border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-950 shadow-sm hover:bg-zinc-50"
              >
                Reset
              </button>
            </div>

            <div className="relative">
              <input
                value={query.search}
                onChange={(e) => {
                  dispatch(setCharactersQuery({ search: e.target.value, page: 1 }));
                }}
                placeholder="Search name…"
                className="hidden h-10 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-950 shadow-sm outline-none placeholder:text-zinc-400 focus:ring-2 focus:ring-zinc-900/10 sm:w-56 md:block"
              />
            </div>

            <select
              value={query.status}
              onChange={(e) => {
                dispatch(
                  setCharactersQuery({
                    status: e.target.value as CharactersQuery["status"],
                    page: 1,
                  }),
                );
              }}
              className="hidden h-10 rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-950 shadow-sm outline-none focus:ring-2 focus:ring-zinc-900/10 md:block"
              aria-label="Filter by status"
            >
              <option value="">Status: All</option>
              <option value="alive">Alive</option>
              <option value="dead">Dead</option>
              <option value="unknown">Unknown</option>
            </select>

            <select
              value={query.gender}
              onChange={(e) => {
                dispatch(
                  setCharactersQuery({
                    gender: e.target.value as CharactersQuery["gender"],
                    page: 1,
                  }),
                );
              }}
              className="hidden h-10 rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-950 shadow-sm outline-none focus:ring-2 focus:ring-zinc-900/10 md:block"
              aria-label="Filter by gender"
            >
              <option value="">Gender: All</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="genderless">Genderless</option>
              <option value="unknown">Unknown</option>
            </select>

            <button
              type="button"
              onClick={() => {
                dispatch(setCharactersQuery(initialCharactersQuery));
                dispatch(fetchCharacters());
              }}
              className="hidden h-10 items-center justify-center rounded-xl border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-950 shadow-sm hover:bg-zinc-50 md:inline-flex"
            >
              Reset
            </button>
          </div>
        </div>

        {mobileFiltersOpen ? (
          <div
            className="fixed inset-0 z-50 md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Filters"
          >
            <button
              type="button"
              className="absolute inset-0 cursor-default bg-black/40"
              onClick={() => setMobileFiltersOpen(false)}
              aria-label="Close filters"
            />

            <div className="absolute right-0 top-0 flex h-full w-[86vw] max-w-sm flex-col border-l border-zinc-200 bg-white shadow-xl">
              <div className="flex h-16 items-center justify-between px-4">
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-zinc-950">
                    Filters
                  </div>
                  <div className="text-xs text-zinc-600">
                    Search and refine results
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="inline-flex h-9 items-center justify-center rounded-xl border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-950 shadow-sm hover:bg-zinc-50"
                  aria-label="Close filters"
                >
                  ✕
                </button>
              </div>

              <div className="flex-1 space-y-4 overflow-auto px-4 py-4">
                <div className="space-y-1.5">
                  <div className="text-xs font-medium uppercase tracking-wide text-zinc-600">
                    Search
                  </div>
                  <input
                    value={query.search}
                    onChange={(e) => {
                      dispatch(setCharactersQuery({ search: e.target.value, page: 1 }));
                    }}
                    placeholder="Search name…"
                    className="h-10 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-950 shadow-sm outline-none placeholder:text-zinc-400 focus:ring-2 focus:ring-zinc-900/10"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="text-xs font-medium uppercase tracking-wide text-zinc-600">
                    Status
                  </div>
                  <select
                    value={query.status}
                    onChange={(e) => {
                      dispatch(
                        setCharactersQuery({
                          status: e.target.value as CharactersQuery["status"],
                          page: 1,
                        }),
                      );
                    }}
                    className="h-10 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-950 shadow-sm outline-none focus:ring-2 focus:ring-zinc-900/10"
                    aria-label="Filter by status"
                  >
                    <option value="">All</option>
                    <option value="alive">Alive</option>
                    <option value="dead">Dead</option>
                    <option value="unknown">Unknown</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <div className="text-xs font-medium uppercase tracking-wide text-zinc-600">
                    Gender
                  </div>
                  <select
                    value={query.gender}
                    onChange={(e) => {
                      dispatch(
                        setCharactersQuery({
                          gender: e.target.value as CharactersQuery["gender"],
                          page: 1,
                        }),
                      );
                    }}
                    className="h-10 w-full rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-950 shadow-sm outline-none focus:ring-2 focus:ring-zinc-900/10"
                    aria-label="Filter by gender"
                  >
                    <option value="">All</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="genderless">Genderless</option>
                    <option value="unknown">Unknown</option>
                  </select>
                </div>
              </div>

              <div className="border-t border-zinc-200 p-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      dispatch(setCharactersQuery(initialCharactersQuery));
                      dispatch(fetchCharacters());
                    }}
                    className="inline-flex h-10 flex-1 items-center justify-center rounded-xl border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-950 shadow-sm hover:bg-zinc-50"
                  >
                    Reset
                  </button>
                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(false)}
                    className="inline-flex h-10 flex-1 items-center justify-center rounded-xl bg-zinc-950 px-4 text-sm font-medium text-white shadow-sm hover:bg-zinc-900"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {error ? (
          <div className="px-5 py-4 text-sm text-zinc-700">
            <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3">
              {error}
            </div>
          </div>
        ) : null}

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-zinc-50 text-xs uppercase tracking-wide text-zinc-600">
              <tr>
                <th className="px-5 py-3 font-medium">Character</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium">Species</th>
                <th className="hidden px-5 py-3 font-medium sm:table-cell">
                  Gender
                </th>
                <th className="hidden px-5 py-3 font-medium lg:table-cell">
                  Origin
                </th>
                <th className="hidden px-5 py-3 font-medium xl:table-cell">
                  Location
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {loading ? (
                <tr>
                  <td className="px-5 py-8 text-sm text-zinc-600" colSpan={6}>
                    Loading…
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td className="px-5 py-8 text-sm text-zinc-700" colSpan={6}>
                    <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3">
                      {error}
                    </div>
                  </td>
                </tr>
              ) : data?.results?.length ? (
                data.results.map((c) => (
                  <tr key={c.id} className="hover:bg-zinc-50/70">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={c.image}
                          alt={c.name}
                          className="h-9 w-9 rounded-xl border border-zinc-200 bg-zinc-100 object-cover"
                          loading="lazy"
                        />
                        <div className="min-w-0">
                          <div className="truncate font-medium text-zinc-950">
                            {c.name}
                          </div>
                          <div className="truncate text-xs text-zinc-600">
                            ID: {c.id}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-2 py-0.5 text-xs font-medium text-zinc-900">
                        {c.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-zinc-900">{c.species}</td>
                    <td className="hidden px-5 py-4 text-zinc-900 sm:table-cell">
                      {c.gender}
                    </td>
                    <td className="hidden px-5 py-4 text-zinc-700 lg:table-cell">
                      {c.origin?.name ?? "-"}
                    </td>
                    <td className="hidden px-5 py-4 text-zinc-700 xl:table-cell">
                      {c.location?.name ?? "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="px-5 py-8 text-sm text-zinc-600" colSpan={6}>
                    No rows to display.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col gap-2 border-t border-zinc-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-zinc-600">
            {data?.info.count ? (
              <>
                Total results:{" "}
                <span className="font-medium text-zinc-900">
                  {data.info.count}
                </span>
              </>
            ) : (
              <span> </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                dispatch(setCharactersQuery({ page: Math.max(1, query.page - 1) }))
              }
              disabled={!canPrev}
              className="inline-flex h-9 items-center justify-center rounded-xl border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-950 shadow-sm enabled:hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={() => dispatch(setCharactersQuery({ page: query.page + 1 }))}
              disabled={!canNext}
              className="inline-flex h-9 items-center justify-center rounded-xl bg-zinc-950 px-3 text-sm font-medium text-white shadow-sm enabled:hover:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
