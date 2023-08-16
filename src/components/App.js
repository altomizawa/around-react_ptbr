import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";

import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

import { CurrentUserContext } from "../contexts/CurrentUserContext";
const newApi = new Api();
export default function App() {
  // ------------------Set Cards Array-------------------------
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    newApi
      .getCardArray()
      .then((res) => res.json())
      .then((data) => setCards(data));
  }, []);

  //------------------Set User Data-------------------------
  const [currentUser, setCurrentUser] = React.useState({});
  React.useEffect(() => {
    newApi
      .getUser()
      .then((res) => res.json())
      .then((data) => {
        setCurrentUser(data);
      });
  }, []);

  // ------------------Update Avatar Function-------------------------
  const handleAvatarSubmit = (avatar, button) => {
    newApi
      .updateProfilePicture(avatar, button)
      .then((res) => res.json())
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      });
  };

  // ------------------Update Profile Function-------------------------
  const handleUpdateUser = (user, button) => {
    newApi
      .updateProfile(user, button)
      .then((res) => res.json())
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      });
  };

  // ------------------Create Card Function-------------------------
  function handleNewCardSubmit(card) {
    newApi
      .addCard(card)
      .then((res) => res.json())
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  //-------------------Delete Card Function-------------------------
  function handleCardDelete(cardId) {
    newApi.removeCard(cardId).then(() => {
      setCards(cards.filter((c) => c._id !== cardId));
    });
  }

  //--------------------HANDLE CARD LIKE FUNCTION---------------
  function handleCardLike(card) {
    //Check if card has been liked
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    //send api request and get updated card
    newApi.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

  // ------------------Variables-------------------------
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState(null);

  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);

  // ------------------Event Handlers-------------------------

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen((prevState) => !prevState);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen((prevState) => !prevState);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen((prevState) => !prevState);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen((prevState) => !prevState);
  };

  // ------------------Functions-------------------------

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
  };

  // ------------------JSX-------------------------
  return (
    <>
      <Header />
      <CurrentUserContext.Provider value={currentUser}>
        <Main
          selectedCard={selectedCard}
          handleCardClick={handleCardClick}
          onEditProfileClick={handleEditProfileClick}
          onEditAvatarClick={handleEditAvatarClick}
          onAddPlaceClick={handleAddPlaceClick}
          cards={cards}
          setCards={setCards}
          onCardDelete={handleCardDelete}
          onCardLike={handleCardLike}
        />

        {/* <!-- ------------------------PROFILE AVATAR FORM------------------------------ --> */}
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleAvatarSubmit}
        />

        {/* ----------------------------PROFILE FORM-------------------------------- */}
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        {/* <!-- ------------------------NEW CARD FORM------------------------------ --> */}

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleNewCardSubmit}
        />

        {/* ----------------------------IMAGE POPUP-------------------------------- */}

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          isImagePopupOpen={isImagePopupOpen}
        />
      </CurrentUserContext.Provider>

      <Footer />
    </>
  );
}
