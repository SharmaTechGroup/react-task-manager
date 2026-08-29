import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { CookiesProvider } from 'react-cookie'
import { RouterProvider } from 'react-router-dom'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import router from './routes/routes.jsx' 

createRoot(document.getElementById('root')).render(
   <CookiesProvider>
      <RouterProvider router={router} />
   </CookiesProvider>
)
