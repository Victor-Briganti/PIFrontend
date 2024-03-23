import BaseSubmit from "./BaseSubmit";
import axios from "axios";

class SignUp extends BaseSubmit {
  constructor() {
    super();
  }

  async send(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("name");
    const surname = data.get("surname");
    const email = data.get("email");
    const password = data.get("password");

    try {
      const response = await axios.post(this.host + "/usuario/signup/", {
        name: name,
        surname: surname,
        email: email,
        password: password,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }
}

export default SignUp;
