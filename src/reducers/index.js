const initialState = {
  heroes: [],
  heroesLoadingStatus: "idle",
  filters: [],
  activeFilter: "all",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "HEROES_FETCHING":
      return {
        ...state,
        heroesLoadingStatus: "loading",
      };
    case "HEROES_FETCHED":
      return {
        ...state,
        heroes: action.payload,
        heroesLoadingStatus: "idle",
      };
    case "FILTERS_FETCHED":
      return {
        ...state,
        filters: action.payload,
      };
    case "HEROES_FETCHING_ERROR":
      return {
        ...state,
        heroesLoadingStatus: "error",
      };
    case "ACTIVE_FILTER_SET":
      return {
        ...state,
        activeFilter: action.payload,
      };
    case "HERO_DELETE":
      return {
        ...state,
        heroes: state.heroes.filter((hero) => hero.id !== action.payload),
      };
    case "HERO_ADD":
      return {
        ...state,
        heroes: [
          ...state.heroes,
          {
            id: action.payload.id,
            name: action.payload.name,
            description: action.payload.text,
            element: action.payload.element,
          },
        ],
      };
    default:
      return state;
  }
};

export default reducer;
