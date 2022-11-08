import ForumIcon from "@mui/icons-material/Forum";
import { Badge, Box } from "@mui/material";
import React, { FC } from "react";

import useWidgetChat from "../../store/widget-chat";
import useWidgetStore from "../../store/widget-store";

interface IProps {
  open: boolean;
  onClick: () => void;
}

const FloatingButton: FC<IProps> = ({ open, onClick }) => {
  const widgetStore = useWidgetStore((state) => state.color);
  const { countNotRead } = useWidgetChat((state) => state);
  return (
    <Box
      sx={{ position: "absolute", bottom: "15px", right: "15px" }}
      onClick={() => onClick()}
    >
      <Badge color="primary" badgeContent={countNotRead}>
        <Box
          component="span"
          sx={{
            bgcolor: `#${widgetStore.primary_color}`,
            width: 65,
            height: 60,
            borderRadius: "34px 8px 34px 34px",
            boxShadow: "0 5px 4px 0 rgb(0 0 0 / 26%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            cursor: "pointer",
            // transform: `translateX(0px) translateY(${positionPopUp}%) translateZ(0px)`,
            transform: `scale(${!open ? 1 : 0})`,
            opacity: !open ? "100%" : "0%",
            zIndex: 3,
            transition: "all 200ms ease-in-out",
          }}
        >
          <ForumIcon sx={{ fontSize: "30px" }} />
        </Box>
      </Badge>
    </Box>
  );
};
export default FloatingButton;
