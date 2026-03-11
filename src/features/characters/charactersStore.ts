import axios from 'axios'
import type { RMResponse, CharactersQuery } from './charactersTypes'
import type { ThunkAction } from '../../app/store'

export type CharactersState = {
  query: CharactersQuery
  data: RMResponse | null
  loading: boolean
  error: string | null
}

const SET_QUERY = 'characters/setQuery' as const
const FETCH_START = 'characters/fetchStart' as const
const FETCH_SUCCESS = 'characters/fetchSuccess' as const
const FETCH_ERROR = 'characters/fetchError' as const

export const setCharactersQuery = (patch: Partial<CharactersQuery>) => ({
  type: SET_QUERY,
  payload: patch,
})

const fetchStart = () => ({ type: FETCH_START })
const fetchSuccess = (payload: RMResponse) => ({ type: FETCH_SUCCESS, payload })
const fetchError = (payload: string) => ({ type: FETCH_ERROR, payload })

type CharactersAction =
  | ReturnType<typeof setCharactersQuery>
  | ReturnType<typeof fetchStart>
  | ReturnType<typeof fetchSuccess>
  | ReturnType<typeof fetchError>

export const initialCharactersQuery: CharactersQuery = {
  page: 1,
  search: '',
  status: '',
  gender: '',
}

const initialState: CharactersState = {
  query: initialCharactersQuery,
  data: null,
  loading: false,
  error: null,
}

export default function charactersReducer(
  state: CharactersState = initialState,
  action: CharactersAction,
): CharactersState {
  switch (action.type) {
    case SET_QUERY:
      return { ...state, query: { ...state.query, ...action.payload } }
    case FETCH_START:
      return { ...state, loading: true, error: null }
    case FETCH_SUCCESS:
      return { ...state, loading: false, data: action.payload, error: null }
    case FETCH_ERROR:
      return { ...state, loading: false, data: null, error: action.payload }
    default:
      return state
  }
}

export const fetchCharacters =
  (): ThunkAction =>
  async (dispatch, getState) => {
    const { query } = getState().characters
    const params: Record<string, string | number> = { page: query.page }
    const search = query.search.trim()
    if (search) params.name = search
    if (query.status) params.status = query.status
    if (query.gender) params.gender = query.gender

    dispatch(fetchStart())
    try {
      const res = await axios.get<RMResponse>(
        'https://rickandmortyapi.com/api/character',
        { params },
      )
      dispatch(fetchSuccess(res.data))
    } catch (e) {
      const message =
        axios.isAxiosError(e) && e.response?.status === 404
          ? 'No results found. Try a different search or filter.'
          : 'Failed to load data. Please try again.'
      dispatch(fetchError(message))
    }
  }

