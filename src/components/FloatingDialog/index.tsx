import { css } from "@emotion/css";
import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton } from "@mui/material";
import React, { FC } from "react";

import useWidgetStore from "../../store/widget-store";

interface IProps {
  open: boolean;
  onClick: () => void;
}

const FloatingDialog: FC<IProps> = ({ open, onClick }) => {
  const widgetStore = useWidgetStore((state) => state.color);
  return (
    <>
      <Box
        bgcolor="#fffff"
        borderRadius="22px 8px 8px 22px"
        width="10rem"
        height="5rem"
        display="flex"
        alignItems="center"
        justifyContent="center"
        color="black"
        position="absolute"
        bottom="90px"
        right="15px"
        fontSize={"14px"}
        padding="10px 10px"
        sx={{
          boxShadow: "-1px 0px 11px -2px rgba(0,0,0,0.81)",
          WebkitBoxShadow: "-1px 0px 11px -2px rgba(0,0,0,0.81)",
          MozBoxShadow: "-1px 0px 11px -2px rgba(0,0,0,0.81)",
          transform: `scale(${open ? 1 : 0})`,
          opacity: open ? "100%" : "0%",
          transition: "all 200ms ease-in-out",
        }}
      >
        Hi!
        <br />
        Bagaimana bot dapat membantu kamu?
      </Box>

      <div
        className={css`
          cursor:pointer;
          position: absolute;
          right: 2px;
          bottom: 170px;
          background-color: #${widgetStore.primary_color};
          color: white;
          display:flex;
          justify-content:center;
          align-items:center;
          border-radius:90px;
          width:30px;
          height:30px;
          transform: scale(${open ? 1 : 0});
          opacity: open ? "100%" : "0%";
          transition: 0.3s;
          &:hover {
            background-color: grey;
          }
          `}
        onClick={() => onClick()}
      >
        <CloseIcon fontSize="small" />
      </div>
    </>
  );
};

export default FloatingDialog;
