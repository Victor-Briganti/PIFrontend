import { FormEvent } from "react";

abstract class BaseSubmit {
    host = "http://localhost:8000";

    constructor() {
        this.send = this.send.bind(this);
    }

    abstract send(event: FormEvent<HTMLFormElement>): void;
}

export default BaseSubmit;
