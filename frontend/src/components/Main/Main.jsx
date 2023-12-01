import { useContext } from "react"
import Card from "../Card/Card.jsx"
import CurrentUserContext from "../../contexts/CurrentUserContext"
import Spinner from "../Spinner/Spinner.jsx"

export default function Main({ name, onEditProfile, onEditAvatar, onAddPlace, onCardClick, onDelete, cards, isLoadingCard, handleRegister, handleLogin }) {
    const currentUser = useContext(CurrentUserContext)

    return (
        <main className="content">
            
                    <section className="profile">
                        <button type="button" className="profile__avatar-overlay" onClick={onEditAvatar} >
                            <img src={currentUser.avatar ? currentUser.avatar : '#'} alt="Аватар" className="profile__avatar" />
                        </button>
                        <div className="profile__info">
                            <h1 className="profile__title" > {currentUser.name ? currentUser.name : '#'}</h1>
                            <button className="profile__edit-button" type="button" onClick={onEditProfile} />
                            <p className="profile__subtitle" >{currentUser.about ? currentUser.about : '#'}</p>
                        </div>
                        <button className="profile__add-button" type="button" onClick={onAddPlace} />
                    </section>
                    <section className="elements-container">
                        {isLoadingCard ? <div className="elements-spinner"><Spinner /></div> : cards.map(data => {
                            return (
                                <Card card={data} onCardClick={onCardClick} key={data._id} onDelete={onDelete} />
                            )
                        })}

                    </section>
                
        </main>

    )
}