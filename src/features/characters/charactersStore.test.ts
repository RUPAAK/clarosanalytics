import axios from "axios";
import charactersReducer, {
  fetchCharacters,
  initialCharactersQuery,
  setCharactersQuery,
} from "./charactersStore";
import type { CharactersState } from "./charactersStore";
import type { RMResponse } from "./charactersStore";

jest.mock("axios");

const mockedAxios = jest.mocked(axios, { shallow: false });

type Action = { type: string; payload?: unknown };

function createDispatchCollector() {
  const actions: Action[] = [];
  const dispatch = (action: unknown) => {
    actions.push(action as Action);
    return action;
  };
  return { actions, dispatch };
}

function getStateWithQuery(query: Partial<CharactersState["query"]>) {
  return {
    characters: {
      query: { ...initialCharactersQuery, ...query },
      data: null,
      loading: false,
      error: null,
    },
  };
}

describe("charactersReducer", () => {
  it("updates query (page + search)", () => {
    const state: CharactersState = {
      query: initialCharactersQuery,
      data: null,
      loading: false,
      error: null,
    };

    const next = charactersReducer(
      state,
      setCharactersQuery({ page: 2, search: "rick" }),
    );
    expect(next.query.page).toBe(2);
    expect(next.query.search).toBe("rick");
    expect(next.query.status).toBe("");
  });
});

describe("fetchCharacters thunk", () => {
  it("success: dispatches fetchStart then fetchSuccess", async () => {
    const data: RMResponse = {
      info: { count: 1, pages: 1, next: null, prev: null },
      results: [
        {
          id: 1,
          name: "Rick Sanchez",
          status: "Alive",
          species: "Human",
          gender: "Male",
          image: "https://example.com/rick.png",
          origin: { name: "Earth" },
          location: { name: "Earth" },
        },
      ],
    };

    mockedAxios.get.mockResolvedValueOnce({ data } as unknown as {
      data: RMResponse;
    });

    const { actions, dispatch } = createDispatchCollector();
    const getState = () =>
      getStateWithQuery({
        page: 1,
        search: "rick",
        status: "alive",
        gender: "",
      });

    // Act
    await fetchCharacters()(dispatch as never, getState as never);

    // Assert (API called with correct params + expected actions)
    expect(mockedAxios.get).toHaveBeenCalledWith(
      "https://rickandmortyapi.com/api/character",
      { params: { page: 1, name: "rick", status: "alive" } },
    );

    expect(actions[0]?.type).toBe("characters/fetchStart");
    expect(actions[1]?.type).toBe("characters/fetchSuccess");
    expect(actions[1]?.payload).toEqual(data);
  });

  it("no results (404): dispatches fetchError with friendly message", async () => {
    // Arrange
    mockedAxios.isAxiosError.mockReturnValueOnce(true);
    mockedAxios.get.mockRejectedValueOnce({
      response: { status: 404 },
    });

    const { actions, dispatch } = createDispatchCollector();
    const getState = () => getStateWithQuery({ search: "does-not-exist" });

    // Act
    await fetchCharacters()(dispatch as never, getState as never);

    // Assert
    expect(actions[0]?.type).toBe("characters/fetchStart");
    expect(actions[1]?.type).toBe("characters/fetchError");
    expect(actions[1]?.payload).toMatch(/No results/i);
  });

  it("network error: dispatches fetchError with generic message", async () => {
    // Arrange
    mockedAxios.get.mockRejectedValueOnce(new Error("Network down"));

    const { actions, dispatch } = createDispatchCollector();
    const getState = () => getStateWithQuery({});

    // Act
    await fetchCharacters()(dispatch as never, getState as never);

    // Assert
    expect(actions[0]?.type).toBe("characters/fetchStart");
    expect(actions[1]?.type).toBe("characters/fetchError");
    expect(actions[1]?.payload).toMatch(/Failed to load/i);
  });
});
