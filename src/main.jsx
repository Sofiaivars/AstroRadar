import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from '../routes.jsx'
import { StoreProvider } from './hooks/useGlobalReducer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StoreProvider>
      <RouterProvider router={router}/>
    </StoreProvider>
  </StrictMode>,
)
