import { useContext } from "react"
import CurrentUserContext from "../../contexts/CurrentUserContext"
import ButtonLike from "../ButtonLike/ButtonLike"

export default function Card({ card, onCardClick, onDelete }) {
    const currentUser = useContext(CurrentUserContext)
    return (
        <div className="element">
            {currentUser._id === card.owner && <button className="element__button-delete" type="button" onClick={() => onDelete(card._id)} />}
            <img
                src={card.link}
                alt={`изображение ${card.name}`}
                className="element__foto"
                onClick={() => onCardClick({ link: card.link, name: card.name })}
            />
            <div className="element__footer">
                <h2 className="element__subtitle" >{card.name}</h2>
                <ButtonLike likes={card.likes} cardid={card._id} />
            </div>
        </div>
    )
}




