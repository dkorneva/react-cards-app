import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainLayout } from './components/MainLayout'

function App() {
  return (
  <BrowserRouter>
    <Routes>
      {/* MainLayout - самый главный с точки зрения разметки всего приложения */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<div>home</div>} />
        <Route path="/main" element={<div>main component</div>} />
        <Route path="/forbidden" element={<div>forbidden</div>} />
        <Route path="/addquestion" element={<div>add question</div>} />
      </Route>
    </Routes>
  </BrowserRouter>)
}

export default App
