import authApi from "@/pages/api/authApi";

const authUtils = {
  // JWTチェック
  isAuthenticated: async () => {
    // ユーザーが持っているjwtを取得する
    const token = localStorage.getItem("token");
    if (!token) return false;

    // JWTが存在している場合の処理
    try {
      const res = await authApi.verifyToken();
      // 中身があれば、jwtの中に含んだユーザー情報を返す
      return res.user;
    } catch {
      return false;
    }
  },
};

export default authUtils;
