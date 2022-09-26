import axios from "axios";

const login = payload => axios.post("/api/sessions", payload);
const logout = () => axios.delete("/api/sessions");

const authApi = {
  login,
  logout,
};

export default authApi;
