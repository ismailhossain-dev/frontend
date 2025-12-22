import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './routes/Routes.jsx'
import { RouterProvider } from 'react-router'
import AuthProvider from './providers/AuthProvider.jsx'
import { Toaster } from 'react-hot-toast'
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
//map
import 'leaflet/dist/leaflet.css';

//TansStack Query 
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <div>
    {/* TansStack Query set  */}
   <QueryClientProvider client={queryClient}>
     <AuthProvider>
      <RouterProvider router={router} />
      <Toaster position='top-right' reverseOrder={false} />
    </AuthProvider>
   </QueryClientProvider>
   {/* Tanstack query use */}
  </div>
)
