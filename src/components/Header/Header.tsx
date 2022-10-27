import { css } from "@emotion/css";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Typography } from "@mui/material";
import React, { FC } from "react";

interface IProps {
  onClick: () => void;
  back?: boolean;
  close?: boolean;
}

const Header: FC<IProps> = ({ onClick, back = false, close = false }) => {
  return (
    <Box
      height={"60vh"}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        backgroundColor: "#536BDE",
        borderRadius: "15px",
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
      <Typography color={"white"}>Logo here</Typography>
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
