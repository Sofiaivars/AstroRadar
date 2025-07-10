export const initialStore = () => {
  return {
    userLocation: null,
    suggestedCoords: [],
    selectedBase: null,
    eventList: [],
  }
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "ADD_USER_LOCATION":
      return {
        ...store,
        userLocation: action.payload,
      }

    case "SET_SELECTED_BASE":
      return {
        ...store,
        selectedBase: {
          name: action.payload.name,
          latitude: action.payload.latitude,
          longitude: action.payload.longitude,
        },
      };

    case "SET_EVENT_LIST":
      return { ...store, eventList: [...action.payload] }

    default:
      return store;
  }
}