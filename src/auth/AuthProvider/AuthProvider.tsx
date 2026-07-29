import { createContext, useState } from 'react'
import type {
	FC,
	ReactNode,
} from 'react'
import { AUTH_STORAGE } from '../../constants'
import type { IAuthContext } from '../../types/global.types'


export const AuthContext = createContext<IAuthContext>({
	isAuth: false,
	setIsAuth: () => {},
})

export interface AuthProviderProps {
	children: ReactNode
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
	const isLogin = JSON.parse(localStorage.getItem(AUTH_STORAGE) || 'false') // парсим, потому что без этого значение сохраняется как строка, а не булевое
	const [isAuth, setIsAuth] = useState<boolean>(isLogin)

	// с помощью value состояние передаётся всем children
	return (
		<AuthContext.Provider value={{ isAuth, setIsAuth }}>
			{children}
		</AuthContext.Provider>
	)
}
