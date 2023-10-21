import React from "react";
import DesktopLaptop from "./DesktopLaptop";
import MobileTablet from "./MobileTablet";
import useMediaQuery from "@mui/material/useMediaQuery";
import theme from "@/src/theme/theme";

const Header = () => {
  const isMobileMode = useMediaQuery(theme.breakpoints.down("lg"));
  return <>{isMobileMode ? <MobileTablet /> : <DesktopLaptop />}</>;
};

export default Header;
