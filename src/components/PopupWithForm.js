import CloseButton from "../images/Close_Icon.svg";

function PopupWithForm(props) {
  function closePopup() {
    document
      .querySelector(`.popup_${props.name}`)
      .classList.remove("popup_active");
  }
  return (
    <div className={`popup popup_${props.name}`}>
      <form className="popup__card" autoComplete="off" noValidate>
        <img
          src={CloseButton}
          alt="ícone X de fechar a janela"
          className="popup__close-button"
          onClick={closePopup}
        />
        <h4 className="popup__title">{props.title}</h4>
        {props.children}
      </form>
    </div>
  );
}

export default PopupWithForm;
