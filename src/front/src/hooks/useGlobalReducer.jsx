import { useContext, useReducer, createContext } from "react";
import storeReducer, { initialStore } from "../store.js"

const StoreContext = createContext()

export function StoreProvider({ children }){
  const [store, dispatch] = useReducer(storeReducer, initialStore())
  
  return (
    <StoreProvider.Provider value={{ store, dispatch }}>
      {children}
    </StoreProvider.Provider>
  )
}

export default function useGlobalReducer(){
  return useContext(StoreContext)
}