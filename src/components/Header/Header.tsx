import { css } from "@emotion/css";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import {
  Box,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import React, { FC } from "react";

import useWidgetChat from "../../store/widget-chat";
import useWidgetStore from "../../store/widget-store";
import DialogComponent from "../DialogComponent";

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

  const [openModal, setOpenModal] = React.useState<boolean>(false);

  const handleOpenModal = async () => {
    await setAnchorEl(null);
    await setOpenModal(true);
  };
  const handleCloseModal = async () => {
    await setAnchorEl(null);
    await setOpenModal(false);
  };

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
      }}
    >
      {back && (
        <Box sx={{ position: "absolute", left: "20px" }}>
          <Tooltip title="Kembali">
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
          </Tooltip>
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
          <Tooltip title="Tutup">
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
          </Tooltip>
        </Box>
      )}
      {option && (
        <Box sx={{ position: "absolute", top: "20px", left: "20px" }}>
          <Tooltip title="Menu">
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
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <MenuIcon fontSize="small" />
            </div>
          </Tooltip>
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
              <ListItemIcon>
                <RestartAltIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: "0.8rem" }}>
                  Hapus Riwayat Percakapan
                </span>
              </ListItemText>
            </MenuItem>
            <MenuItem onClick={handleOpenModal}>
              <ListItemIcon>
                <StarBorderIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                sx={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                }}
              >
                <span style={{ fontSize: "0.8rem" }}>Review chatbot</span>
              </ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      )}
      <DialogComponent
        title="Seberapa puaskah kamu dengan layanan chat bot ini?"
        openModal={openModal}
        handleCloseModal={() => handleCloseModal()}
      >
        <p>
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </p>
      </DialogComponent>
    </Box>
  );
};

export default Header;
