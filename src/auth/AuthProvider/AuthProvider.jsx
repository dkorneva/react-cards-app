import { createContext, useState } from 'react'
import { AUTH_STORAGE } from '../../constants';

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const isLogin = JSON.parse(localStorage.getItem(AUTH_STORAGE)) || false // парсим, потому что без этого значение сохраняется как строка, а не булевое
  const [isAuth, setIsAuth] = useState(isLogin);

  // с помощью value состояние передаётся всем children
	return <AuthContext.Provider value={{isAuth, setIsAuth}}>{children}</AuthContext.Provider>
}
