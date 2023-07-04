import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <>
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Around the U.S.</title>
      </head>
      <body>
        <header class="header">
          <img
            src="<%= require('./images/Around_the_US.svg')%>"
            id="around-the-us"
            alt="logotipo de Around the US"
            class="logo"
          />
        </header>

        {/* -- ------------------------PROFILE POPUP------------------------------ -- */}
        <main>
          <div class="profile">
            <div class="popup popup_profile">
              <form class="popup__card" autocomplete="off" novalidate>
                <img
                  src="<%= require('./images/Close_Icon.svg')%>"
                  alt="ícone X de fechar a janela"
                  class="popup__close-button"
                />
                <h4 class="popup__title">Editar perfil</h4>
                <input
                  id="name-input"
                  name="name"
                  type="text"
                  class="popup__input popup__input_name"
                  placeholder="Jacques Cousteau"
                  value=""
                  minlength="2"
                  maxlength="20"
                  required
                />
                <span
                  class="popup__input-error popup__name-input-error"
                  id="name-input--error"
                ></span>
                <input
                  id="description-input"
                  name="about"
                  type="text"
                  class="popup__input popup__input_profession"
                  value=""
                  placeholder="Explorador"
                  minlength="2"
                  maxlength="20"
                  required
                />
                <span
                  class="popup__input-error description-input-error"
                  id="description-input--error"
                ></span>
                <button class="popup__submit-button" type="submit">
                  Salvar
                </button>
              </form>
            </div>
            {/* -----------------PROFILE PICTURE EDIT POPUP ------------------------- */}
            <div class="popup popup_profile-picture">
              <form class="popup__card" autocomplete="off" novalidate>
                <img
                  src="<%= require('./images/Close_Icon.svg')%>"
                  alt="ícone X de fechar a janela"
                  class="popup__close-button"
                />
                <h4 class="popup__title">Alterar a foto do perfil</h4>
                <input
                  id="profile-link-input"
                  name="avatar"
                  type="url"
                  class="popup__input popup__input_profile-link"
                  placeholder="Link da imagem"
                  required
                />
                <span
                  class="popup__input-error card-link-input-error"
                  id="profile-link-input--error"
                ></span>
                <button class="popup__submit-button" type="submit">
                  Salvar
                </button>
              </form>
            </div>

            {/* ------------------------PROFILE INFO------------------------------ */}
            <div class="profile__info">
              <div class="profile__picture-wrapper">
                <div class="profile__picture-overlay">
                  <img
                    src="<%= require('./images/Pencil.svg')%>"
                    alt="illustration of pencil to edit profile"
                    class="profile__picture-icon"
                  />
                </div>
                <img
                  src=" "
                  alt="profile photograph"
                  class="profile__picture"
                />
              </div>
              <div class="profile__text-wrapper">
                <div class="profile__name-wrapper">
                  <h1 class="profile__name"></h1>
                  <button class="profile__edit">
                    <img
                      src="<%= require('./images/Pencil.svg')%>"
                      alt="ilustração de um lápis"
                    />
                  </button>
                </div>
                <h2 class="profile__title"></h2>
              </div>
            </div>
            <button class="adicionar-button">
              <img
                src="<%= require ('./images/Plus-sign.svg')%>"
                alt="sinal de mais para adicionar imagem"
                class="adicionar-button__image"
              />
            </button>
          </div>

          {/* ------------------------CARDS POPUP------------------------------ */}
          <ul class="cards">
            <div class="popup popup_add-card">
              <form class="popup__card" autocomplete="off" novalidate>
                <img
                  src="<%= require('./images/Close_Icon.svg')%>"
                  alt="ícone X de fechar a janela"
                  class="popup__close-button"
                />
                <h4 class="popup__title">Novo local</h4>
                <input
                  id="card-title-input"
                  name="name"
                  type="text"
                  class="popup__input popup__input_card-title"
                  placeholder="Título"
                  minlength="2"
                  maxlength="30"
                  required
                />
                <span
                  class="popup__input-error card-title-input-error"
                  id="card-title-input--error"
                ></span>
                <input
                  id="card-link-input"
                  name="link"
                  type="url"
                  class="popup__input popup__input_card-link"
                  placeholder="Link da imagem"
                  required
                />
                <span
                  class="popup__input-error card-link-input-error"
                  id="card-link-input--error"
                ></span>
                <button class="popup__submit-button" type="submit">
                  Criar
                </button>
              </form>
            </div>

            {/* ------------------------CARD POPUP WITH IMAGE--------------------------- */}
            <div class="popupwithimage">
              <div class="popupwithimage__wrapper">
                <img
                  src="<%= require ('./images/Close_Icon.svg')%>"
                  alt="ícone X de fechar a janela"
                  class="popupwithimage__close-button"
                />
                <img src=" " class="popupwithimage__image-big" alt=" " />
                <p></p>
              </div>
            </div>

            {/* -----------------DELETE CARD CONFIRMATION POPUP------------------------- */}
            <div class="popup popup_delete-card-confirmation">
              <div class="popup__card">
                <img
                  src="<%= require('./images/Close_Icon.svg')%>"
                  alt="ícone X de fechar a janela"
                  class="popup__close-button"
                />
                <h4 class="popup__title">Excluir cartão?</h4>
                <button
                  class="popup__confirmation-button"
                  type="submit"
                  enabled
                >
                  SIM
                </button>
              </div>
            </div>

            {/* ------------------------CARDS TEMPLATE------------------------------ */}
            <template class="card-template">
              <li class="card" id="">
                <button class="card__delete-button">
                  <img
                    src="<%= require ('./images/trashCan.svg')%>"
                    alt="ícone de lata de lixo"
                    class="card__delete-icon card__delete-icon_active"
                  />
                  <img
                    src="<%= require('./images/trashCan_grey.svg')%>"
                    alt="ícone de lata de lixo"
                    class="card__delete-icon card__delete-icon_inactive"
                  />
                </button>
                <img src=" " alt="" class="card__image" />
                <div class="card__description-wrapper">
                  <h4 class="card__title"></h4>
                  <div class="card__like-wrapper">
                    <img
                      src="<%= require ('./images/heart.svg')%>"
                      alt="imagem de um coração vazado"
                      class="like-button like-button_inactive"
                      id="like_off"
                    />
                    <img
                      src="<%= require('./images/heart_active.svg')%>"
                      alt="imagem de um coração vazado"
                      class="like-button like-button_active like-button_hidden"
                      id="like_on"
                    />
                    <p class="card__likes">22</p>
                  </div>
                </div>
              </li>
            </template>
          </ul>
        </main>

        {/* ------------------------FOOTER------------------------------ */}
        <footer class="footer">
          <p class="copyrights">© 2021 Around The U.S.</p>
        </footer>
      </body>
    </>
  );
}

export default App;
