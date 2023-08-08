import React, {useContext} from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { clientApi } from "./constants";
import ImagePopup from "./ImagePopup";
import PopupWithForm from "./PopupWithForm";

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
  const handleAvatarSubmit = (user, button) => {
    clientApi
      .updateProfilePicture(user, button)
      .then((res) => res.json())
      .then((data) => setCurrentUser(data));
  };

  // ------------------Update Profile Function-------------------------
  const handleProfileSubmit = (user, button) => {
    clientApi
      .updateProfile(user, button)
      .then((res) => res.json())
      .then((data) => setCurrentUser(data));
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

  //-----------------Like Card Function-------------------------
  function handleCardLike(cardId, likeCounter) {
    clientApi
      .sendLike(cardId)
      .then((res) => res.json())
      .then((result) => (likeCounter.textContent = result.likes.length));
  }

  //-----------------Dislike Card Function-------------------------
  function handleCardDislike(cardId, likeCounter) {
    clientApi
      .sendDislike(cardId)
      .then((res) => res.json())
      .then((result) => (likeCounter.textContent = result.likes.length));
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

  // --------------------FORM SUBMISSION - CARD -------------------------
  function NewCardsubmitHandler(evt) {
    evt.preventDefault();
    handleNewCardSubmit(formData);
    resetFormFields();
    closeAllPopups();
  }

  // --------------------FORM SUBMISSION - PROFILE -------------------------
  function editProfileSubmitHandler(evt) {
    console.log(formData);
    evt.preventDefault();
    handleProfileSubmit(formData, evt.target);
    resetFormFields();
    closeAllPopups();
  }

  // --------------------FORM SUBMISSION - AVATAR -------------------------
  function editAvatarSubmitHandler(evt) {
    evt.preventDefault();
    handleAvatarSubmit(formData);
    resetFormFields();
    closeAllPopups();
  }

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
          handleCardDelete={handleCardDelete}
          handleCardLike={handleCardLike}
          handleCardDislike={handleCardDislike}
        />
        {/* <!-- ------------------------PROFILE AVATAR FORM------------------------------ --> */}
        <PopupWithForm
          title="Alterar a foto do perfil"
          name="profile_avatar"
          buttonLabel="Salvar"
          onSubmit={editAvatarSubmitHandler}
          isPopupActive={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        >
          <input
            id="profile-link-input"
            name="avatar"
            type="url"
            className="popup__input popup__input_profile-link"
            placeholder="Link da imagem"
            required
            onChange={handleInputChange}
            value={formData.avatar}
          ></input>
        </PopupWithForm>

        {/* ----------------------------PROFILE FORM-------------------------------- */}
        <PopupWithForm
          title="Editar perfil"
          name="profile_info"
          buttonLabel="Alterar"
          onSubmit={editProfileSubmitHandler}
          isPopupActive={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        >
          <input
            id="profile-name-input"
            name="name"
            type="text"
            className="popup__input popup__input_profile-name"
            placeholder={currentUser.name}
            required
            onChange={handleInputChange}
            value={formData.name}
          />
          <input
            id="profile-profession-input"
            name="about"
            type="text"
            className="popup__input popup__input_profile-profession"
            placeholder={currentUser.about}
            required
            onChange={handleInputChange}
            value={formData.about}
          />
          <span
            className="popup__input-error card-link-input-error"
            id="profile-link-input--error"
          />
        </PopupWithForm>

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
