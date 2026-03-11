import { decrement, increment } from '../features/counter/counterSlice'
import { useAppDispatch, useAppSelector } from '../app/hooks'

export default function HomePage() {
  const value = useAppSelector((s) => s.counter.value)
  const dispatch = useAppDispatch()

  return (
    <section style={{ display: 'grid', gap: 12 }}>
      <h2 style={{ margin: 0 }}>Home</h2>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <button type="button" onClick={() => dispatch(decrement())}>
          -
        </button>
        <div style={{ minWidth: 40, textAlign: 'center' }}>{value}</div>
        <button type="button" onClick={() => dispatch(increment())}>
          +
        </button>
      </div>
      <p style={{ margin: 0, opacity: 0.8 }}>
        This counter value is stored in Redux.
      </p>
    </section>
  )
}

