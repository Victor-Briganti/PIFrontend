import axios from "axios";
import BaseSubmit from "./BaseSubmit";
import Cookies from 'js-cookie';

class RegisterSubmit extends BaseSubmit {
  constructor() {
    super();
    const csrfToken = Cookies.get('csrftoken');
    axios.defaults.headers.post["X-CSRFToken"] = csrfToken;
    axios.defaults.withCredentials = true;
  }

  async send(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    try {
      const response = await axios.post(this.host + "/user/login/", {
        email: email,
        password: password,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
}

export default RegisterSubmit;
