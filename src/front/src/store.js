export const initialStore = () => {
  return {
    userLocation: null,
    suggestedCoords: [],
    selectedBase: null,
  }
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "ADD_USER_LOCATION":
      return{...store,
    userLocation: action.payload,} 
      
    case "SET_SELECTED_BASE":
      return {
        ...store,
        selectedBase: {
          name: action.payload.name,
          latitude: action.payload.latitude,
          longitude: action.payload.longitude,
        },
      };

    default:
      return store;
  }
}