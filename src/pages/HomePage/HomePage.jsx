import { useEffect, useState } from "react";
// import cls from "./HomePage.module.css"
import { QuestionCard } from "../../components/QuestionCard";
import { API_URL } from "../../constants";
import { QuestionCardList } from "../../components/QuestionCardList";
import { Loader } from '../../components/Loader';
import { useFetch } from "../../hooks/useFetch";

export const HomePage = () => {
  // большинство хуков React можно вызвать только на верхнем уровне
  // т.е., например, нельзя вызвать useState внутри getQuestions
  const [questions, setQuestions] = useState([]);

  const [getQuestions, isLoading, error] = useFetch(async (url) => {
    const response = await fetch(`${API_URL}/${url}`);

    if (!response.ok) {
      throw new Error(`Ошибка загрузки: ${response.status}`);
    }

    const questions = await response.json();

    setQuestions(questions);
    return questions;
  })

  // useEffect ничего не возваращает, в качестве параметров у него callback-функция и массив зависимостей, при которых callback-функция будет отрабатывать, если оставить массив зависимостей пустым, callback-функция отработает один раз - когда смонтируется компонент
  useEffect(() => {
    getQuestions("react1");
  }, [])

  // getQuestions(); // при вызове таким образом, будет двойной рендер - по количеству запросов, этого можно и нужно избежать при помощи хука useEffect;

  return (
    // в react обязателен родительский элемент, в который оборачиваются дочерние элементы
    // в данном случае таким элементом служит div с классом test-class, удалить его нельзя
    // но в react есть концепция виртуального родительского класса - react fragment
    // ниже представлен вариант без импортов, но есть также варианты с тегами React.Fragment или Fragment
    <> 
    {/* {questions.map((card, index) => {
      return <QuestionCard card={card} key={index}/>
    })} */}
    {isLoading && <Loader/>}
    {error && <p>{error}</p>}
    <QuestionCardList cards={questions}/>
    </>
  );
}
