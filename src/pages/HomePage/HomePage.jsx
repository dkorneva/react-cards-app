import { } from "react";
import cls from "./HomePage.module.css"
import { QuestionCard } from "../../components/QuestionCard";

const cards = [
    {
      "id": "1",
      "question": "Что такое React?",
      "answer": "React — это библиотека для создания пользовательских интерфейсов.",
      "description": "React — это JavaScript-библиотека, разработанная Facebook, которая используется для построения UI с компонентным подходом. React позволяет вам создавать пользовательские интерфейсы из отдельных частей, называемых компонентами.",
      "resources": [
        "https://react.dev",
        "https://react.dev/reference/react"
      ],
      "level": 1,
      "completed": true,
      "editDate": "03.02.2025, 19:49"
    },
    {
      "id": "2",
      "question": "Что такое JSX?",
      "answer": "JSX — это синтаксическое расширение JavaScript для React.",
      "description": "JSX позволяет писать HTML-подобный код в JavaScript, который затем транспилируется в вызовы `React.createElement`. Он облегчает создание и визуальное представление структуры компонентов.",
      "resources": [
        "https://react.dev/learn/writing-markup-with-jsx"
      ],
      "level": 2,
      "completed": false,
      "editDate": "03.02.2025, 20:25"
    },
    {
      "id": "3",
      "question": "Какой основной принцип работы React?",
      "answer": "React использует Virtual DOM для оптимизации рендеринга.",
      "description": "React поддерживает концепцию Virtual DOM — это представление реального DOM в памяти. Когда состояние компонента изменяется, React сравнивает Virtual DOM с предыдущим состоянием и обновляет только измененные элементы на странице.",
      "resources": [
        "https://react.dev/learn/render-and-commit"
      ],
      "level": 2,
      "completed": false,
      "editDate": "03.02.2025, 19:01"
    },
    {
      "id": "4",
      "question": "Как создать компонент в React?🍩",
      "answer": "Компонент можно создать как функцию или класс.",
      "description": "Функциональные компоненты — это функции, принимающие `props` и возвращающие JSX. Классовые компоненты — это классы, наследуемые от `React.Component`, с методом `render`.",
      "resources": [
        "https://react.dev/learn/your-first-component"
      ],
      "level": 1,
      "completed": false,
      "editDate": "21.02.2025, 20:26"
    },
]

export const HomePage = () => {
  return (
    // в react обязателен родительский элемент, в который оборачиваются дочерние элементы
    // в данном случае таким элементом служит div с классом test-class, удалить его нельзя
    // но в react есть концепция виртуального родительского класса - react fragment
    // ниже представлен вариант без импортов, но есть также варианты с тегами React.Fragment или Fragment
    <> 
    {cards.map((card, index) => {
      return <QuestionCard card={card} key={index}/>
    })}
    </>
  );
}