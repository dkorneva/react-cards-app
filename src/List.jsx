import { } from 'react';

const items = [
  {
    task: "Выучить React",
    icon: "icon",
    isCompleted: true,
  },
  {
    task: "Закрепить JavaScript",
    icon: "icon",
    isCompleted: true,
  },
  {
    task: "Не забивать на английский",
    icon: "icon",
    isCompleted: false,
  },
];

export const List = () => {
  return (
    <div>
      {
        items.map((item, index) => {
          return (
            <section key={index} className={item.isCompleted ? "completed" : ""}>
              <span>{item.icon}</span>
              <h4>{item.task}</h4>
            </section>
          );
        })
      }
    </div>
  );
};