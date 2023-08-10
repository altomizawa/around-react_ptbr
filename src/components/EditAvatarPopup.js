import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup(props) {
  const [avatar, setAvatar] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);
  const avatarRef = React.useRef();

  //ADD USER DATA TO PROFILE POPUP
  React.useEffect(() => {
    setAvatar(currentUser.name);
  }, [currentUser]);

  const [formData, setFormData] = React.useState({
    name: "",
    about: "",
    avatar: "",
  });

  function handleInputChange(evt) {
    const { name, value } = evt.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar(avatarRef.current.value);
  }

  return (
    <PopupWithForm
      title="Alterar foto do perfil"
      name="edit_avatar"
      buttonLabel="Alterar"
      onSubmit={handleSubmit}
      isOpen={props.isOpen}
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
        ref={avatarRef}
        // value={formData.name}
      />
      <span
        className="popup__input-error card-link-input-error"
        id="profile-link-input--error"
      />
    </PopupWithForm>
  );
}
