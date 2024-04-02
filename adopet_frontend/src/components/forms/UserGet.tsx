import axios from "axios";
import BaseSubmit from "./BaseSubmit";
import Cookies from "js-cookie";

class UserGet extends BaseSubmit {
  constructor() {
    super();
    const csrfToken = Cookies.get("csrftoken");
    axios.defaults.headers.post["X-CSRFToken"] = csrfToken;
    axios.defaults.withCredentials = true;
  }

  async send() {
    try {
      const response = await axios.get(this.host + "/user/");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}

export default UserGet;
