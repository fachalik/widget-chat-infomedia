import { css } from "@emotion/css";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";
import React, { FC } from "react";

import useWidgetStore from "../..//store/widget-store";

interface IProps {
  onClick: () => void;
  back?: boolean;
  close?: boolean;
}

const Header: FC<IProps> = ({ onClick, back = false, close = false }) => {
  const { logo, color } = useWidgetStore((state) => state);
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
    </Box>
  );
};

export default Header;
