import { useEffect, useState } from "react"
import api from "../../utils/api"

export default function ButtonLike({ likes, cardid }) {
    const [isLike, setIsLike] = useState(false)
    const [count, setCount] = useState(likes.length)

    useEffect(() => {
        setIsLike(likes.some(element => element.owner_id === element))
    }, [likes])

    function handeLike() {
        if (isLike) {
            api.deleteLike(cardid,localStorage.jwt)
                .then(res => {
                    setIsLike(false)
                    setCount(res.likes.length)
                })
                .catch((err) => console.error(`Ошибка при снятии лайка ${err}`))
        } else {
            api.addLike(cardid,localStorage.jwt)
                .then(res => {
                    setIsLike(true)
                    setCount(res.likes.length)
                })
                .catch((err) => console.error(`Ошибка при установке лайка ${err}`))
        }
    }

    return (
        
            <div className="element__button">
                <button className={`element__button-like ${isLike ? 'element__button-like_active' : ''}`} type="button" onClick={handeLike} />
                <span className="element__like-number">{count}</span>
            </div>
        
    )
}