
function imagePopUp(){
    return(
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
    )
}