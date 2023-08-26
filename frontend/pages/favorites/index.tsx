import Favorites from "@/components/Favorites";
import Layout from "@/components/Layout";
import { userState } from "@/src/state/auth";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";

const favorites = () => {
  // const router = useRouter();
  // const { id }: any = router.query;
  const [user, setUser] = useRecoilState(userState);

  const userId = user.username;
  console.log(userId);

  return (
    <>
      <div>
        <Layout>
          <Box sx={{ padding: "16px", backgroundColor: "#F5F5F5" }}>
            <Favorites userId={userId} />
          </Box>
        </Layout>
      </div>
    </>
  );
};

export default favorites;
