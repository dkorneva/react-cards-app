import { useActionState } from 'react'
import cls from './AddQuestionPage.module.css'
import { delayFn } from '../../helpers/delayFn'
import { toast } from 'react-toastify'
import { API_URL } from '../../constants'
import { Loader } from '../../components/Loader'
import { QuestionForm } from '../../components/QuestionForm'

// createCardAction по умолчанию принимает 2 аргумента, потому что под капотом useActionState кладёт в эту функцию именно 2 аргумента
// _prevState с нижним подчёркиванием, потому что это значение будет не нужно в данном случае
// данная функция обозначает логику отправки данных формы на сервер
const createCardAction = async (_prevState, formData) => {
  try {
    await delayFn();
    // console.log("formData", Object.fromEntries(formData));
    // console.log("formData", formData.get("question"));

    const newQuestion = Object.fromEntries(formData);
    const resources = newQuestion.resources.trim();
    const isClearForm = newQuestion.clearForm;

    const response = await fetch(`${API_URL}/react`, {
      method: "POST",
      body: JSON.stringify({
        question: newQuestion.question,
        answer: newQuestion.answer,
        description: newQuestion.description,
        resources: resources.length ? resources.split(",") : [],
        level: Number(newQuestion.level),
        completed: false,
        editDate: undefined // данное поле будет использоваться только для EditQuestionPage
      })
    })

    console.log("response", response)

    if(response.status === 404) {
      throw new Error(response.statusText)
    }

    const question = await response.json();
    toast.success("New question is successfully created!")

    return isClearForm ? {} : question; // когда выполнена отправка на сервер, отработал action (createCardAction), если ничего не возвращать, то следующий formState в useActionState становится undefined, поэтому обязательно должно что-то возвращаться
  } catch (error) {
		toast.error(error.message)
		return {} // значение возвращается, только если выполняется условие isClearForm ? {} : question;, из-за этого возникает ошибка, что question может быть undefined
	}
}

const AddQuestionPage = () => {
	// const [formState, formAction, isPending] = useActionState(fn, initialState);
	// useActionState возвращает кортеж:
	// 1) formState изначально равен initialState, а после отправки формы он будет равен значению, которая вернёт функция fn, переданная в useActionState
	// 2) formAction - функция, которая будет добавляться в форму в атрибут action - когда будет отправляться форма, будет отрабатывать данная функция
	// 3) isPending - индикатор запроса на сервер
	// useActionState хорошо подходит для форм
	const [formState, formAction, isPending] = useActionState(createCardAction, {clearForm: true}) // поля cleatForm нет в БД, оно придумано, нужно для чекбокса

	return (
		<>
    {isPending && <Loader/>}

			<h1 className={cls.formTitle}>Add new question</h1>

			<div className={cls.formContainer}>
				<QuestionForm formAction={formAction} state={formState} isPending={isPending} submitBtnText="Add Question"/>
			</div>
		</>
	)
}

export default AddQuestionPage;