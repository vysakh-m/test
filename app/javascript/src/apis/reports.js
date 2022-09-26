import axios from "axios";

const list = () => axios.get("/api/reports/");
const request = () => axios.get("/api/export/");
const status = id => axios.get(`/api/export_status/${id}`);
const download = id =>
  axios.get(`/api/export_download/${id}`, { responseType: "blob" });

const reportApi = {
  list,
  request,
  status,
  download,
};

export default reportApi;
