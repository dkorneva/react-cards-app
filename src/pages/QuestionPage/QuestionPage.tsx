import { useId, useState, useEffect } from 'react'
import cls from './QuestionPage.module.css'
import { Badge } from '../../components/Badge'
import { Button } from '../../components/Button'
import { useNavigate, useParams } from 'react-router-dom'
import { useFetch } from '../../hooks/useFetch'
import { API_URL, AUTH_STORAGE } from '../../constants'
import { Loader, SmallLoader } from '../../components/Loader'
import { useAuth } from '../../hooks/useAuth' 

// поскольку QuestionPage является страницей, она не имеет ни одного пропса
export const QuestionPage = () => {
	const checkboxId = useId()
	const navigate = useNavigate()
	const {id} = useParams();
	const [card, setCard] = useState(null)
	const [isChecked, setIsChecked] = useState(true)
	const {isAuth, setIsAuth} = useAuth()


	const levelVariant = () => { return card.level === 1 && card !== null
		? 'primary'
		: card.level === 2
			? 'warning'
			: 'alert'}
	const completedVariant = () => {return card.completed ? 'success' : 'primary'}

	const [fetchCard, isCardLoading] = useFetch(async () => {
		const response = await fetch(`${API_URL}/react/${id}`);
		const data = await response.json();

		if(!response.ok) {
			throw new Error(response.statusText);
		}

		setCard(data);
	}) 

	const [updateCard, isCardUpdating] = useFetch(async (isChecked) => {
		const response = await fetch(`${API_URL}/react/${id}`, {
			method: "PATCH",
			body: JSON.stringify({completed: isChecked}),
		});

		if(!response.ok) {
			throw new Error(response.statusText);
		}

		const data = await response.json();

		setCard(data);
	})

	useEffect(() => {
		fetchCard();
	}, []);

	useEffect(() => {
		card !== null && setIsChecked(card.completed)
	}, [card])

	const onCheckboxChangeHandler = () => {
		setIsChecked(!isChecked);
		updateCard(!isChecked);
	}

	return (
		// нужно предусмотреть вариант, если card === 0
		// однако нужно вернуть любую разметку, если card === 0, это условие нарушается
		// поэтому оборачиваем всё выражение в react element
		<>
		{isCardLoading && <Loader />}
			{card !== null && (
				<div className={cls.container}>
					<div className={cls.cardLabels}>
						<Badge variant={levelVariant()}>Level: {card.level}</Badge>
						<Badge variant={completedVariant()}>
							{card.completed ? 'Completed' : 'Not Completed'}
						</Badge>

						{card?.editDate && (
							<p className={cls.editDate}>Edited: {card.editDate}</p>
						)}
					</div>

					<h5 className={cls.cardTitle}>{card.question}</h5>

					<p className={cls.cardDescription}>{card.description}</p>

					<div className={cls.cardAnswers}>
						<label>short answer: </label>
						<p className={cls.cardAnswer}>{card.answer}</p>
					</div>

					<ul className={cls.cardLinks}>
						Resources:
						{card.resources.map((link, index) => {
							// массив статический, поэтому необходимо использовать key!!!
							return (
								<li key={index}>
									<a href={link.trim()} target='_blank' rel='noreferrer'>
										{link.trim()}
									</a>
								</li>
							)
						})}
					</ul>

					<label htmlFor={checkboxId} className={cls.cardCheckbox}>
						<input
							type='checkbox'
							id={checkboxId}
							className={cls.checkbox}
							checked={isChecked}
							onChange={onCheckboxChangeHandler}
							disabled={isCardUpdating}
						/>
						<span>mark question as completed</span>

						{isCardUpdating && <SmallLoader/>}
					</label>

					{isAuth && <Button onClick={() => navigate(`/editquestion/${card.id}`)} isDisabled={isCardUpdating}>
						Edit
					</Button>}
					<Button onClick={() => navigate('/')} isDisabled={isCardUpdating}>Back</Button>
				</div>
			)}
		</>
	)
}
