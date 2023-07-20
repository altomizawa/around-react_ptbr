import React from "react";

import PencilButton from "../../images/Pencil.svg";
import AddButton from "../../images/Plus-sign.svg";
import PopupWithForm from "../PopupWithForm";
import Card from "../Card/Card";

function Main(props) {
  // --------------------MAP CARDS-------------------------
  const cardsData = props.cards.map((card, i) => (
    <Card
      key={i}
      {...card}
      card={card}
      onCardClick={props.handleCardClick}
      handleCardDelete={props.handleCardDelete}
    />
  ));

  //---------------------Variables----------------------
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  React.useEffect(() => {setUserName(props.user.name)}, [props.user.name]);
  React.useEffect(() => {setUserDescription(props.user.about)}, [props.user.about]);
  React.useEffect(() => {setUserAvatar(props.user.avatar)}, [props.user.avatar]);

  // --------------------FORM SUBMISSION PREVENT DEFAULT-------------------------
  function submitHandler(evt) {
    evt.preventDefault();
    props.handleSubmit(formData);
    props.onClose();
  }

  // --------------------GET FORM DATA------------------------
  const [formData, setFormData] = React.useState({
    name: "",
    about: "",
    avatar: "",
    cardName: "",
    cardLink: "",
  });

  // --------------------SHOW FORM DATA------------------------
  function handleInputChange(evt) {
    const { name, value } = evt.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    //----------------FORM VALIDATION-------------------
    formData.avatar.length <10 ? console.log("menor que 10") : console.log("maior que 10")  
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
            onSubmit={submitHandler}
            isPopupActive={props.isEditProfilePopupOpen}
            onClose={props.onClose}
          >
            <input
              id="profile-name-input"
              name="name"
              type="text"
              className="popup__input popup__input_profile-name"
              placeholder={props.user.name}
              required
              onChange={handleInputChange}
              value={formData.name}
            />
            <input
              id="profile-profession-input"
              name="about"
              type="text"
              className="popup__input popup__input_profile-profession"
              placeholder={props.user.about}
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
            name="newcard"
            buttonLabel="Criar"
            onSubmit={submitHandler}
            isPopupActive={props.isAddPlacePopupOpen}
            onClose={props.onClose}
          >
            <input
              id="profile-name-input"
              name="cardName"
              type="text"
              className="popup__input popup__input_profile-name"
              placeholder="Título"
              required
              onChange={handleInputChange}
            />
            <input
              id="profile-link-input"
              name="cardLink"
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
