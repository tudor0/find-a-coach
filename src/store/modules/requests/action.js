export default {
  async contactCoach(context, payload) {
    const newRequest = {
      userEmail: payload.email,
      message: payload.message,
    };
    const resp = await fetch(
      `https://find-a-coach-a8564-default-rtdb.europe-west1.firebasedatabase.app/requests/${payload.coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newRequest),
      }
    );
    const respData = await resp.json();
    if (!resp.ok) {
      const error = new Error(respData.message || 'Failed to send request');
      throw error;
    }
    newRequest.id = respData.name;
    newRequest.coachId = payload.coachId;
    context.commit('addRequest', newRequest);
  },
  async fetchReq(context) {
    const coachId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const resp = await fetch(
      `https://find-a-coach-a8564-default-rtdb.europe-west1.firebasedatabase.app/requests/${coachId}.json?auth=${token}`
    );
    const respData = await resp.json();
    if (!resp.ok) {
      const error = new Error(respData.message || 'Failed to fetch requests');
      throw error;
    }
    const requests = [];
    for (const key in respData) {
      const req = {
        id: key,
        coachId,
        userEmail: respData[key].userEmail,
        message: respData[key].message,
      };
      requests.push(req);
    }
    context.commit('setReq', requests);
  },
};
