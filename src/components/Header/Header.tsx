import { css } from "@emotion/css";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Menu, MenuItem } from "@mui/material";
import React, { FC } from "react";

import useWidgetChat from "../../store/widget-chat";
import useWidgetStore from "../../store/widget-store";

interface IProps {
  onClick: () => void;
  back?: boolean;
  close?: boolean;
  option?: boolean;
}

const Header: FC<IProps> = ({
  onClick,
  back = false,
  close = false,
  option = false,
}) => {
  const {
    logo,
    color,
    reset: resetWidgetStore,
  } = useWidgetStore((state) => state);

  const { reset: resetWidgetChatStore } = useWidgetChat((state) => state);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClickOptions = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseOptions = () => {
    setAnchorEl(null);
  };

  const handleResetWidgetChat = async () => {
    await setAnchorEl(null);
    await resetWidgetChatStore();
    await resetWidgetStore();
  };

  return (
    <Box
      height={"70px"}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        backgroundColor: `#${color.primary_color}`,
        // zIndex: 2,
      }}
    >
      {back && (
        <Box sx={{ position: "absolute", left: "20px" }}>
          <div
            className={css`
              cursor: pointer;
              background-color: black;
              color: white;
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 90px;
              width: 30px;
              height: 30px;
              transition: 0.3s;
              &:hover {
                background-color: grey;
              }
            `}
            onClick={() => onClick()}
          >
            <CloseIcon fontSize="small" />
          </div>
        </Box>
      )}
      <img
        src={`${logo}?w=164&h=164&fit=crop&auto=format`}
        srcSet={`${logo}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
        alt={`${logo}asd`}
        loading="lazy"
        className={css`
          height: 30px;
          width: 30px;
        `}
      />
      {close && (
        <Box sx={{ position: "absolute", top: "20px", right: "20px" }}>
          <div
            className={css`
              cursor: pointer;
              // background-color: black;
              color: white;
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 90px;
              width: 30px;
              height: 30px;
              transition: 0.3s;
              &:hover {
                background-color: grey;
              }
            `}
            onClick={() => onClick()}
          >
            <CloseIcon fontSize="small" />
          </div>
        </Box>
      )}
      {option && (
        <Box sx={{ position: "absolute", top: "20px", left: "20px" }}>
          <div
            className={css`
              cursor: pointer;
              // background-color: black;
              color: white;
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 90px;
              width: 30px;
              height: 30px;
              transition: 0.3s;
              &:hover {
                background-color: grey;
              }
            `}
            onClick={(e: any) => handleClickOptions(e)}
          >
            <MenuIcon fontSize="small" />
          </div>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseOptions}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleResetWidgetChat}>
              Hapus Riwayat Percakapan
            </MenuItem>
            <MenuItem onClick={handleCloseOptions}>Review chatbot</MenuItem>
          </Menu>
        </Box>
      )}
    </Box>
  );
};

export default Header;
