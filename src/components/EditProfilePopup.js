import React from 'react'
import PopupWithForm from './PopupWithForm'
import { CurrentUserContext } from "../contexts/CurrentUserContext";


export default function EditProfilePopup(props) {
    const [name, setName] = React.useState('');
    const [about, setAbout] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);
    React.useEffect(() => {
        setName(currentUser.name);
        setAbout(currentUser.about);
    }, [currentUser]);

    

    return (
        <PopupWithForm
          title="Editar perfil"
          name="profile_info"
          buttonLabel="Alterar"
          onSubmit={editProfileSubmitHandler}
          isPopupActive={props.isOpen}
          onClose={props.onClose}
        >
          <input
            id="profile-name-input"
            name="name"
            type="text"
            className="popup__input popup__input_profile-name"
            placeholder={name}
            required
            onChange={handleInputChange}
            value={formData.name}
          />
          <input
            id="profile-profession-input"
            name="about"
            type="text"
            className="popup__input popup__input_profile-profession"
            placeholder={about}
            required
            onChange={handleInputChange}
            value={formData.about}
          />
          <span
            className="popup__input-error card-link-input-error"
            id="profile-link-input--error"
          />
        </PopupWithForm>
    )
}
