import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import React, { FC } from "react";

interface IProps {
  title: string;
  openModal: boolean;
  handleCloseModal: () => void;
  children: JSX.Element;
  showAction?: boolean;
}

const DialogComponent: FC<IProps> = ({
  title,
  openModal,
  children,
  showAction = false,
  handleCloseModal,
}) => {
  return (
    <Dialog open={openModal} onClose={handleCloseModal} hideBackdrop>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      {showAction && (
        <DialogActions>
          <Button onClick={handleCloseModal}>Disagree</Button>
          <Button onClick={handleCloseModal}>Agree</Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default DialogComponent;
