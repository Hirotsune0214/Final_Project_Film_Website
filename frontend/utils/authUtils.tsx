import authApi from "@/pages/api/authApi";

const authUtils = {
  // JWTチェック
  isAuthenticated: async () => {
    // ユーザーが持っているjwtを取得する
    const token = localStorage.getItem("token");
    // JWTがなければ、returnを返す
    if (!token) return false;

    // JWTが存在すればAPIを叩いて、失敗すればfalseを返す
    try {
      const res = await authApi.verifyToken();
      return res.user;
    } catch {
      return false;
    }
  },
};

export default authUtils;
