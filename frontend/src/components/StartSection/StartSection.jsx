import Form from "../Form/Form";
import { Link } from "react-router-dom";

export default function StartSection({ name, children, isValid, onSubmit }) {
    return (
        <section className="login">
            <h2 className="login__title">{name === 'sign-up' ? 'Регистрация' : 'Вход'}</h2>
            <Form
                name={name}
                titleButton={name === 'sign-up' ? 'Зарегистрироваться' : 'Войти'}
                children={children}
                isValid={isValid}
                onSubmit={onSubmit}
            />
            {name === 'sign-up' && <p className="login__subtitle"> <Link to={'/sign-in'} className="login__subtitle_type_link">Уже зарегистрированы? Войти</Link></p>}
        </section>
    )
}