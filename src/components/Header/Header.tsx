import { css } from "@emotion/css";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SpeakerNotesOffIcon from "@mui/icons-material/SpeakerNotesOff";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import {
  Box,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { Form, Formik } from "formik";
import React, { FC } from "react";
import * as yup from "yup";

import useWidgetChat from "../../store/widget-chat";
import useWidgetStore from "../../store/widget-store";
import DialogReview from "../DialogComponent/DialogReview";

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

  const {
    reset: resetWidgetChatStore,
    endSession,
    openReview,
    setOpenReview,
  } = useWidgetChat((state) => state);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenModal = async () => {
    await setAnchorEl(null);
    await setOpenReview();
  };
  const handleCloseModal = async () => {
    await setAnchorEl(null);
    await setOpenReview();
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

  const handleEndSession = async () => {
    await setAnchorEl(null);
    await endSession();
    await setOpenReview();
  };

  const dataMenuItem: any = [
    {
      name: "Akhiri percakapan",
      eventMenu: handleEndSession,
      icon: <SpeakerNotesOffIcon fontSize="small" />,
    },
    {
      name: "Hapus riwayat percakapan",
      eventMenu: handleResetWidgetChat,
      icon: <RestartAltIcon fontSize="small" />,
    },
    // {
    //   name: "Review chatbot",
    //   eventMenu: handleOpenModal,
    //   icon: <StarBorderIcon fontSize="small" />,
    // },
  ];

  interface IMenuItem {
    data: any;
  }

  const CMenuItem: FC<IMenuItem> = ({ data }) => (
    <MenuItem onClick={data?.eventMenu}>
      <ListItemIcon>{data?.icon}</ListItemIcon>
      <ListItemText
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: "0.8rem" }}>{data?.name}</span>
      </ListItemText>
    </MenuItem>
  );

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
            {dataMenuItem.map((item: any, idx: number) => (
              <CMenuItem data={item} key={idx} />
            ))}
          </Menu>
        </Box>
      )}
      {/* Dialog Component for review bot */}
      <DialogReview
        title={"Seberapa puaskah kamu dengan layanan chat bot ini?"}
        handleCloseModal={handleCloseModal}
        openModal={openReview}
      />
    </Box>
  );
};

export default Header;
