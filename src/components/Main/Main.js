import React from "react";

import "./Main.css";
import PencilButton from "../../images/Pencil.svg";
import AddButton from "../../images/Plus-sign.svg";
import CloseButton from "../../images/Close_Icon.svg";
import PopupWithForm from "../PopupWithForm";
import Card from "../Card/Card";

import { clientApi } from "../constants";
import PopupWithImage from "../PopupWithImage";

const handleProfileClick = () => {
  document.querySelector(".popup_profile_info").classList.add("popup_active");
};
const handleAvatarClick = () => {
  document.querySelector(".popup_profile_avatar").classList.add("popup_active");
};
const handleNewCardClick = () => {
  document.querySelector(".popup_add-card").classList.add("popup_active");
};
const button = document.querySelector("button");
const userData = await clientApi.getUser();
const initialArray = await clientApi.getCardArray();

function Main() {
  const initialArrayData = initialArray.map((card) => (
    <Card
      name={card.name}
      link={card.link}
      key={card._id}
      owner={card.owner}
      likes={card.likes}
    />
  ));

  return (
    <main>
      <div className="profile">
        {/* <!-- ------------------------AVATAR POPUP------------------------------ --> */}
        {
          <PopupWithForm
            title="Alterar a foto do perfil"
            name="profile_avatar"
            buttonLabel="Salvar"
          >
            <input
              id="profile-link-input"
              name="avatar"
              type="url"
              className="popup__input popup__input_profile-link"
              placeholder="Link da imagem"
              required
            />

            <button className="popup__submit-button" type="submit">
              Alterar
            </button>

            <span
              className="popup__input-error card-link-input-error"
              id="profile-link-input--error"
            />
          </PopupWithForm>
        }

        {/* <!-- ------------------------PROFILE INFO POPUP------------------------------ --> */}
        {
          <PopupWithForm
            title="Editar perfil"
            name="profile_info"
            buttonLabel="Alterar"
          >
            <input
              id="profile-name-input"
              name="name"
              type="text"
              className="popup__input popup__input_profile-name"
              placeholder={userData.name}
              required
            />
            <input
              id="profile-profession-input"
              name="about"
              type="text"
              className="popup__input popup__input_profile-profession"
              placeholder={userData.about}
              required
            />
            <button className="popup__submit-button" type="submit">
              Alterar
            </button>
            <span
              className="popup__input-error card-link-input-error"
              id="profile-link-input--error"
            />
          </PopupWithForm>
        }

        {/* <!-- ------------------------PROFILE INFO------------------------------ --> */}
        <div className="profile__info">
          <div className="profile__picture-wrapper" onClick={handleAvatarClick}>
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
              <button onClick={handleProfileClick} className="profile__edit">
                <img src={PencilButton} alt="ilustração de um lápis" />
              </button>
            </div>
            <h2 className="profile__title">{userData.about}</h2>
          </div>
        </div>

        {/* <!-- ------------------------ADD NEW CARD BUTTON------------------------------ --> */}
        <button className="adicionar-button" onClick={handleNewCardClick}>
          <img
            src={AddButton}
            alt="sinal de mais para adicionar imagem"
            className="adicionar-button__image"
          />
        </button>
      </div>

      {/* <!-- ------------------------NEW CARD POPUP------------------------------ --> */}
      {
        <PopupWithForm title="Novo local" name="add-card" buttonLabel="Criar">
          <input
            id="profile-name-input"
            name="name"
            type="text"
            className="popup__input popup__input_profile-name"
            placeholder="Título"
            required
          />
          <input
            id="profile-link-input"
            name="link"
            type="url"
            className="popup__input popup__input_profile-link"
            placeholder="Link da imagem"
            required
          />

          <button className="popup__submit-button" type="submit">
            Criar
          </button>

          <span
            className="popup__input-error card-link-input-error"
            id="profile-link-input--error"
          />
        </PopupWithForm>
      }

      {/* <!-- ------------------------CARD GRID------------------------------ --> */}
      <ul className="cards">
        {initialArrayData}
      </ul>
    </main>
  );
}

export default Main;
