import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { clientApi } from "./constants";
import ImagePopUp from "./ImagePopup";

export default function App() {
  // ------------------Set Cards Array-------------------------
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    clientApi
      .getCardArray()
      .then((data) => setCards(data))
      .catch((err) => console.log(err));
  }, []);

  // ------------------Create Card-------------------------
  function handleSubmit(card) {
    clientApi
      .addCard(card)
      .then((res) => res.json())
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((err) => console.log(err));
  }

  //-------------------Delete Card-------------------------
  function handleCardDelete(cardId) {
    clientApi
      .removeCard(cardId)
      .then(() => {
        setCards(cards.filter((c) => c._id !== cardId));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //------------------Set User Data-------------------------
  const [user, setUser] = React.useState({});
  React.useEffect(() => {
    clientApi.getUser().then((data) => {
      setUser(data);
    });
  }, []);

  // ------------------Variables-------------------------
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  // ------------------Event Handlers-------------------------

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen((prevState) => !prevState);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen((prevState) => !prevState);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen((prevState) => !prevState);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  // ------------------Functions-------------------------

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  };

  selectedCard && console.log(selectedCard);

  // ------------------JSX-------------------------
  return (
    <>
      <Header />
      <Main
        isEditProfilePopupOpen={isEditProfilePopupOpen}
        isAddPlacePopupOpen={isAddPlacePopupOpen}
        isEditAvatarPopupOpen={isEditAvatarPopupOpen}
        selectedCard={selectedCard}
        handleCardClick={handleCardClick}
        onEditProfileClick={handleEditProfileClick}
        onEditAvatarClick={handleEditAvatarClick}
        onAddPlaceClick={handleAddPlaceClick}
        onClose={closeAllPopups}
        cards={cards}
        handleSubmit={handleSubmit}
        user={user}
        setUser={setUser}
        handleCardDelete={handleCardDelete}
      />
      {selectedCard && (
        <ImagePopUp
          card={selectedCard}
          onClose={closeAllPopups}
          isActive="true"
        />
      )}

      <Footer />
    </>
  );
}
