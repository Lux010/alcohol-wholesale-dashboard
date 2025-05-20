// src/contexts/ConfirmationContext.js
import { createContext, useContext, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

const ConfirmationContext = createContext();

export const ConfirmationProvider = ({ children }) => {
  const [confirmation, setConfirmation] = useState({
    open: false,
    title: "",
    message: "",
    onConfirm: () => {},
  });

  const showConfirmation = (title, message, onConfirm) => {
    setConfirmation({
      open: true,
      title,
      message,
      onConfirm,
    });
  };

  const handleClose = () => {
    setConfirmation((prev) => ({ ...prev, open: false }));
  };

  return (
    <ConfirmationContext.Provider value={{ showConfirmation }}>
      {children}
      <Dialog
        open={confirmation.open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{confirmation.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {confirmation.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              confirmation.onConfirm();
              handleClose();
            }}
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </ConfirmationContext.Provider>
  );
};

export const useConfirmation = () => useContext(ConfirmationContext);
