import { css } from "@emotion/css";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import SendIcon from "@mui/icons-material/Send";
import { Box, Input, Stack, Tooltip } from "@mui/material";
import React from "react";

const ChatComponent = () => {
  return (
    <Box sx={{ minHeight: "10%", backgroundColor: "white" }}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        spacing={2}
        alignItems={"center"}
        sx={{ paddingX: "20px", paddingY: "3px", height: "100%" }}
      >
        <Tooltip title="Attach file">
          <div
            className={css`
              cursor: pointer;
              color: red;
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 90px;
              width: 30px;
              height: 30px;
              transition: 0.3s;
              &:hover {
                color: grey;
              }
            `}
          >
            <AttachFileIcon fontSize="small" />
          </div>
        </Tooltip>
        <Input multiline maxRows={5} sx={{ width: "90%" }} />
        <Tooltip title="Kirim">
          <div
            className={css`
              cursor: pointer;
              color: red;
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 90px;
              width: 30px;
              height: 30px;
              transition: 0.3s;
              &:hover {
                color: grey;
              }
            `}
          >
            <SendIcon fontSize="small" />
          </div>
        </Tooltip>
      </Stack>
    </Box>
  );
};

export default ChatComponent;
