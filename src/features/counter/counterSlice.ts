export type CounterState = {
  value: number
}

const INCREMENT = 'counter/increment' as const
const DECREMENT = 'counter/decrement' as const
const ADD_BY = 'counter/addBy' as const

export const increment = () => ({ type: INCREMENT })
export const decrement = () => ({ type: DECREMENT })
export const addBy = (amount: number) => ({ type: ADD_BY, payload: amount })

type CounterAction =
  | ReturnType<typeof increment>
  | ReturnType<typeof decrement>
  | ReturnType<typeof addBy>

const initialState: CounterState = { value: 0 }

export default function counterReducer(
  state: CounterState = initialState,
  action: CounterAction,
): CounterState {
  switch (action.type) {
    case INCREMENT:
      return { ...state, value: state.value + 1 }
    case DECREMENT:
      return { ...state, value: state.value - 1 }
    case ADD_BY:
      return { ...state, value: state.value + action.payload }
    default:
      return state
  }
}

