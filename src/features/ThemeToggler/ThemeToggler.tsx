import { type ChangeEvent } from 'react'
import cls from './ThemeToggler.module.css'
import { useTheme } from '../../hooks/useTheme'
import { THEME_STORAGE } from '../../constants';
import { THEME_ENUM } from '../../types/global.types';

export const ThemeToggler = () => {
	const {theme, setTheme} = useTheme();

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>): void => {
		const isChecked = e.target.checked === true;
		const updatedTheme = isChecked ? THEME_ENUM.DARK : THEME_ENUM.LIGHT;

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
					checked={theme === THEME_ENUM.DARK}
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
