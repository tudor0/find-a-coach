export default {
  addRequest(state, payload) {
    state.requests.push(payload);
  },
  setReq(state, payload) {
    state.requests = payload;
  },
};
