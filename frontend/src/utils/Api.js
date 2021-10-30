class Api {
  constructor({ address, token, groupId }) {
    this._address = address;
    this._token = token;
    this._groupId = groupId;
  }

  _checkResponse(result) {
    return result.ok ? result.json() : Promise.reject(`${result.status}`);
  }

  getInitialCards() {
    return fetch(`${this._address}/cards`, {
      headers: {
        authorization: this._token,
      },
    }).then(this._checkResponse);
  }

  getUserData(data) {
    return fetch(`${this._address}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._checkResponse);
  }

  getUserInfo() {
    return fetch(`${this._address}/users/me`, {
      method: "GET",
      headers: {
        authorization: this._token,
      },
    }).then(this._checkResponse);
  }

  addCard(data) {
    return fetch(`${this._address}/cards`, {
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        link: data.link,
        name: data.photoName,
      }),
    }).then(this._checkResponse);
  }

  changeAvatar(infoAvatar) {
    return fetch(`${this._address}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: infoAvatar.avatar,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(id) {
    return fetch(`${this._address}/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      },
    }).then(this._checkResponse);
  }

  setLike(id, isLiked) {
    const method = isLiked ? "PUT" : "DELETE";
    return fetch(`${this._address}/cards/likes/${id}`, {
      method: method,
      headers: {
        authorization: this._token,
      },
    }).then(this._checkResponse);
  }

  // deleteLike(cardId) {
  //   return fetch(`${this._address}/${this._groupId}/cards/likes/${cardId}`, {
  //     method: "DELETE",
  //     headers: {
  //       authorization: this._token,
  //     },
  //   }).then(this._checkResponse);
  // }
}

const api = new Api({
  address: "https://api.space900.nomoredomains.work",
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
