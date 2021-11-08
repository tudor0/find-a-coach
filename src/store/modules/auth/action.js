let timer;

export default {
  async login(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'login',
    });
  },

  async signup(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'signup',
    });
  },
  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');
    clearTimeout(timer);
    context.commit('setUser', {
      token: null,
      userId: null,
      tokenExpiration: null,
    });
  },
  async auth(context, payload) {
    const mode = payload.mode;
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCGZG6Zo8emFQY665wlO5hqyicWcHdTQGA`;
    if (mode === 'signup') {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCGZG6Zo8emFQY665wlO5hqyicWcHdTQGA`;
    }
    const resp = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });
    if (!resp.ok) {
      throw new Error('Something went wrong!');
    }

    const respData = await resp.json();
    localStorage.setItem('token', respData.idToken);
    localStorage.setItem('userId', respData.localId);

    context.commit('setUser', {
      token: respData.idToken,
      userId: respData.localId,
    });
  },
  tryLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (token && userId) {
      context.commit('setUser', {
        token,
        userId,
      });
    }
  },
};
