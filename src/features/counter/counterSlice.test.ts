import counterReducer, { addBy, decrement, increment } from './counterSlice'

describe('counterReducer', () => {
  it('increments', () => {
    const next = counterReducer({ value: 0 }, increment())
    expect(next.value).toBe(1)
  })

  it('decrements', () => {
    const next = counterReducer({ value: 0 }, decrement())
    expect(next.value).toBe(-1)
  })

  it('adds by payload', () => {
    const next = counterReducer({ value: 2 }, addBy(3))
    expect(next.value).toBe(5)
  })
})

