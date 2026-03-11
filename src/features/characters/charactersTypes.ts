export type RMCharacter = {
  id: number
  name: string
  status: 'Alive' | 'Dead' | 'unknown'
  species: string
  gender: 'Female' | 'Male' | 'Genderless' | 'unknown'
  image: string
  origin: { name: string }
  location: { name: string }
}

export type RMResponse = {
  info: { count: number; pages: number; next: string | null; prev: string | null }
  results: RMCharacter[]
}

export type CharactersQuery = {
  page: number
  search: string
  status: '' | 'alive' | 'dead' | 'unknown'
  gender: '' | 'female' | 'male' | 'genderless' | 'unknown'
}

