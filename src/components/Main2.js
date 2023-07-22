import "./Main.css";
import PencilButton from "../../images/Pencil.svg";
import AddButton from "../../images/Plus-sign.svg";
import CloseButton from "../../images/Close_Icon.svg";
import ProfilePicture from "../../images/imageprofile-picture.jpg";
import PopupWithForm from "../PopupWithForm";
import Card from "../Card/Card";

const handleProfileClick = () => {
  document.querySelector(".popup_profile_info").classList.add("popup_active");
};
const handleAvatarClick = () => {
  document.querySelector(".popup_profile_avatar").classList.add("popup_active");
};
const handleNewCardClick = () => {
  document.querySelector(".popup_add-card").classList.add("popup_active");
};

function Main() {
  return (
    <main>
      <div className="profile">
        <PopupWithForm
          title="Editar perfil"
          name="info"
          profession="profession"
        >
          <input
            id="profile-link-input"
            name="{avatar}"
            type="url"
            className="popup__input popup__input_profile-link"
            placeholder="Link da imagem"
            required
          />
          <span
            className="popup__input-error card-link-input-error"
            id="profile-link-input--error"
          />
          <button className="popup__submit-button" type="submit">
            Salvar
          </button>
        </PopupWithForm>
        <div className="popup popup_profile">
          <form className="popup__card" autoComplete="off" noValidate>
            <img
              src={CloseButton}
              alt="ícone X de fechar a janela"
              className="popup__close-button"
            />
            <h4 className="popup__title">Editar perfil</h4>
            <input
              id="name-input"
              name="name"
              type="text"
              className="popup__input popup__input_name"
              placeholder="Jacques Cousteau"
              defaultValue="Jacques Cousteau"
              minLength="2"
              maxLength="20"
              required
            />
            <span
              className="popup__input-error popup__name-input-error"
              id="name-input--error"
            ></span>
            <input
              id="description-input"
              name="about"
              type="text"
              className="popup__input popup__input_profession"
              defaultValue="Explorador"
              placeholder="Explorador"
              minLength="2"
              maxLength="20"
              required
            />
            <span
              className="popup__input-error description-input-error"
              id="description-input--error"
            ></span>
            <button className="popup__submit-button" type="submit">
              Salvar
            </button>
          </form>
        </div>
        {
          <PopupWithForm
            visibility={props.isEditAvatarPopupOpen ? "popup_open" : "popup"}
            title="Alterar a foto do perfil"
            name="avatar"
          >
            <input
              id="profile-link-input"
              name="{avatar}"
              type="url"
              className="popup__input popup__input_profile-link"
              placeholder="Link da imagem"
              required
            />
            <span
              className="popup__input-error card-link-input-error"
              id="profile-link-input--error"
            />
            <button className="popup__submit-button" type="submit">
              Salvar
            </button>
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
              src={ProfilePicture}
              alt="Avatar"
              className="profile__picture"
            />
          </div>
          <div className="profile__text-wrapper">
            <div className="profile__name-wrapper">
              <h1 className="profile__name">Jacques Cousteau</h1>
              <button onClick={handleProfileClick} className="profile__edit">
                <img src={PencilButton} alt="ilustração de um lápis" />
              </button>
            </div>
            <h2 className="profile__title">Explorador</h2>
          </div>
        </div>
        <button className="adicionar-button" onClick={handleNewCardClick}>
          <img
            src={AddButton}
            alt="sinal de mais para adicionar imagem"
            className="adicionar-button__image"
          />
        </button>
      </div>
      <Card
        name="subway"
        url="https://plus.unsplash.com/premium_photo-1681157419908-feb8824658b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
      />

      {/* <!-- ------------------------CARDS POPUP------------------------------ --> */}
      <ul className="cards">
        <div className="popup popup_add-card">
          <form className="popup__card" autoComplete="off" noValidate>
            <img
              src={CloseButton}
              alt="ícone X de fechar a janela"
              className="popup__close-button"
            />
            <h4 className="popup__title">Novo local</h4>
            <input
              id="card-title-input"
              name="name"
              type="text"
              className="popup__input popup__input_card-title"
              placeholder="Título"
              minLength="2"
              maxLength="30"
              required
            />
            <span
              className="popup__input-error card-title-input-error"
              id="card-title-input--error"
            ></span>
            <input
              id="card-link-input"
              name="link"
              type="url"
              className="popup__input popup__input_card-link"
              placeholder="Link da imagem"
              required
            />
            <span
              className="popup__input-error card-link-input-error"
              id="card-link-input--error"
            ></span>
            <button className="popup__submit-button" type="submit">
              Criar
            </button>
          </form>
        </div>

        {/* <!-- ------------------------CARD POPUP WITH IMAGE--------------------------- --> */}
        <div className="popupwithimage">
          <div className="popupwithimage__wrapper">
            <img
              src={CloseButton}
              alt="ícone X de fechar a janela"
              className="popupwithimage__close-button"
            />
            <img src=" " className="popupwithimage__image-big" alt=" " />
            <p></p>
          </div>
        </div>

        {/* <!-- -----------------DELETE CARD CONFIRMATION POPUP-------------------------> */}
        <div className="popup popup_delete-card-confirmation">
          <div className="popup__card">
            <img
              src={CloseButton}
              alt="ícone X de fechar a janela"
              className="popup__close-button"
            />
            <h4 className="popup__title">Excluir cartão?</h4>
            <button
              className="popup__confirmation-button"
              type="submit"
              enabled="true"
            >
              SIM
            </button>
          </div>
        </div>
      </ul>
    </main>
  );
}

export default Main;
