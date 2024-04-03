import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import Cookies from "js-cookie";

abstract class AxiosBase<T> {
  protected host: string;
  constructor() {
    this.host = "http://localhost:8000";
    axios.defaults.headers.post["X-CSRFToken"] = Cookies.get("csrftoken");
    axios.defaults.headers.put["X-CSRFToken"] = Cookies.get("csrftoken");
    axios.defaults.headers.delete["X-CSRFToken"] = Cookies.get("csrftoken");
    axios.defaults.withCredentials = true;
  }

  protected abstract get(url: string, config : AxiosRequestConfig) : AxiosResponse;
  protected abstract post(url: string, data: T | null, config : AxiosRequestConfig) : AxiosResponse;
  protected abstract put(url: string, data: T | null, config : AxiosRequestConfig) : AxiosResponse;
  protected abstract delete(url: string, config : AxiosRequestConfig) : AxiosResponse;
}

export default AxiosBase;
