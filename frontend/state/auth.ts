import { atom } from "recoil";

// TODO: tsの型の確認
export const usersState = atom<string | number>({
  key: "usersState", // unique ID (with respect to other atoms/selectors)
  // TODO: ユーザーの情報をmongodbから取得してこないといけない可能性(+)
  default: "", // default value (aka initial value)
});
