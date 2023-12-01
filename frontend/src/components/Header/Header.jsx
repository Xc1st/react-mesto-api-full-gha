import { useState, useCallback } from 'react'
import logo from '../../images/Vector.svg'
import { Link, Route, Routes } from 'react-router-dom'

export default function Header({ userEmail, setLoggedIn, loggedIn }) {
    const [isBurgerMenu, setIsBurgerMenu] = useState(false)

    const toggleBurgerMenu = useCallback(() => {
        isBurgerMenu ? setIsBurgerMenu(false) : setIsBurgerMenu(true);
        document.querySelector('.header__burger-button').classList.toggle('header__burger-button_type_active')
    }, [isBurgerMenu])

    function onSignOut() {
        localStorage.removeItem('jwt')
        setLoggedIn(false)
    }

    return (
    <>
            {loggedIn ? 
            <>
                {isBurgerMenu ?
                    <div className='header__container header__container_type_mobile'>
                        <p className='header__container_type_email'>{userEmail}</p>
                        <Link to="/sign-in" className="header__exit" onClick={onSignOut}>
                            Выйти
                        </Link>
                    </div> : ''}
            </>
                : ''
            }
                < header className="header">
                    <img
                        src={logo}
                        alt="Лого"
                        className="header__logo" />
                    <Routes>
                        <Route path='/sign-in' element={
                            <Link to={'/sign-up'} className='header__link'>Регистрация</Link>}>
                        </Route>
                        <Route path='/sign-up' element={
                            <Link to={'/sign-in'} className='header__link'>Войти</Link>}>
                        </Route>

                        <Route path='/' element={
                            <>
                                <button className='header__burger-button' onClick={toggleBurgerMenu}></button>
                                <div className='header__container header__container_type_desktop'>
                                    <p className='header__container_type_email'>{userEmail}</p>
                                    <Link to='/sign-in' className='header__exit' onClick={onSignOut}>Выйти
                                    </Link>
                                </div>
                            </>}>
                        </Route>
                    </Routes>
                </header>
            </>
            )
}