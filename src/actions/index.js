export const heroesFetching = () => {
  return {
    type: "HEROES_FETCHING",
  };
};

export const heroesFetched = (heroes) => {
  return {
    type: "HEROES_FETCHED",
    payload: heroes,
  };
};

export const filtersFetched = (filters) => {
  return {
    type: "FILTERS_FETCHED",
    payload: filters,
  };
};

export const filtersFetchingError = () => {
  return {
    type: "FILTERS_FETCHING_ERROR",
  };
};

export const activeFilterSet = (filter) => {
  return {
    type: "ACTIVE_FILTER_SET",
    payload: filter,
  };
};

export const heroesFetchingError = () => {
  return {
    type: "HEROES_FETCHING_ERROR",
  };
};

export const heroDelete = (heroId) => {
  return {
    type: "HERO_DELETE",
    payload: heroId,
  };
};
export const heroAdd = (data) => {
  return {
    type: "HERO_ADD",
    payload: data,
  };
};
