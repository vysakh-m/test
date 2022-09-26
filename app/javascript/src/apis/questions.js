import axios from "axios";

const create = payload => axios.post("/api/questions/", payload);
const update = ({ id, payload }) => axios.put(`/api/questions/${id}`, payload);
const destroy = id => axios.delete(`/api/questions/${id}`);
const questionApi = {
  create,
  update,
  destroy,
};

export default questionApi;
