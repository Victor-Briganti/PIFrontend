import axios, { AxiosRequestConfig } from "axios";
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

  protected async get(url: string, config = {}) {
    try {
      const response = await axios.get(this.host + url, config);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      const detail = error.response.data.detail;
      throw new Error(detail);
    }
  }

  protected async post(url: string, data: T | null = null, config = {}) {
    try {
      const response = await axios.post(this.host + url, data, config);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      const detail = error.response.data.detail;
      throw new Error(detail);
    }
  }

  protected async put(url: string, data: T | null = null, config = {}) {
    try {
      const response = await axios.put(this.host + url, data, config);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      const detail = error.response.data.detail;
      throw new Error(detail);
    }
  }

  protected async delete(url: string, config: AxiosRequestConfig<any> = {}) {
    try {
      const response = await axios.delete(this.host + url, config);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
      const detail = error.response.data.detail;
      throw new Error(detail);
    }
  }
}

export default AxiosBase;
