import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-xl">
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
        <h1 className="text-xl font-semibold tracking-tight">404</h1>
        <p className="mt-2 text-sm text-zinc-600">
          That page doesn’t exist.
        </p>
        <div className="mt-4">
          <Link
            to="/"
            className="inline-flex h-9 items-center justify-center rounded-xl bg-zinc-950 px-4 text-sm font-medium text-white shadow-sm hover:bg-zinc-900"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  )
}

