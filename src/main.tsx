import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/archivo/standard.css'
import '@fontsource/instrument-serif/latin-400-italic.css'
import './index.css'
import { App } from './App'
import { RouterProvider } from './lib/router'

if ('scrollRestoration' in history) history.scrollRestoration = 'manual'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider>
      <App />
    </RouterProvider>
  </StrictMode>,
)
