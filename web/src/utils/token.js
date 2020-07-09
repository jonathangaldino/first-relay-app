const TOKEN_KEY = 'first-relay-app::token';

export function getToken() {
  // get token from cookie or session token instead
  localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}
