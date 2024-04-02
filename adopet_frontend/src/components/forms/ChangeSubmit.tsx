import axios from "axios";
import BaseSubmit from "./BaseSubmit";
import Cookies from "js-cookie";
import User from "./models/User";

class ChangeSubmit extends BaseSubmit {
    constructor() {
        super();
        const csrfToken = Cookies.get("csrftoken");
        axios.defaults.headers.put["X-CSRFToken"] = csrfToken;
        axios.defaults.withCredentials = true;
    }

    async send(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const id = data.get("id");
        const password = data.get("password");

        try {
            const response = await axios.put(this.host + "/user/update/", {
                id: id,
                password: password,
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    async sendWithUser(formData: FormData, user: User) {
        const password = formData.get("password");
        try {
            const response = await axios.put(this.host + "/user/update/", {
                id: user.id,
                password: password,
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }
}

export default ChangeSubmit;
