import { atom } from "recoil";

type User = {
  username: string;
};

export const userState = atom<User>({
  key: "userState",
  default: {
    username: "",
  },
});
