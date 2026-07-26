import { useActionState } from 'react'
import cls from './AddQuestionPage.module.css'
import {Button} from "../../components/Button"
import { delayFn } from '../../helpers/delayFn'
import { toast } from 'react-toastify'
import { API_URL } from '../../constants'
import { Loader } from '../../components/Loader'

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
				<form action={formAction} className={cls.form}>
					<div className={cls.formControl}>
						<label htmlFor='questionField'>Question: </label>
						<textarea
							// есть атрибут value, а есть атрибут defaultValue, когда мы используем неуправляемый контрол (у которого нет состояния, которое управляется с помоью React), то используем defaultValue, чтобы дать изначальное значение для контрола, value используем для состояния, при подвязывании элемента и функции изменения состояния через eventOnChange
							defaultValue={formState.question}
							name='question'
							id='questionField'
							cols='30'
							rows='2'
							required
							placeholder='please enter question'
						></textarea>
						{/* в данном случае поле name обязательно, по нему будут доставаться значения из полей для взаимодействия с бэкендом, name желательно должен совпадать с полями, которые есть в БД */}
					</div>
					<div className={cls.formControl}>
						<label htmlFor='answerField'>Short Answer: </label>
						<textarea
							defaultValue={formState.answer}
							name='answer'
							id='answerField'
							cols='30'
							rows='2'
							required
							placeholder='please enter short answer'
						></textarea>
					</div>
					<div className={cls.formControl}>
						<label htmlFor='descriptionField'>Description: </label>
						<textarea
							defaultValue={formState.description}
							name='description'
							id='descriptionField'
							cols='30'
							rows='5'
							required
							placeholder='please enter a full description'
						></textarea>
					</div>
					<div className={cls.formControl}>
						<label htmlFor='resourcesField'>Resources: </label>
						<textarea
							defaultValue={formState.resources}
							name='resources'
							id='resourcesField'
							cols='30'
							rows='2'
							placeholder='please enter resources separated by commas'
						></textarea>
					</div>
					<div className={cls.formControl}>
						<label htmlFor='levelField'>Level: </label>
						<select name='level' id='levelField' defaultValue={formState.level}>
							<option disabled>Question level</option>
							<hr />
							<option value='1'>1 - easiest</option>
							<option value='2'>2 - medium</option>
							<option value='3'>3 - hardest</option>
						</select>
					</div>

					<label htmlFor='clearFormField' className={cls.clearFormControl}>
						<input
							className={cls.checkbox}
							type='checkbox'
							name='clearForm'
							id='clearFormField'
							defaultChecked={formState.clearForm}
						/>
						<span>Clear form after submitting?</span>
					</label>

					<Button isDisabled={isPending}>Add question</Button>
				</form>
			</div>
		</>
	)
}

export default AddQuestionPage;