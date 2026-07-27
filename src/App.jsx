import {
	BrowserRouter,
	Outlet,
	Route,
	Routes,
	Navigate,
	useLocation,
} from 'react-router-dom'
import { MainLayout } from './components/MainLayout'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { QuestionPage } from './pages/QuestionPage'
import { AddQuestionPageLazy } from './pages/AddQuestionPage'
import { EditQuestionPage } from './pages/EditQuestionPage'
import { AuthProvider } from './auth/AuthProvider'
import { useAuth } from './hooks/useAuth'
import { ForbiddenPage } from './pages/ForbiddenPage'

const ProtectedRoutes = () => {
	const {isAuth} = useAuth();
	const location = useLocation();

	// флаг replace очищает из истории страницу, которая была до forbidden (а обычно это запрещённая страница)
	// между роутами можно обмениваться state с помощью react-router-dom
	return isAuth ? <Outlet /> : <Navigate to='/forbidden' state={{from: location.pathname}} replace/>
}

function App() {
	return (
		// после оборачивания в AuthProvider для каждой страницы будет доступно состояние [isAuth, setIsAuth]
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					{/* MainLayout - самый главный с точки зрения разметки всего приложения */}
					<Route element={<MainLayout />}>
						<Route path='/' element={<HomePage />} />
						<Route path='/main' element={<div>main component</div>} />
						<Route path='/forbidden' element={<ForbiddenPage />}/>
						{/* для динамики в react-router необходимо поставить :id, т.е. связываем задекларированный маршрут с конкретным маршрутом из QuestionCard*/}
						<Route path='/question/:id' element={<QuestionPage />} />

						<Route element={<ProtectedRoutes />}>
							<Route path='/addquestion' element={<AddQuestionPageLazy />} />
							<Route
								path='/editquestion/:id'
								element={<EditQuestionPage />}
							></Route>
						</Route>

						{/* path="*" необходим для всех остальных маршрутов, которые не были задекларированы */}
						<Route path='*' element={<NotFoundPage />}></Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	)
}

export default App
