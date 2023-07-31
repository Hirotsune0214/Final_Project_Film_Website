import { atom } from "recoil";

export const authState = atom({
  key: "authState", // unique ID (with respect to other atoms/selectors)
  // TODO: 初期値はどうしたほうが良いか確認する
  // mongoDBから取得するやり方にする？
  default: {}, // default value (aka initial value)
  // 型を揃えておく
});
