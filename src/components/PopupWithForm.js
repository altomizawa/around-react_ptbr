import CloseButton from "../images/Close_Icon.svg";

function PopupWithForm(props) {
  return (
    <div className={`popup popup_profile_${props.name}`}>
      <form className="popup__card" autoComplete="off" noValidate>
        <img
          src={CloseButton}
          alt="ícone X de fechar a janela"
          className="popup__close-button"
        />
        <h4 className="popup__title">{props.title}</h4>
        {props.children}
      </form>
    </div>
  );
}

export default PopupWithForm;
