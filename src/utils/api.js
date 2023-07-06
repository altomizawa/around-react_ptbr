import { authorization } from "./constants.js";

export class Api {
  constructor(url, authorization) {
    this._url = url;
    this._authorization = authorization;
  }

  getUser() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        Authorization: this._authorization,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        //if server returns error, then:
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateProfile(userInfo, button) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: {
        Authorization: this._authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `${userInfo.name}`,
        about: `${userInfo.about}`,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })

      .catch((err) => console.log(err))

      .finally(() => {
        button.textContent = "Salvar";
      });
  }

  updateProfilePicture(userInfo, button) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        Authorization: this._authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: `${userInfo.avatar}`,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error ${res.status}`);
      })

      .catch((err) => {
        console.log(err);
      })

      .finally(() => {
        button.textContent = "Salvar";
      });
  }

  getCardArray() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: {
        Authorization: this._authorization,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        //if server returns error, then:
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async addCard(cardTitle, cardLink, popup) {
    return await fetch(`${this._url}/cards`, {
      method: "POST",
      headers: {
        Authorization: this._authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: cardTitle,
        link: cardLink,
      }),
    })
      .then((res) => {
        if (res.ok) {
          res.json();
        }
        return Promise.reject(`Error ${res.status}`);
      })

      .catch((err) => {
        console.log(err);
      });
  }

  async removeCard(cardId, button) {
    return await fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        Authorization: this._authorization,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })

      .catch((err) => {
        console.log(err);
      })

      .finally(() => {
        button.textContent = "SIM";
      });
  }

  sendLike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: {
        Authorization: this._authorization,
        "Content-Type": "application.json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })

      .catch((err) => {
        console.log(err);
      });
  }

  sendDislike(cardId) {
    return fetch(`${this._url}/cards/likes/${cardId}`, {
      method: "DELETE",
      headers: {
        Authorization: this._authorization,
        "Content-Type": "application.json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })

      .catch((err) => {
        console.log(err);
      });
  }
}
