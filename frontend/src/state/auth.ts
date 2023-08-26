import { atom } from "recoil";

type User = {
  // user: any;
  username: string;
};

export const userState = atom<User>({
  key: "userState",
  default: {
    username: "",
  },
});
