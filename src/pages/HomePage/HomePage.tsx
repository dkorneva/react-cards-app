import {
	useEffect,
	useState,
	useRef,
	useMemo,
	type ChangeEvent,
	type MouseEvent,
} from 'react'
// import cls from "./HomePage.module.css"
import { API_URL } from '../../constants/global.constants'
import { QuestionCardList } from '../../components/QuestionCardList'
import { Loader } from '../../components/Loader'
import { useFetch } from '../../hooks/useFetch'
import { SearchInput } from '../../components/SearchInput'
import { Button } from '../../components/Button'
import type { IQuestionCardData } from '../../types/global.types'
import cls from './HomePage.module.css'

const DEFAULT_PER_PAGE = 10

export const HomePage = () => {
	// большинство хуков React можно вызвать только на верхнем уровне
	// т.е., например, нельзя вызвать useState внутри getQuestions
	const [searchParams, setSearchParams] = useState<string>(
		`?_page=1&_per_page=${DEFAULT_PER_PAGE}`,
	)
	const [questions, setQuestions] = useState<IQuestionCardData | null>(null)
	const [searchValue, setSearchValue] = useState<string>('') // управляемый input
	const [sortSelectValue, setSortSelectValue] = useState<string>('')
	const controlsContainerRef = useRef<HTMLDivElement | null>(null)
	const [countSelectValue, setCountSelectValue] = useState<string>('')

	const getActivePageNumber = (questions: IQuestionCardData): number | null => {
		return questions.next === null ? questions.last : questions.next - 1
	}

	// const inputRef = useRef(); // данная ссылка не является состоянием, а представлет из себя ссылку на какой-то элемент, значение данного элемента сохраняется между перерисовками, оно постоянное и не будет сбрасываться
	// с помощью данного референса можно также управлять скроллом, получать данные у input (например, делать какую-либо константу)
	// данный способ является прямой альтернативой selectQuery из JS

	const [getQuestions, isLoading, error] = useFetch(async url => {
		const response = await fetch(`${API_URL}/${url}`)

		if (!response.ok) {
			throw new Error(`Ошибка загрузки: ${response.status}`)
		}

		const questions = await response.json()

		setQuestions(questions)
		return questions
	})

	const cards = useMemo(() => {
		if (questions?.data) {
			if (searchValue.trim()) {
				return questions.data.filter(d =>
					d.question.toLowerCase().includes(searchValue.trim().toLowerCase()),
				)
			} else {
				return questions.data
			}
		}
		return []
	}, [questions, searchValue])

	// используем useMemo, чтобы pagination не пересчитывался на каждый перерендер, пересчёт будет только при изменении questions
	const pagintaion = useMemo(() => {
		const totalCardsCount = questions?.pages || 0

		return Array(totalCardsCount)
			.fill(0)
			.map((_, i) => i + 1) // формирование массива с опред. количеством значений с опред. значениями у элементов; кол-во элементов - totalCardsCount, заполнить массив нулями, пройтись по массиву и заполнить его значениями номеров страниц
	}, [questions])

	// useEffect ничего не возваращает, в качестве параметров у него callback-функция и массив зависимостей, при которых callback-функция будет отрабатывать, если оставить массив зависимостей пустым, callback-функция отработает один раз - когда смонтируется компонент
	useEffect(() => {
		getQuestions(`react${searchParams}`)
	}, [searchParams])

	// getQuestions(); // при вызове таким образом, будет двойной рендер - по количеству запросов, этого можно и нужно избежать при помощи хука useEffect;

	// const testRefHandler = () => {
	//   console.log("Ref", inputRef.current.value)
	// }

	const onSearchChangeValueHandler = (e: ChangeEvent<HTMLInputElement>): void => {
		setSearchValue(e.target.value)
	}

	const onSortSelectChangeHandler = (e: ChangeEvent<HTMLSelectElement>): void => {
		setSortSelectValue(e.target.value)

		setSearchParams(`?_page=1&_per_page=${countSelectValue}&${e.target.value}`)
	}

	const paginationHandler = (e: MouseEvent<HTMLDivElement>): void => {
		const targetElement = e.target as HTMLElement

		if (targetElement.tagName === 'BUTTON') {
			setSearchParams(
				`?_page=${targetElement.textContent}&_per_page=${countSelectValue}&${sortSelectValue}`,
			)
			controlsContainerRef.current?.scrollIntoView({ behavior: 'smooth' }) // у контрола вызываем поле current, у которого вызываем метод js scrollIntoView(), behhavior: "smooth" отвечает за плавность скролла
		}
	}

	const onCountSelectChangeHandler = (e: ChangeEvent<HTMLSelectElement>): void => {
		setCountSelectValue(e.target.value)
		setSearchParams(`?_page=1&_per_page=${e.target.value}&${sortSelectValue}`)
	}

	return (
		// в react обязателен родительский элемент, в который оборачиваются дочерние элементы
		// в данном случае таким элементом служит div с классом test-class, удалить его нельзя
		// но в react есть концепция виртуального родительского класса - react fragment
		// ниже представлен вариант без импортов, но есть также варианты с тегами React.Fragment или Fragment
		<>
			{/* {questions.map((card, index) => {
      return <QuestionCard card={card} key={index}/>
    })} */}
			{/* <input type="text" ref={inputRef}/> неуправляемый input, для получения значения используется ref */}
			<div className={cls.controlsContainer} ref={controlsContainerRef}>
				<SearchInput
					value={searchValue}
					onChange={onSearchChangeValueHandler}
				/>

				<select
					value={sortSelectValue}
					onChange={onSortSelectChangeHandler}
					className={cls.select}
				>
					<option value=''>sortby</option>
					<hr />
					<option value='_sort=level'>level ASC</option>
					<option value='_sort=-level'>level DESC</option>
					<option value='_sort=completed'>completed ASC</option>
					<option value='_sort=-completed'>completed DESC</option>
				</select>

				<select
					value={countSelectValue}
					onChange={onCountSelectChangeHandler}
					className={cls.select}
				>
					<option disabled>count</option>
					<hr />
					<option value='10'>10</option>
					<option value='20'>20</option>
					<option value='30'>30</option>
					<option value='50'>50</option>
					<option value='100'>100</option>
				</select>
			</div>
			{isLoading && <Loader />}
			{error && <p>{error}</p>}

			<QuestionCardList cards={cards} />

			{/* Для реализации динамической пагинации используется паттерн Event Delegation 
  Т.е. прослушиватель событий был повешен только на общий блок-враппер, а не накаждый 
  элемент Button*/}
			{cards.length === 0 ? (
				<p className={cls.noCardsInfo}>No cards...</p>
			) : (
				pagintaion.length > 1 && (
					<div className={cls.pagintaionContainer} onClick={paginationHandler}>
						{pagintaion.map(value => {
							return (
								<Button key={value} isActive={value === getActivePageNumber(questions as IQuestionCardData)}>
									{value}
								</Button>
							)
						})}
					</div>
				)
			)}
		</>
	)
}
