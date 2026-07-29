import { memo, type FC } from 'react'
import cls from './QuestionCardList.module.css'
import { QuestionCard } from '../QuestionCard'
import type { IQuestionCard } from '../../types/global.types';

// Сейчас при каждом вводе в input происходит перерендер всех карточек
// Для того, чтобы избежать этого, используется memo
/*
memo - это функция в React, которая позволяет пропустить повторный рендер компонента, 
если пропсы не изменились
Другими словами memo мемоизирует компонент

Мемоизация - это процесс сохранения результатов выполнения функции с определёнными
аргументами и возврата результата при повторном вызове функции с теми же аргументами
*/

export interface IQuestionCardListProps {
	cards: IQuestionCard[];
}

export const QuestionCardList: FC<IQuestionCardListProps> = memo(({ cards }) => {
	return (
		<div className={cls.cardList}>
			{cards.map((card, index) => {
				return <QuestionCard card={card} key={index} />
			})}
		</div>
	)
})
