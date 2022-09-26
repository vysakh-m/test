import axios from "axios";

const createUser = payload => axios.post("/api/public/users/", payload);
const showQuiz = slug => axios.get(`/api/public/quizzes/${slug}`);
const showAttempt = id => axios.get(`/api/public/attempts/${id}`);
const updateAttempt = ({ id, payload }) =>
  axios.put(`/api/public/attempts/${id}`, payload);

const publicApi = {
  createUser,
  showQuiz,
  showAttempt,
  updateAttempt,
};

export default publicApi;
