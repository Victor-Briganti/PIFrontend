import BaseSubmit from "./BaseSubmit";
import axios from "axios";

class RegisterSubmit extends BaseSubmit {
  constructor() {
    super();
  }

  async send(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const firstname = data.get("firstname");
    const lastname = data.get("lastname");
    const email = data.get("email");
    const password = data.get("password");

    try {
      const response = await axios.post(this.host + "/user/register/", {
        firstname: firstname,
        lastname: lastname,
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
