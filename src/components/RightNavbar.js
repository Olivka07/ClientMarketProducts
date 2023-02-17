import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import { useHttp } from "../hooks/http.hook"
import { useMessage } from "../hooks/message.hook"

export const RightNavbar = () => {
    const [clickLogin, setClickLogin] = useState(true)
    const [clickRegister, setClickRegister] = useState(false)
    const {isAuthenticatedAdmin, isAuthenticatedClient, logout, login} = useContext(AuthContext)
    const [form, setForm] = useState({login:'', password:''})
    const [formReg, setFormReg] = useState({surname:'', name:'', patron:'', birthdate:'', address:'',login:'', password:''})
    const {request} = useHttp()
    const message = useMessage()

    const changeFormHandler = (event) => {
        setForm({...form, [event.target.name]:event.target.value})
    }

    const changeFormRegHandler = (event) => {
        setFormReg({...formReg, [event.target.name]:event.target.value})
    }

    const registerHandler = async () => {
        try {
          const data = await request('/api/auth/register', 'POST', {...formReg})
          message(data.message)
        } catch (e) {
            message(e.message)
        }
    }

    const loginHandler = async () => {
        try {
          const data = await request('/api/auth/login', 'POST', {...form})
          login(data.token, data.userId)
          window.location.reload()
        } catch (e) {
            message(e.message)
        }
    }

    const clickLoginHandler = () => {
        setClickLogin(true)
        setClickRegister(false)
    }

    const clickRegisterHandler = () => {
        setClickLogin(false)
        setClickRegister(true)
    }

    return (
        <div className="rightBlock">
            {!isAuthenticatedAdmin && !isAuthenticatedClient && 
                <div className="autorization">
                    {clickLogin && 
                        <>
                            <p>Авторизация</p>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <label htmlFor="login">Логин:</label>
                                        </td>
                                        <td>
                                            <input 
                                                name="login" 
                                                id="login" 
                                                type="text"
                                                value={form.login}
                                                onChange={e => changeFormHandler(e)}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label htmlFor="password">Пароль:</label>
                                        </td>
                                        <td>
                                            <input 
                                                name="password" 
                                                id="password" 
                                                type="password"
                                                value={form.password}
                                                onChange={e => changeFormHandler(e)}
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="div_auth">
                                <button onClick={loginHandler}>
                                    Войти
                                </button>
                                <button onClick={clickRegisterHandler}>
                                    Регистрация
                                </button>
                                
                                {/* <button onClick={loginHandler}>
                                    Вход
                                </button>
                                <button onClick={registerHandler}>
                                    Регистрация
                                </button> */}
                            </div>
                        </>
                    }

                    {clickRegister && 
                        <>
                            <p>Регистрация</p>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <label htmlFor="surname">Фамилия:</label>
                                        </td>
                                        <td>
                                            <input 
                                                name="surname" 
                                                id="surname" 
                                                type="text"
                                                value={formReg.surname}
                                                onChange={e => changeFormRegHandler(e)}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label htmlFor="name">Имя:</label>
                                        </td>
                                        <td>
                                            <input 
                                                name="name" 
                                                id="name" 
                                                type="text"
                                                value={formReg.name}
                                                onChange={e => changeFormRegHandler(e)}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label htmlFor="patron">Отчество:</label>
                                        </td>
                                        <td>
                                            <input 
                                                name="patron" 
                                                id="patron" 
                                                type="text"
                                                value={formReg.patron}
                                                onChange={e => changeFormRegHandler(e)}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label htmlFor="birthdate">Дата рождения:</label>
                                        </td>
                                        <td>
                                            <input 
                                                name="birthdate" 
                                                id="birthdate" 
                                                type="date"
                                                value={formReg.birthdate}
                                                onChange={e => changeFormRegHandler(e)}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label htmlFor="address">Адрес:</label>
                                        </td>
                                        <td>
                                            <input 
                                                name="address" 
                                                id="address" 
                                                type="text"
                                                value={formReg.address}
                                                onChange={e => changeFormRegHandler(e)}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label htmlFor="login">Логин:</label>
                                        </td>
                                        <td>
                                            <input 
                                                name="login" 
                                                id="login" 
                                                type="text"
                                                value={formReg.login}
                                                onChange={e => changeFormRegHandler(e)}
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label htmlFor="password">Пароль:</label>
                                        </td>
                                        <td>
                                            <input 
                                                name="password" 
                                                id="password" 
                                                type="password"
                                                value={formReg.password}
                                                onChange={e => changeFormRegHandler(e)}
                                            />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="div_auth">
                                <button onClick={clickLoginHandler}>
                                    Вход
                                </button>
                                <button onClick={registerHandler}>
                                    Зарегистрироваться
                                </button>
                            </div>
                        </>
                    }
                    
                </div>
            }

            { (isAuthenticatedAdmin && 
                    <button 
                        className="btn-quit"
                        onClick={logout}
                    >
                        Выйти
                    </button>
                ) || (isAuthenticatedClient && 
                    <button 
                        className="btn-quit"
                        onClick={logout}
                    >
                        Выйти
                    </button>
                )
            }
            
            <div className="callback">
                <p>Оставьте ваш отзыв</p>
                <form>
                    <textarea placeholder="Написать отзыв"></textarea>
                    <button>
                        Отправить
                    </button>
                </form>
            </div>
        </div>
    )
}