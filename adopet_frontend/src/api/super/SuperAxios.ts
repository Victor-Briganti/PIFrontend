import axios, { AxiosRequestConfig } from "axios";
import Cookies from "js-cookie";

abstract class SuperAxios<T> {
  protected host: string;
  constructor() {
    this.host = "http://localhost:8000";
    axios.defaults.headers.post["X-CSRFToken"] = Cookies.get("csrftoken");
    axios.defaults.headers.put["X-CSRFToken"] = Cookies.get("csrftoken");
    axios.defaults.headers.delete["X-CSRFToken"] = Cookies.get("csrftoken");
    axios.defaults.withCredentials = true;
  }

  protected async get(url: string, config?: AxiosRequestConfig) {
    try {
      const response = await axios.get(this.host + url, config);
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`${error.status}: ${error.response?.data?.detail}`);
      }
      throw new Error(String(error));
    }
  }

  protected async post<D = T>(
    url: string,
    data: D | null = null,
    config?: AxiosRequestConfig
  ) {
    try {
      const response = await axios.post(this.host + url, data, config);
      console.log(response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`${error.status}: ${error.response?.data?.detail}`);
      }
      throw new Error(String(error));
    }
  }

  protected async put<D = T>(
    url: string,
    data: D | null = null,
    config?: AxiosRequestConfig
  ) {
    try {
      const response = await axios.put(this.host + url, data, config);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`${error.status}: ${error.response?.data?.detail}`);
      }
      throw new Error(String(error));
    }
  }

  protected async delete(url: string, config?: AxiosRequestConfig) {
    try {
      const response = await axios.delete(this.host + url, config);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`${error.status}: ${error.response?.data?.detail}`);
      }
      throw new Error(String(error));
    }
  }
}

export default SuperAxios;
