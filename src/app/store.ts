import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  type AnyAction,
  type Dispatch,
  type Middleware,
} from "redux";
import charactersReducer from "../features/characters/charactersStore";

const rootReducer = combineReducers({
  characters: charactersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type ThunkAction<R = unknown> = (
  dispatch: AppDispatch,
  getState: () => RootState,
) => R;

export type AppDispatch = Dispatch<AnyAction> &
  ((thunk: ThunkAction) => unknown);

const thunkMiddleware: Middleware<unknown, RootState, AppDispatch> =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (typeof action === "function") {
      return (action as ThunkAction)(dispatch, getState);
    }
    return next(action as AnyAction);
  };

const composeEnhancers =
  (import.meta.env.DEV &&
    (
      window as unknown as {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
      }
    ).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const store = createStore(
  rootReducer,
  undefined,
  composeEnhancers(applyMiddleware(thunkMiddleware)),
);
