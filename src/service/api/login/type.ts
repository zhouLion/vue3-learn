export interface ILoginParams {
  username: string;
  passWord: string | number;
}
export interface ILoginApi {
  login: (params: ILoginParams) => Promise<any>;
}
