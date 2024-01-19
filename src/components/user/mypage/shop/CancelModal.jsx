import {
  Button,
  Card,
  Checkbox,
  Dialog,
  DialogContent,
  DialogContentText,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
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

const CancelModal = ({ purchaseid }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [list, setList] = useState([]);
  const [content, setContent] = useState("");
  const [contents, setContents] = useState([]);

  useEffect(() => {
    setContents(list.map(() => ""));
  }, [list]);

  const updateContent = (index, value) => {
    setContents((prevContents) => {
      const newContents = [...prevContents];
      newContents[index] = value;
      return newContents;
    });
  };

  const handleClickOpen = () => {
    const invalidItems = list.filter((l) => {
      const regdate = new Date(l.regdate);
      const currentDate = new Date();
      const daysDifference = Math.floor(
        (currentDate - regdate) / (1000 * 60 * 60 * 24)
      );
      return daysDifference >= 7;
    });

    if (invalidItems.length > 0) {
      alert(
        "신선/냉장/냉동 식품은 제품의 특성으로 인해 배송 완료일로부터\n7일이 경과한 후에는 반품 신청이 불가능합니다."
      );
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getList = async () => {
    setLoading(true);
    const res = await axios("/usershop/read-detail", {
      params: {
        purchaseid,
      },
    });
    const data = res.data.map((l) => l && { ...l, checked: false });
    setList(data);
    setLoading(false);
  };

  const onChangeChecked = (e, id) => {
    const data = list.map((l) =>
      l.purchasedetailid === id ? { ...l, checked: e.target.checked } : l
    );
    setList(data);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const postData = [];
    list.forEach((l, index) => {
      l.checked &&
        postData.push({
          purchasedetailid: l.purchasedetailid,
          content: contents[index],
        });
    });
    console.log(postData);

    for (const data of postData) {
      await axios.post("/usershop/return/insert", data);
    }
    alert("반품 신청이 정상적으로 접수되었습니다.");
    handleClose();
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      <Button
        variant="outlined"
        size="small"
        fullWidth
        onClick={handleClickOpen}
      >
        반품 신청
      </Button>
      <Dialog
        fullWidth
        maxWidth="md"
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
      >
        <DialogContent>
          <form onSubmit={onSubmit}>
            <Card sx={{ mb: 2, p: 2 }}>
              <DialogContentText>
                {list.map((l, index) => (
                  <Stack key={l.purchasedetailid}>
                    <Stack
                      direction="row"
                      spacing={2}
                      my={2}
                      alignItems="center"
                    >
                      <Checkbox
                        checked={l.checked}
                        onChange={(e) => onChangeChecked(e, l.purchasedetailid)}
                      />
                      <img src={l.image_url} width="40" />
                      <div>
                        {l.name} ({l.fmtprice}원 / {l.count}개)
                      </div>
                    </Stack>
                    {l.checked && (
                      <TextField
                        label="반품 사유"
                        value={contents[index]}
                        sx={{ width: "93%", ml: 7 }}
                        onChange={(e) => updateContent(index, e.target.value)}
                      />
                    )}
                  </Stack>
                ))}
              </DialogContentText>
            </Card>

            <Button fullWidth variant="contained" type="submit">
              반품 신청
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CancelModal;
