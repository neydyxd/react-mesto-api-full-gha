import { useState } from "react";
import { useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import EditProfilePopup from "./EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup";
import { useNavigate, Route, Routes, useHistory } from "react-router-dom";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import authApi from "../utils/AuthApi";

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoadingUpdateUser, setIsLoadingUpdateUser] = useState(false);
  const [isInfoTolltipSuccess, setIsInfoTolltipSuccess] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [headerEmail, setHeaderEmail] = useState("");
  const [signedIn, setSignedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
  });
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
    Promise.all([api.getCurrentUser(), api.getCards()])
      .then(([user, cards]) => {
        setCurrentUser(user);
        setCards(cards);
      })
      .catch((err) => console.log(err));
    }
  }, [isLoggedIn]);
  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      authApi
        .checkToken(jwt)
        .then((data) => {
          if (data) {
            setIsLoggedIn(true);
            setHeaderEmail(data.data.email);
            navigate("/", { replace: true });
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  function handleUpdateUser(data) {
    console.log("dssd");
    setIsLoadingUpdateUser(true);
    api
      .createNewProfile(data.name, data.about)
      .then((newUser) => {
        setCurrentUser(newUser);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  }

  useEffect(() => {
    api
      .getCurrentUser()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    api
      .getCards()
      .then((res) => {
        setCards(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  
  function handleAuthUser(email, password) {
    authApi
      .loginUser(email, password)
      .then((data) => {
        if (data.token) {
          setHeaderEmail(email);
          setIsLoggedIn(true);
          localStorage.setItem("jwt", data.token);
          navigate("/", { replace: true });
        }
      })
      .catch((err) => {
        setIsInfoTolltipSuccess(false);
        setIsSuccessPopupOpen(true);
        console.log(err);
      });
  }
  
  

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setHeaderEmail("");
    localStorage.removeItem("jwt");
  };

  function showTooltipResponse(signedIn) {
    setIsInfoTolltipSuccess(true);
    setSignedIn(signedIn);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    if (!isLiked) {
      api
        .likeCard(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }


  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((item) => item._id !== card._id));
      })
      .then(() => closeAllPopups())
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }

  

  function handleUpdateAvatar(data) {
    api
      .createNewAvatar(data.avatar)
      .then((newAvatar) => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }

  function handleAddCard(card) {
    api
      .createNewCard({ item: card })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка ${err}`);
      });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function closeAllPopups() {
    if (isEditProfilePopupOpen) setIsEditProfilePopupOpen(false);
    if (isAddPlacePopupOpen) setIsAddPlacePopupOpen(false);
    if (isEditAvatarPopupOpen) setIsEditAvatarPopupOpen(false);
    if (isImagePopupOpen) setIsImagePopupOpen(false);
    if (isInfoTolltipSuccess) setIsInfoTolltipSuccess(false);
  }

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isImagePopupOpen;

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      // навешиваем только при открытии
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  function handleRegisterUser(email, password) {
    authApi
      .registerUser(email, password)
      .then((data) => {
        if (data) {
          showTooltipResponse(true);
          navigate("/sign-in", { replace: true });
        }
      })
      .catch((err) => {
        setIsInfoTolltipSuccess(false);
        showTooltipResponse(false);
        console.log(err);
      })
      .finally(() => setIsSuccessPopupOpen(true));
  }

  

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="container">
          <Header email={headerEmail} onSignOut={handleSignOut} />
          <Routes>
            <Route
              path="/sign-up"
              element={<Register onRegister={handleRegisterUser} />}
            />
            <Route
              path="/sign-in"
              element={<Login onLogin={handleAuthUser} />}
            />
            <Route
              path="/"
              element={
                <ProtectedRoute
                  element={Main}
                  onCardDelete={handleCardDelete}
                  onCardLike={handleCardLike}
                  setCards={setCards}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  cards={cards}
                  onCardClick={handleCardClick}
                  isLoggedIn={isLoggedIn}
                />
              }
            />
          </Routes>
          <Footer />
          <EditAvatarPopup
            onUpdateAvatar={handleUpdateAvatar}
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
          />
          <EditProfilePopup
            onUpdateUser={handleUpdateUser}
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddCard}
          />
          <ImagePopup
            onClose={closeAllPopups}
            card={selectedCard}
            isOpen={isImagePopupOpen}
          />
          <InfoTooltip
            name={"success"}
            onClose={closeAllPopups}
            isOpen={isInfoTolltipSuccess}
            signedIn={signedIn}
          />
        </div>
      </CurrentUserContext.Provider>
    </div>
  );
}
export default App;
