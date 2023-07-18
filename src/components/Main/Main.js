import React from "react";

import PencilButton from "../../images/Pencil.svg";
import AddButton from "../../images/Plus-sign.svg";
import PopupWithForm from "../PopupWithForm";
import Card from "../Card/Card";
import { clientApi, thisUser } from "../constants";

const userData = await clientApi.getUser();
const initialArray = await clientApi.getCardArray();

function Main(props) {
  // --------------------MAP CARDS-------------------------
  const [cards, setCards] = React.useState(initialArray);

  const cardsData = initialArray.map((card) => (
    <Card
      key={card._id}
      {...card}
      card={card}
      onCardClick={props.handleCardClick}
    />
  ));

  //---------------------Variables----------------------
  const [userName, setUserName] = React.useState(userData.name);
  const [userDescription, setUserDescription] = React.useState(userData.about);
  const [userAvatar, setUserAvatar] = React.useState(userData.avatar);

  // --------------------FORM SUBMISSION - PROFILE-------------------------
  function submitProfileHandler(evt) {
    evt.preventDefault();
    clientApi.updateProfile(formData);
    props.onClose();
  }

  // --------------------FORM SUBMISSION - CARD-------------------------
  function submitCardHandler(evt) {
    evt.preventDefault();
    console.log(formData);
    clientApi.addCard(formData.card, formData.cardLink);
    setCards((prevArray) => [...prevArray, formData]);
    props.onClose();
  }

  // --------------------GET FORM DATA------------------------
  const [formData, setFormData] = React.useState({
    name: "",
    about: "",
    avatar: "",
    card: "",
    cardLink: "",
  });

  // --------------------SHOW FORM DATA------------------------
  function handleInputChange(evt) {
    const { name, value } = evt.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  return (
    <main>
      <div className="profile">
        {/* <!-- ------------------------PROFILE AVATAR FORM------------------------------ --> */}
        {
          <PopupWithForm
            title="Alterar a foto do perfil"
            name="profile_avatar"
            buttonLabel="Salvar"
            isPopupActive={props.isEditAvatarPopupOpen}
            onClose={props.onClose}
            onSubmit={submitProfileHandler}
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
            />

            <span
              className="popup__input-error card-link-input-error"
              id="profile-link-input--error"
            />
          </PopupWithForm>
        }

        {/* <!-- ------------------------PROFILE INFO FORM------------------------------ --> */}
        {
          <PopupWithForm
            title="Editar perfil"
            name="profile_info"
            buttonLabel="Alterar"
            isPopupActive={props.isEditProfilePopupOpen}
            onClose={props.onClose}
            onSubmit={submitProfileHandler}
          >
            <input
              id="profile-name-input"
              name="name"
              type="text"
              className="popup__input popup__input_profile-name"
              placeholder={userData.name}
              required
              onChange={handleInputChange}
              value={formData.name}
            />
            <input
              id="profile-profession-input"
              name="about"
              type="text"
              className="popup__input popup__input_profile-profession"
              placeholder={userData.about}
              required
              onChange={handleInputChange}
              value={formData.about}
            />
            <span
              className="popup__input-error card-link-input-error"
              id="profile-link-input--error"
            />
          </PopupWithForm>
        }

        {/* <!-- ------------------------NEW CARD FORM------------------------------ --> */}
        {
          <PopupWithForm
            title="Novo local"
            name="newCard"
            buttonLabel="Criar"
            isPopupActive={props.isAddPlacePopupOpen}
            onClose={props.onClose}
            onSubmit={submitCardHandler}
          >
            <input
              id="profile-name-input"
              name="card"
              type="text"
              className="popup__input popup__input_profile-name"
              placeholder="Título"
              required
              onChange={handleInputChange}
              value={formData.card}
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
        }

        {/* <!-- ------------------------PROFILE INFO------------------------------ --> */}
        <div className="profile__info">
          <div
            className="profile__picture-wrapper"
            onClick={props.onEditAvatarClick}
          >
            <div className="profile__picture-overlay">
              <img
                src={PencilButton}
                alt="pencil to edit avatar"
                className="profile__picture-icon"
              />
            </div>

            <img src={userAvatar} alt="Avatar" className="profile__picture" />
          </div>
          <div className="profile__text-wrapper">
            <div className="profile__name-wrapper">
              <h1 className="profile__name">{userName}</h1>
              <button
                onClick={props.onEditProfileClick}
                className="profile__edit"
              >
                <img src={PencilButton} alt="ilustração de um lápis" />
              </button>
            </div>
            <h2 className="profile__title">{userDescription}</h2>
          </div>
        </div>

        {/* <!-- ------------------------ADD NEW CARD BUTTON------------------------------ --> */}
        <button className="adicionar-button" onClick={props.onAddPlaceClick}>
          <img
            src={AddButton}
            alt="sinal de mais para adicionar imagem"
            className="adicionar-button__image"
          />
        </button>
      </div>

      {/* <!-- ------------------------CARD GRID------------------------------ --> */}
      <ul className="cards">{cardsData}</ul>
    </main>
  );
}

export default Main;
