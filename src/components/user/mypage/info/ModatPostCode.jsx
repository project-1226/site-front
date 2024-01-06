import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  Paper,
} from "@mui/material";
import React, { useState } from "react";
import DaumPostcodeEmbed from "react-daum-postcode";
import Draggable from "react-draggable";

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const ModatPostCode = ({ form, setForm }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onCompleted = (e) => {
    // console.log(e);
    setForm({
      ...form,
      address1: e.zonecode,
      address2: e.buildingName ? `${e.address} (${e.buildingName})` : e.address,
    });
    handleClose();
    // console.log(form);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        주소검색
      </Button>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
      >
        <DialogContent>
          <DialogContentText>
            <DaumPostcodeEmbed onComplete={(e) => onCompleted(e)} />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ModatPostCode;
