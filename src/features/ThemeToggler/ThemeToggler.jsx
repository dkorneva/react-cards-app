import {} from 'react'
import cls from './ThemeToggler.module.css'
import { useTheme } from '../../hooks/useTheme'
import { THEME_STORAGE } from '../../constants';

export const ThemeToggler = () => {
	const {theme, setTheme} = useTheme();

	const onChangeHandler = (e) => {
		const isChecked = e.target.checked === true;
		const updatedTheme = isChecked ? "dark" : "light";

		setTheme(updatedTheme);
		isChecked ? document.body.classList.add("darkLayout") : document.body.classList.remove("darkLayout")

		localStorage.setItem(THEME_STORAGE, updatedTheme);
	}

	return (
		<label htmlFor='theme' className={cls.theme}>
			<span className={cls.themeToggleWrap}>
				<input
					id='theme'
					className={cls.themeToggle}
					type='checkbox'
					role='switch'
					name='theme'
					value='dark'
					onChange={onChangeHandler}
					checked={theme === "dark"}
				/>
				<span className={cls.themeFill}></span>
				<span className={cls.themeKnob}>
					<span className={cls.themeIcon}>
						<span className={cls.sunIcon}>
							<span className={cls.sunIconPart}></span>
							<span className={cls.sunIconPart}></span>
							<span className={cls.sunIconPart}></span>
							<span className={cls.sunIconPart}></span>
							<span className={cls.sunIconPart}></span>
							<span className={cls.sunIconPart}></span>
							<span className={cls.sunIconPart}></span>
							<span className={cls.sunIconPart}></span>
							<span className={cls.sunIconPart}></span>
						</span>
						<span className={cls.moonIcon}></span>
					</span>
				</span>
			</span>
		</label>
	)
}
