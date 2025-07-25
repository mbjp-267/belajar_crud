import axios from "axios";

const instance = axios.create({
  baseURL: "https://belajarcrud-production.up.railway.app"
});

export default instance;
