import React from "react";

import "./Main.css";
import PencilButton from "../../images/Pencil.svg";
import AddButton from "../../images/Plus-sign.svg";
import PopupWithForm from "../PopupWithForm";
import Card from "../Card/Card";
import { clientApi } from "../constants";

const userData = await clientApi.getUser();
const initialArray = await clientApi.getCardArray();

function Main(props) {
  const initialArrayData = initialArray.map((card) => (
    <Card key={card._id} {...card} />
  ));

  // --------------------PREVENT DEFAULT-------------------------
  function submitHandler(evt) {
    evt.preventDefault();
  }

  // --------------------GET FORM DATA------------------------
  const [formData, setFormData] = React.useState({
    name: "",
    about: "",
    avatar: "",
    newCard: "",
  });

  function handleInputChange(evt) {
    console.log(evt.target.value);
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
            onSubmit={submitHandler}
            isPopupActive={props.isEditAvatarPopupOpen}
            onClose={props.onClose}
          >
            <input
              id="profile-link-input"
              name="avatar"
              type="url"
              className="popup__input popup__input_profile-link"
              placeholder="Link da imagem"
              required
              onChange={handleInputChange}
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
            onSubmit={submitHandler}
            isPopupActive={props.isEditProfilePopupOpen}
            onClose={props.onClose}
          >
            <input
              id="profile-name-input"
              name="name"
              type="text"
              className="popup__input popup__input_profile-name"
              placeholder={userData.name}
              required
              onChange={handleInputChange}
            />
            <input
              id="profile-profession-input"
              name="about"
              type="text"
              className="popup__input popup__input_profile-profession"
              placeholder={userData.about}
              required
              onChange={handleInputChange}
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
            name="anewcard"
            buttonLabel="Criar"
            onSubmit={submitHandler}
            isPopupActive={props.isAddPlacePopupOpen}
            onClose={props.onClose}
          >
            <input
              id="profile-name-input"
              name="name"
              type="text"
              className="popup__input popup__input_profile-name"
              placeholder="Título"
              required
              onChange={handleInputChange}
            />
            <input
              id="profile-link-input"
              name="link"
              type="url"
              className="popup__input popup__input_profile-link"
              placeholder="Link da imagem"
              required
              onChange={handleInputChange}
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

            <img
              src={userData.avatar}
              alt="Avatar"
              className="profile__picture"
            />
          </div>
          <div className="profile__text-wrapper">
            <div className="profile__name-wrapper">
              <h1 className="profile__name">{userData.name}</h1>
              <button
                onClick={props.onEditProfileClick}
                className="profile__edit"
              >
                <img src={PencilButton} alt="ilustração de um lápis" />
              </button>
            </div>
            <h2 className="profile__title">{userData.about}</h2>
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
      <ul className="cards">{initialArrayData}</ul>
    </main>
  );
}

export default Main;
