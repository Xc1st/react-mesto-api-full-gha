import Header from "./Header/Header.jsx"
import Main from "./Main/Main.jsx"
import Footer from "./Footer/Footer.jsx"
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx"
import PopupImage from "./PopupImage/PopupImage.jsx"
import { useCallback, useEffect, useState } from "react"
import CurrentUserContext from "../contexts/CurrentUserContext.js"
import api from "../utils/api.js"
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.jsx"
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup.jsx"
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.jsx"
import { Route, Routes, useNavigate } from "react-router-dom"
import SendContext from "../contexts/SendContext.js"
import Register from "./Register/Register.jsx"
import Login from "./Login/Login.jsx"
import InfoTooltip from "./InfoTooltip/InfoTooltip.jsx"
import { registration, authorization, getUser } from "../utils/auth.js"
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.jsx"

function App() {
  const navigate = useNavigate()

  // стейты для всех попапов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({})
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  //стейты для регистрации и логина
  const [isSuccessful, setIsSuccessful] = useState(false)
  const [loggedIn, setLoggedIn] = useState(true)
  // стейт контекста
  const [currentUser, setCurrentUser] = useState({})
  const [userEmail, setUserEmail] = useState('')
  // стейт карточки
  const [cards, setCards] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [deleteCardId, setDeleteCardId] = useState('')

  const setAllStatesForClosePopups = useCallback(() => {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsImagePopupOpen(false)
    setIsDeletePopupOpen(false)
    setIsPopupOpen(false)
  }, [])

  const closePopupByEsc = useCallback((evt) => {
    if (evt.key === 'Escape') {
      setAllStatesForClosePopups()
      document.removeEventListener('keydown', closePopupByEsc)
    }
  }, [setAllStatesForClosePopups])

  const closeAllPopups = useCallback(() => {
    setAllStatesForClosePopups()
    document.removeEventListener('keydown', closePopupByEsc)
  }, [setAllStatesForClosePopups, closePopupByEsc])

  function setEventListenerForDoc() {
    document.addEventListener('keydown', closePopupByEsc)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
    setEventListenerForDoc()
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
    setEventListenerForDoc()

  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
    setEventListenerForDoc()
  }

  function handleCardClick(card) {
    setSelectedCard(card)
    setIsImagePopupOpen(true)
    setEventListenerForDoc()

  }

  function handleDeletePopupClick(cardId) {
    setDeleteCardId(cardId)
    setIsDeletePopupOpen(true)
    setEventListenerForDoc()
  }

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getInfo(localStorage.jwt), api.getCards(localStorage.jwt)])
        .then(([userEmail, dataCards]) => {
          setCurrentUser(userEmail)
          setCards(dataCards)
          setIsLoading(false)
        })
        .catch((err) => console.error(`Ошибка при создании начальных элементов страницы ${err}`))
    }

  }, [loggedIn])

  useEffect(() => {
    if (localStorage.jwt) {
      getUser(localStorage.jwt)
        .then(res => {
          setUserEmail(res.data.email)
          setLoggedIn(true)
        })
        .catch((err) => console.error(`Ошибка авторизации при повторном входе ${err}`))
    } else {
      setLoggedIn(false)
    }
  }, [loggedIn])

  function handleDeleteCard(evt) {
    evt.preventDefault()
    setIsSent(true)
    api.deleteCard(deleteCardId, localStorage.jwt)
      .then(() => {
        setCards(cards.filter(element => {
          return element._id !== deleteCardId
        }))
        closeAllPopups()
        setIsSent(false)
      })
      .catch((err) => console.error(`Ошибка при удалении карточки ${err}`))
  }

  function handleUpdateUser(data, reset) {
    setIsSent(true)
    api.setUserInfo(data, localStorage.jwt)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
        reset()
        setIsSent(false)
      })
      .catch((err) => console.error(`Ошибка при редактировании профиля ${err}`))
  }

  function handleApdateAvatar(data, reset) {
    setIsSent(true)
    api.setAvatar(data, localStorage.jwt)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups() 
        reset()
        setIsSent(false)
      })
      .catch((err) => console.error(`Ошибка при редактировании аватара ${err}`))
  }

  function handleAddPlaceSubmit(data, reset) {
    setIsSent(true)
    api.addNewCard(data,localStorage.jwt)
      .then(res => {
        setCards([res, ...cards])
        closeAllPopups()
        reset()
        setIsSent(false)
      })
      .catch((err) => console.error(`Ошибка при добавлении карточки ${err}`))
      .finally(() => setIsSent(false))
  }

  function handleLogin(password, email) {
    setIsSent(true)
    authorization(password, email)
      .then((res) => {
        localStorage.setItem('jwt', res.token)
        setLoggedIn(true)
        navigate('/')
      })
      .catch((err) => {
        setIsPopupOpen(true)
        setIsSuccessful(false)
        console.error(`Ошибкак при авторизации ${err}`)
      })
      .finally(() => setIsSent(false))
  }

  function handleRegister(password, email) {
    setIsSent(true)
    registration(password, email)
      .then(() => {
        setIsPopupOpen(true)
        setIsSuccessful(true)
        navigate('/sign-in')
      })
      .catch((err) => {
        setIsPopupOpen(true)
        setIsSuccessful(false)
        console.error(`Ошибка при регистрации ${err}`)
      })
      .finally(() => setIsSent(false))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <SendContext.Provider value={isSent}>
          <Header
            userEmail={userEmail}
            setLoggedIn={setLoggedIn}
            loggedIn={loggedIn}
          />

          <Routes>
            <Route path="/" element={<ProtectedRoute
              element={Main}
              name={'main'}
              onEditProfile={handleEditProfileClick}
              onEditAvatar={handleEditAvatarClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onDelete={handleDeletePopupClick}
              cards={cards}
              isLoadingCard={isLoading}
              loggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
            />} />

            <Route path='/sign-up' element={
              <Register
                name={'sign-up'}
                handleRegister={handleRegister} />
            } />

            <Route path='/sign-in' element={
              <Login
                name={'sign-in'}
                handleLogin={handleLogin}
              />
            } />
          </Routes>
          {loggedIn ? <Footer /> : ''}
        </SendContext.Provider>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isSent={isSent}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isSent={isSent}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleApdateAvatar}
          isSent={isSent}
        />

        <PopupWithForm
          name='delete'
          title='Вы уверены?'
          titleButton='Да'
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleDeleteCard}
          isSent={isSent}
        >

        </PopupWithForm>

        <PopupImage
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}

        />

        <InfoTooltip
          name='result'
          isSuccessful={isSuccessful}
          isOpen={isPopupOpen}
          onClose={closeAllPopups}
        />

      </div>
    </CurrentUserContext.Provider>

  )
}

export default App
