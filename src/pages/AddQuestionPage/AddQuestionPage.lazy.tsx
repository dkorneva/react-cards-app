/*
Ленивая загрузка компонентов - загрузка компонентов только тогда, когда они действительно нужны, 
это помогает уменьшить размер bundle и улучшить производительность приложения
Lazy обычно используется с компонентом Suspense, чтобы отображать fallback при загрузке
*/

import { lazy } from "react";

const AddQuestionPageLazy = lazy(() => import("./AddQuestionPage"));

export default AddQuestionPageLazy;