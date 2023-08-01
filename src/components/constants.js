import { Api } from "../utils/api";

const apiUrl = "https://around.nomoreparties.co/v1/web_ptbr_04";
const authorization = "f3091314-56bf-4879-8be9-facfbce522a8";
const clientApi = new Api(apiUrl, authorization);
const thisUser = clientApi
  .getUser()
  .then((res) => res.json())
  .then((data) => data);

export { clientApi, thisUser, authorization };
