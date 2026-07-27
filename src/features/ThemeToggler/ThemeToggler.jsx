import {} from 'react'
import cls from './ThemeToggler.module.css'
import { useTheme } from '../../hooks/useTheme'
import { THEME_STORAGE } from '../../constants';

export const ThemeToggler = () => {
	const {theme, setTheme} = useTheme();

	const onChangeHandler = (e) => {
		const updatedTheme = e.target.checked === false ? "light" : "dark";
		setTheme(updatedTheme);
		
		localStorage.setItem(THEME_STORAGE, updatedTheme);
	}

	return (
		<label for='theme' className={cls.theme}>
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
				<span className={cls.themeIcon}>
					<span className={cls.themeIconPart}></span>
					<span className={cls.themeIconPart}></span>
					<span className={cls.themeIconPart}></span>
					<span className={cls.themeIconPart}></span>
					<span className={cls.themeIconPart}></span>
					<span className={cls.themeIconPart}></span>
					<span className={cls.themeIconPart}></span>
					<span className={cls.themeIconPart}></span>
					<span className={cls.themeIconPart}></span>
				</span>
			</span>
		</label>
	)
}
