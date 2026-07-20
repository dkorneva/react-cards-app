import { useEffect, useState, useRef, useMemo } from "react";
// import cls from "./HomePage.module.css"
import { QuestionCard } from "../../components/QuestionCard";
import { API_URL } from "../../constants";
import { QuestionCardList } from "../../components/QuestionCardList";
import { Loader } from '../../components/Loader';
import { useFetch } from "../../hooks/useFetch";
import { SearchInput } from "../../components/SearchInput";
import cls from "./HomePage.module.css"

export const HomePage = () => {
  // большинство хуков React можно вызвать только на верхнем уровне
  // т.е., например, нельзя вызвать useState внутри getQuestions
  const [questions, setQuestions] = useState([]);
  const [searchValue, setSearchValue] = useState(""); // управляемый input 

  // const inputRef = useRef(); // данная ссылка не является состоянием, а представлет из себя ссылку на какой-то элемент, значение данного элемента сохраняется между перерисовками, оно постоянное и не будет сбрасываться
  // с помощью данного референса можно также управлять скроллом, получать данные у input (например, делать какую-либо константу)
  // данный способ является прямой альтернативой selectQuery из JS

  const [getQuestions, isLoading, error] = useFetch(async (url) => {
    const response = await fetch(`${API_URL}/${url}`);

    if (!response.ok) {
      throw new Error(`Ошибка загрузки: ${response.status}`);
    }

    const questions = await response.json();

    setQuestions(questions);
    return questions;
  })

  const cards = useMemo(() => {
    return questions.filter(d =>
			d.question.toLowerCase().includes(searchValue.trim().toLowerCase()),
		)
  }, [questions, searchValue]) 

  // useEffect ничего не возваращает, в качестве параметров у него callback-функция и массив зависимостей, при которых callback-функция будет отрабатывать, если оставить массив зависимостей пустым, callback-функция отработает один раз - когда смонтируется компонент
  useEffect(() => {
    getQuestions("react");
  }, [])

  // getQuestions(); // при вызове таким образом, будет двойной рендер - по количеству запросов, этого можно и нужно избежать при помощи хука useEffect;

  // const testRefHandler = () => {
  //   console.log("Ref", inputRef.current.value)
  // }

  const onSearchChangeValueHandler = (e) => {
    setSearchValue(e.target.value);
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
			<div className={cls.controlsContainer}>
        <SearchInput value={searchValue} onChange={onSearchChangeValueHandler}/>
      </div>
			{isLoading && <Loader />}
			{error && <p>{error}</p>}
      {cards.length === 0 && <p className={cls.noCardsInfo}>No cards...</p>}

			<QuestionCardList cards={cards} />
		</>
	)
}
