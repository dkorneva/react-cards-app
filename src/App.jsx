import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MainLayout } from './components/MainLayout'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { QuestionPage } from './pages/QuestionPage'
import { AddQuestionPageLazy } from './pages/AddQuestionPage'
import { EditQuestionPage } from './pages/EditQuestionPage'

function App() {
  return (
		<BrowserRouter>
			<Routes>
				{/* MainLayout - самый главный с точки зрения разметки всего приложения */}
				<Route element={<MainLayout />}>
					<Route path='/' element={<HomePage />} />
					<Route path='/main' element={<div>main component</div>} />
					<Route path='/forbidden' element={<div>forbidden</div>} />
					<Route path='/addquestion' element={<AddQuestionPageLazy/>} />
					{/* для динамики в react-router необходимо поставить :id, т.е. связываем задекларированный маршрут с конкретным маршрутом из QuestionCard*/}
					<Route path='/question/:id' element={<QuestionPage />} />
					<Route path='/editquestion/:id' element={<EditQuestionPage/>}></Route>

					{/* path="*" необходим для всех остальных маршрутов, которые не были задекларированы */}
					<Route path='*' element={<NotFoundPage />}></Route>
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
