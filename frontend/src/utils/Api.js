class Api {
    constructor(basePath, token) {
      this._basePath = basePath;
      this._token = token;
    }
    _getHeaders() {
      return {
        "Content-type": "application/json",
        authorization: this._token,
      };
    }
    _getJson(res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  
    getCards() {
      return fetch(`${this._basePath}/cards`, {
        headers: this._getHeaders(),
      }).then(this._getJson);
    }
  
    createNewCard({ item }) {
      return fetch(`${this._basePath}/cards`, {
        method: "POST",
        headers: this._getHeaders(),
        body: JSON.stringify({
                link: item.link,
                name: item.name
        }),
      }).then(this._getJson);
    }
  
    getCurrentUser() {
      return fetch(`${this._basePath}/users/me `, {
        headers: this._getHeaders(),
      }).then(this._getJson);
    }
    deleteCard(id) {
      return fetch(`${this._basePath}/cards/${id} `, {
        method: "DELETE",
        headers: this._getHeaders(),
      }).then(this._getJson);
    }
    createNewAvatar(link) {
      return fetch(`${this._basePath}/users/me/avatar`, {
        method: "PATCH",
        headers: this._getHeaders(),
        body: JSON.stringify({
          avatar: link,
        }),
      }).then(this._getJson);
    }

    getAllCardWhithUser() {
        return Promise.all([this.getCards(), this.getCurrentUser()]);
    }

    createNewProfile(name, job) {
      return fetch(`${this._basePath}/users/me`, {
        method: "PATCH",
        headers: this._getHeaders(),
        body: JSON.stringify({
          name: name,
          about: job,
        }),
      }).then(this._getJson);
    }
    _likeCard(id) {
      return fetch(`${this._basePath}/cards/${id}/likes`, {
          method: "PUT",
          headers: this._getHeaders(),
      })
      .then(this._getJson);
  }

  _deleteLike(id) {
      return fetch(`${this._basePath}/cards/${id}/likes`, {
          method: "DELETE",
          headers: this._getHeaders(),
      })
      .then(this._getJson);
  }

  changeLikeCardStatus(id, isLiked) {
      return isLiked ? this._deleteLike(id) : this._likeCard(id)
  }
  }

  const api = new Api('https://backend.neydy.nomoredomains.rocks/');
  
    export default api;