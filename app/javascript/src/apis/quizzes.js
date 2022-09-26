import axios from "axios";

const list = () => axios.get("/api/quizzes");
const show = id => axios.get(`/api/quizzes/${id}`);
const create = payload => axios.post("/api/quizzes/", payload);
const update = ({ id, payload }) => axios.put(`/api/quizzes/${id}`, payload);
const destroy = id => axios.delete(`/api/quizzes/${id}`);
const quizApi = {
  list,
  create,
  update,
  show,
  destroy,
};

export default quizApi;
