export const initialStore = () => {
  return {
    userLocation: null,
    suggestedCoords: [],
  }
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "ADD_USER_LOCATION":
      return;

    default:
      return store;
  }
}