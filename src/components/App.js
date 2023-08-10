import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { clientApi } from "./constants";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function App() {
  // ------------------Set Cards Array-------------------------
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    clientApi
      .getCardArray()
      .then((res) => res.json())
      .then((data) => setCards(data));
  }, []);

  //------------------Set User Data-------------------------
  const [currentUser, setCurrentUser] = React.useState({});
  React.useEffect(() => {
    clientApi
      .getUser()
      .then((res) => res.json())
      .then((data) => {
        setCurrentUser(data);
      });
  }, []);

  // ------------------Update Avatar Function-------------------------
  const handleAvatarSubmit = (avatar, button) => {
    clientApi
      .updateProfilePicture(avatar, button)
      .then((res) => res.json())
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
        // setFormData({ ...formData, [avatar]: "" });
      });
  };

  // ------------------Update Profile Function-------------------------
  const handleUpdateUser = (user, button) => {
    clientApi
      .updateProfile(user, button)
      .then((res) => res.json())
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      });
  };

  // ------------------Create Card Function-------------------------
  function handleNewCardSubmit(card) {
    clientApi
      .addCard(card)
      .then((res) => res.json())
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((err) => console.log(err));
  }

  //-------------------Delete Card Function-------------------------
  function handleCardDelete(cardId) {
    clientApi.removeCard(cardId).then(() => {
      setCards(cards.filter((c) => c._id !== cardId));
    });
  }

  //--------------------HANDLE CARD LIKE FUNCTION---------------
  function handleCardLike(card) {
    //Check if card has been liked
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    //send api request and get updated card
    clientApi.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
      setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
    });
  }

  // //-----------------Like Card Function-------------------------
  // function handleCardLike(cardId, likeCounter) {
  //   clientApi
  //     .sendLike(cardId)
  //     .then((res) => res.json())
  //     .then((result) => (likeCounter.textContent = result.likes.length));
  // }

  // //-----------------Dislike Card Function-------------------------
  // function handleCardDislike(cardId, likeCounter) {
  //   clientApi
  //     .sendDislike(cardId)
  //     .then((res) => res.json())
  //     .then((result) => (likeCounter.textContent = result.likes.length));
  // }

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

  // --------------------FORM SUBMISSION - CARD -------------------------
  function NewCardsubmitHandler(evt) {
    evt.preventDefault();
    handleNewCardSubmit(formData);
    resetFormFields();
    closeAllPopups();
  }

  // --------------------FORM SUBMISSION - PROFILE -------------------------
  // function editProfileSubmitHandler(evt) {
  //   console.log(formData);
  //   evt.preventDefault();
  //   handleUpdateUser(formData, evt.target);
  //   resetFormFields();
  //   closeAllPopups();
  // }

  // --------------------FORM SUBMISSION - AVATAR -------------------------
  // function editAvatarSubmitHandler(evt) {
  //   evt.preventDefault();
  //   handleAvatarSubmit(formData);
  //   resetFormFields();
  //   closeAllPopups();
  // }

  // --------------------GET FORM DATA------------------------
  const [formData, setFormData] = React.useState({
    name: "",
    about: "",
    avatar: "",
    cardName: "",
    cardLink: "",
  });

  function resetFormFields() {
    setFormData({
      name: "",
      about: "",
      avatar: "",
      cardName: "",
      cardLink: "",
    });
  }

  // --------------------PROFILE FORM VALIDATION------------------------
  function handleProfileValidation({ name, about }, button) {
    if (name.length > 3 && about.length > 3) {
      button.classList.remove("popup__submit-button_inactive");
      button.disabled = false;
    } else {
      button.classList.add("popup__submit-button_inactive");
    }
  }

  function handleAvatarValidation({ avatar }, button) {
    if (avatar.length > 3) {
      button.classList.remove("popup__submit-button_inactive");
      button.disabled = false;
    } else {
      button.classList.add("popup__submit-button_inactive");
    }
  }

  function handleAddCardValidation({ cardName, cardLink }, button) {
    if (cardName.length > 3 && cardLink.length > 3) {
      button.classList.remove("popup__submit-button_inactive");
      button.disabled = false;
    } else {
      button.classList.add("popup__submit-button_inactive");
    }
  }

  // --------------------SHOW FORM DATA------------------------
  function handleInputChange(evt) {
    const button = evt.target.parentElement.querySelector("button");
    const { name, value } = evt.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (evt.target.parentElement.name === "profile_avatar") {
      handleAvatarValidation(formData, button);
    } else if (evt.target.parentElement.name === "newcard") {
      handleAddCardValidation(formData, button);
    } else {
      handleProfileValidation(formData, button);
    }
  }

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
          // handleCardLike={handleCardLike}
          // handleCardDislike={handleCardDislike}
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

        <PopupWithForm
          title="Novo local"
          name="newcard"
          buttonLabel="Criar"
          onSubmit={NewCardsubmitHandler}
          isPopupActive={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        >
          <input
            id="profile-name-input"
            name="cardName"
            type="text"
            className="popup__input popup__input_profile-name"
            placeholder="Título"
            required
            onChange={handleInputChange}
            value={formData.cardName}
          />
          <input
            id="profile-link-input"
            name="cardLink"
            type="url"
            className="popup__input popup__input_profile-link"
            placeholder="Link da imagem"
            required
            onChange={handleInputChange}
            value={formData.cardLink}
          />

          <span
            className="popup__input-error card-link-input-error"
            id="profile-link-input--error"
          />
        </PopupWithForm>

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
