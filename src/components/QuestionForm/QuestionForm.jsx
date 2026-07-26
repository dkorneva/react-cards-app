import {} from "react";
import cls from "./QuestionForm.module.css"
import {Button} from "../Button"

export const QuestionForm = ({formAction, state, isPending, submitBtnText}) => {
  return (
		<form action={formAction} className={cls.form}>
      <input type="text" name="questionId" defaultValue={state.id} hidden /> {/* данный скрытый инпут необходим для того, чтобы достать по нему id вопроса, поскольку в качестве пропса в EditQuestion передаётся id */}

			<div className={cls.formControl}>
				<label htmlFor='questionField'>Question: </label>
				<textarea
					// есть атрибут value, а есть атрибут defaultValue, когда мы используем неуправляемый контрол (у которого нет состояния, которое управляется с помоью React), то используем defaultValue, чтобы дать изначальное значение для контрола, value используем для состояния, при подвязывании элемента и функции изменения состояния через eventOnChange
					defaultValue={state.question}
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
					defaultValue={state.answer}
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
					defaultValue={state.description}
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
					defaultValue={state.resources}
					name='resources'
					id='resourcesField'
					cols='30'
					rows='2'
					placeholder='please enter resources separated by commas'
				></textarea>
			</div>
			<div className={cls.formControl}>
				<label htmlFor='levelField'>Level: </label>
				<select name='level' id='levelField' defaultValue={state.level}>
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
					defaultChecked={state.clearForm}
				/>
				<span>Clear form after submitting?</span>
			</label>

			<Button isDisabled={isPending}>{submitBtnText}</Button>
		</form>
	)
}