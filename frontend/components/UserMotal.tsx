import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Modal from "@mui/material/Modal";
import LogoutIcon from "@mui/icons-material/Logout";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#F6F6F6",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  color: "#8E8E8E",
  cursor: "pointer",
};

export default function UserModal({ user }: any) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSignOut = async () => {
    try {
      localStorage.removeItem("token");
      window.location.reload();
    } catch (error) {
      console.log(error, "error");
    }
  };

  return (
    <div>
      <Button
        sx={{ color: "#252525", fontSize: "20px", cursor: "pointer" }}
        onClick={handleOpen}
      >
        {user.username}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography>
            <FavoriteBorderOutlinedIcon />
            FAVORITES
          </Typography>
          <Typography onClick={handleSignOut}>
            <LogoutIcon />
            SIGN OUT
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
