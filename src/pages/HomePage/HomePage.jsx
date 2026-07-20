import { useEffect, useState } from "react";
// import cls from "./HomePage.module.css"
import { QuestionCard } from "../../components/QuestionCard";
import { API_URL } from "../../constants";
import { QuestionCardList } from "../../components/QuestionCardList";
import { Loader } from '../../components/Loader'

export const HomePage = () => {
  const [questions, setQuestions] = useState([]);

  const getQuestions = async () => {
		try {
      const response = await fetch(`${API_URL}/react`);
      const questions = await response.json();

      setQuestions(questions);

      console.log("questions", questions);
		} catch (error) {
      console.error(error)
    }
	}

  // useEffect ничего не возваращает, в качестве параметров у него callback-функция и массив зависимостей, при которых callback-функция будет отрабатывать, если оставить массив зависимостей пустым, callback-функция отработает один раз - когда смонтируется компонент
  useEffect(() => {
    getQuestions();
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
    <Loader/>
    <QuestionCardList cards={questions}/>
    </>
  );
}