import axios from "axios";
import BaseSubmit from "./BaseSubmit";
import Cookies from "js-cookie";

class DeleteSubmit extends BaseSubmit {
    constructor() {
        super();
        const csrfToken = Cookies.get("csrftoken");
        axios.defaults.headers.delete["X-CSRFToken"] = csrfToken;
        axios.defaults.withCredentials = true;
    }

    async send(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            const response = await axios.delete(this.host + "/user/delete/");
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }
}

export default DeleteSubmit;
