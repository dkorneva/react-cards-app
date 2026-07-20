import { Outlet } from "react-router-dom";
import cls from "./MainLayout.module.css";
import { Header } from "../Header";

export const MainLayout = () => {
  const currentYear = new Date().getFullYear();
  return (
  <div className={cls.mainLayout}>
    <Header />
    {/* main и footer специально в отдельном div, чтобы реализовать скролл под header */}
    <div className={cls.mainWrapper}>
      <main className={cls.main}>
        {/* Outlet указывает библиотеке, где именно внутри родительского макета (layout) нужно отобразить дочерний компонент, соответствующий текущему URL */}
        <Outlet />
      </main>
      <footer className={cls.footer}>
        React Question Cards Application | {currentYear} <br />
        by Daria K
      </footer>
    </div>
  </div>
  );
};
