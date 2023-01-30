export default class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

getUserInfo() {
  return fetch(`${this._url}/users/me`, {
  method: 'GET',
  headers: this._headers
})
}

getInitialCards() {
  return fetch(`${this._url}/cards`, {
  method: 'GET',
  headers: this._headers
  })
}

editProfile() {
  return fetch(`${this._url}/users/me`, {
    method: 'PATCH',
    headers: this._headers,
    body: JSON.stringify({
      name: ,
      about:
    })
  })
}

addCard() {
  return fetch(`${this._url}/cards`, {
    method: 'POST',
    headers: this._headers,
    body: JSON.stringify({
      name: ,
      link:
    })
  }
  )
}

deleteCard() {
  return fetch(`${this._url}/cards/${id}`, {
    method: 'DELETE',
    headers: this._headers
  })
}

putLike() {
  return fetch(`${this._url}/cards/${id}/likes`, {
  method: 'PUT',
  headers: this._headers
  })
}

removeLike() {
  return fetch(`${this._url}/cards/${id}/likes`, {
    method: 'DELETE',
    headers: this._headers
  })
}

changeAvatar() {
  return fetch(`${this._url}/users/me/avatar`), {
    method: 'PATCH',
    headers: this._headers
  }
}

}
