export const initialStore = () => {
  return {
    userLocation: null,
    suggestedCoords: [],
    selectedBase: null,
    eventList: [],
    userData: null,
    issPassesList: null,
    userActiveMission: null,
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
          coordinates: {
            latitude: action.payload.coordinates.latitude,
            longitude: action.payload.coordinates.longitude,
          },
        },
      };

    case "SET_EVENT_LIST":
      return { ...store, eventList: [...action.payload] }

    case "SET_ISS_PASSES":
      return { ...store, issPassesList: action.payload }

    case "ADD_USER_DATA":
      return { ...store, userData: action.payload }

    case "ADD_USER_ACTIVE_MISSION":
      return { ...store, userActiveMission: action.payload }

    default:
      return store;
  }
}