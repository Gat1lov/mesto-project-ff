const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-4',
  headers: {
    authorization: 'ed71a921-5af8-4dcc-9841-c1f795ccfb71',
    'Content-Type': 'application/json'
  }
};

export function fetchData(url, method, body) {
  const options = {
    method: method,
    headers: config.headers
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  return fetch(`${config.baseUrl}${url}`, options)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export function getProfile() {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers,
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
}

export function updateProfile(profileData) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(profileData)
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export function initialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers,
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
};

export function createApiCard(data) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: data.name,
      link: data.link
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
};

export function deleteApiCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export function activeApiLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export function deleteApiLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}


export function updateAvatar(newAvatarUrl) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: newAvatarUrl
    })
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export function loadProfileAndCards() {
  return Promise.all([getProfile(), initialCards()])
    .then(([profile, cards]) => {
      return { profile, cards };
    })
    .catch((error) => {
      console.error('Ошибка при загрузке профиля и карточек:', error);
      throw error;
    });
}