import "./Card.css";

function Card() {
  return (
    <li className="card" id="">
      <button className="card__delete-button">
        <img
          src="<%= require ('./images/trashCan.svg')%>"
          alt="ícone de lata de lixo"
          className="card__delete-icon card__delete-icon_active"
        />
        <img
          src="<%= require('./images/trashCan_grey.svg')%>"
          alt="ícone de lata de lixo"
          className="card__delete-icon card__delete-icon_inactive"
        />
      </button>
      <img src=" " alt="" className="card__image" />
      <div className="card__description-wrapper">
        <h4 className="card__title">teste</h4>
        <div className="card__like-wrapper">
          <img
            src="<%= require ('./images/heart.svg')%>"
            alt="imagem de um coração vazado"
            className="like-button like-button_inactive"
            id="like_off"
          />
          <img
            src="<%= require('./images/heart_active.svg')%>"
            alt="imagem de um coração vazado"
            className="like-button like-button_active like-button_hidden"
            id="like_on"
          />
          <p className="card__likes">22</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
