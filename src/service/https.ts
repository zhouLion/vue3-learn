//http.ts
import axios, { AxiosRequestConfig } from "axios";
import NProgress from "nprogress";

// 设置请求头路径
axios.defaults.baseURL = "/api";
axios.defaults.timeout = 10000;
axios.defaults.headers.post["content-type"] = "application/json;charset=UTF-8";
axios.interceptors.request.use(
  (config): AxiosRequestConfig<any> => {
    const token = window.sessionStorage.getItem("token");
    if (token) {
      //@ts-ignore
      config.headers.token = token;
    }
    return config;
  },
  (error) => {
    return error;
  }
);

// 响应拦截
axios.interceptors.response.use(
  (res) => {
    if (res.data.code === 111) {
      sessionStorage.setItem("token", "");
      // token过期操作
      return res;
    }
    return Promise.reject(res);
  },
  (error) => {
    return error;
  }
);

interface ResType<T> {
  code: number;
  data?: T;
  msg: string;
  err?: string;
}
interface Http {
  get<T>(url: string, params?: unknown): Promise<ResType<T>>;
  post<T>(url: string, params?: unknown): Promise<ResType<T>>;
  upload<T>(url: string, params?: unknown): Promise<ResType<T>>;
  download<T>(url: string): void;
}

const http: Http = {
  get(url, params) {
    return new Promise((resolve, reject) => {
      NProgress.start();
      axios
        .get(url, { params })
        .then((res: any) => {
          NProgress.done();
          resolve(res.data);
        })
        .catch((err: any) => {
          NProgress.done();
          reject(err);
        });
    }); // end Promise
  },
  post(url, params) {
    return new Promise((resolve, reject) => {
      NProgress.start();
      axios
        .post(url, params)
        .then((res: any) => {
          NProgress.done();
          resolve(res.data);
        })
        .catch((err: any) => {
          NProgress.done();
          reject(err);
        });
    }); // end Promise
  },
  upload(url, file) {
    return new Promise((resolve, reject) => {
      NProgress.start();
      axios
        .post(url, file, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res: any) => {
          NProgress.done();
          resolve(res.data);
        })
        .catch((err: any) => {
          NProgress.done();
          reject(err);
        });
    }); // end Promise
  },
  download(url) {
    const iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.src = url;
    iframe.onload = () => {
      document.body.removeChild(iframe);
    };
    document.body.appendChild(iframe);
  },
};

export default http;
