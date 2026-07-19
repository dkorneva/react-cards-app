import cls from "./MainLayout.module.css";

export const MainLayout = () => {
  const currentYear = new Date().getFullYear();
  return (
  <div className={cls.mainLayout}>
    <header>header</header>
    {/* main и footer специально в отдельном div, чтобы реализовать скролл под header */}
    <div className={cls.mainWrapper}>
      <main className={cls.main}>main</main>
      <footer className={cls.footer}>
        React Question Cards Application | {currentYear} <br />
        by Daria K
      </footer>
    </div>
  </div>
  );
};
