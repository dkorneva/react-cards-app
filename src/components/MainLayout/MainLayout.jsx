import { Outlet } from 'react-router-dom'
import cls from './MainLayout.module.css'
import { Header } from '../Header'
import { ToastContainer } from 'react-toastify'
import { Suspense } from 'react'
import { Loader } from '../Loader'

export const MainLayout = () => {
	const currentYear = new Date().getFullYear()
	return (
		<>
			<div className={cls.mainLayout}>
				<Header />
				{/* main и footer специально в отдельном div, чтобы реализовать скролл под header */}
				<div className={cls.mainWrapper}>
					<main className={cls.main}>
						{/* Outlet указывает библиотеке, где именно внутри родительского макета (layout) нужно отобразить дочерний компонент, соответствующий текущему URL */}
						{/* Suspence - глобальный провайдер, который позволяет красиво загружать ленивые компоненты, fallback отображается при загрузке ленивого компонента */}
						<Suspense fallback={<Loader />}>
						<Outlet />
						</Suspense>
					</main>
					<footer className={cls.footer}>
						React Question Cards Application | {currentYear} <br />
						by Daria K
					</footer>
				</div>
			</div>

{/* Провайдер для тостов - место, куда всегда будут рендериться тосты, вставляем независимо от основной разметки */}
			<ToastContainer/>
		</>
	)
}
