import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(

/*
Strict Mode

Нужен только для разработки, чтобы отлавливать нежелательные эффекты. Он не влияет на поведение приложения в продакшене, а используется только в режиме разработки

Strict Mode = доп. перерисовки
*/

  <StrictMode>
    <App />
  </StrictMode>,
)
