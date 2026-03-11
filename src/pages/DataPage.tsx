const tableRows = [
  { name: 'Sessions', value: '14,203', change: '+4.1%' },
  { name: 'Pageviews', value: '91,880', change: '+2.7%' },
  { name: 'Bounce rate', value: '38.2%', change: '-1.3%' },
  { name: 'Avg. time', value: '3m 14s', change: '+0.4%' },
]

export default function DataPage() {
  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold tracking-tight">Data</h1>
        <p className="text-sm text-zinc-600">
          A simple analytics-style table using a clean white/black palette.
        </p>
      </header>

      <section className="rounded-2xl border border-zinc-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4">
          <div className="text-sm font-medium">Overview metrics</div>
          <div className="text-xs text-zinc-600">Last 7 days</div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-zinc-50 text-xs uppercase tracking-wide text-zinc-600">
              <tr>
                <th className="px-5 py-3 font-medium">Metric</th>
                <th className="px-5 py-3 font-medium">Value</th>
                <th className="px-5 py-3 font-medium">Change</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {tableRows.map((r) => (
                <tr key={r.name} className="hover:bg-zinc-50/70">
                  <td className="px-5 py-4 font-medium text-zinc-950">
                    {r.name}
                  </td>
                  <td className="px-5 py-4 text-zinc-900">{r.value}</td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center rounded-full border border-zinc-200 bg-white px-2 py-0.5 text-xs font-medium text-zinc-900">
                      {r.change}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

