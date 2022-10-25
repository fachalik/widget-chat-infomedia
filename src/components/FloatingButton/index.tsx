import ForumIcon from "@mui/icons-material/Forum";
import { Box } from "@mui/material";
import React, { FC } from "react";

interface IProps {
  open: boolean;
  onClick: () => void;
}

const FloatingButton: FC<IProps> = ({ open, onClick }) => {
  return (
    <Box
      bgcolor="#12344D"
      borderRadius="34px 8px 34px 34px"
      boxShadow="0 5px 4px 0 rgb(0 0 0 / 26%)"
      width="65px"
      height="60px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      color="#fff"
      position="absolute"
      bottom="15px"
      right="15px"
      sx={{
        cursor: "pointer",
        // transform: `translateX(0px) translateY(${positionPopUp}%) translateZ(0px)`,
        transform: `scale(${open ? 1 : 0})`,
        transition: "transform 200ms ease-in-out",
      }}
      onClick={() => onClick()}
    >
      <ForumIcon sx={{ fontSize: "35px" }} />
    </Box>
  );
};
export default FloatingButton;
