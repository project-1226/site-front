import { Star } from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Rating,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import Draggable from "react-draggable";
import ImageUploader from "../shop/ImageUploader";
import axios from "axios";
import { deleteObject, ref } from "firebase/storage";
import { storage } from "../../../FirebaseConfig";

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

const labels = {
  1: "나쁨",
  2: "별로",
  3: "보통",
  4: "좋음",
  5: "최고",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const UpdateReview = ({ review }) => {
  const [loading, setLoading] = useState(false);
  const [hover, setHover] = useState(-1);
  const [open, setOpen] = useState(false);

  // console.log(review.images);
  const images = review.images;
  // console.log(images);
  const names = [];
  const urls = [];
  for (const image of images) {
    names.push(image.image_name);
    urls.push(image.image_url);
  }

  const [form, setForm] = useState({
    userid: sessionStorage.getItem("userid"),
    productid: review.productid,
    score: review.score,
    content: review.content,
    image_urls: urls.join(","),
  });

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const { score, content, image_urls } = form;

  const uploaderRef = useRef(null);

  const onSubmit = async () => {
    setLoading(true);
    try {
      const [imageNames, uploadedURLs] = await uploaderRef.current.onUpload();
      if (uploadedURLs) {
        setForm({
          userid: sessionStorage.getItem("userid"),
          productid: review.productid,
          score,
          content,
          image_names: imageNames.join(","),
          image_urls: uploadedURLs.join(","),
        });
      }
      //   await axios.post("/product-review/update", form);
      setLoading(false);
      alert("리뷰가 등록되었습니다.");
      window.location.href = "/mp/mprch";
    } catch (error) {
      setLoading(false);
      console.log("insert review:", error);
      alert("리뷰 등록이 실패하였습니다.\n관리자에게 문의해주세요.");
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onPrevImageDelete = async () => {
    const imageRef = ref(storage, `images/${review}`);
    await deleteObject(imageRef).catch((error) => {
      console.error("Error - delete imagefile:", error);
    });
  };

  return (
    <>
      <Button variant="contained" size="small" onClick={handleClickOpen}>
        수정
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        fullWidth
        maxWidth="md"
      >
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <DialogTitle component="h6" sx={{ fontWeight: "bolder", ml: 1.7 }}>
          리뷰 수정
        </DialogTitle>
        <DialogContent>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableBody>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                  }}
                >
                  <TableCell width={150}>
                    <img
                      src="http://via.placeholder.com/500x500"
                      alt="product"
                    />
                  </TableCell>
                  <TableCell>
                    <Stack spacing={1}>
                      <Typography variant="h6" sx={{ fontWeight: "bolder" }}>
                        {review.name}
                      </Typography>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Rating
                          name="hover-feedback"
                          value={score}
                          precision={1}
                          size="large"
                          getLabelText={getLabelText}
                          onChange={onChange}
                          onChangeActive={(event, newHover) => {
                            setHover(newHover);
                          }}
                          emptyIcon={
                            <Star
                              style={{ opacity: 0.55 }}
                              fontSize="inherit"
                            />
                          }
                        />
                        {score !== null && (
                          <Box sx={{ ml: 2 }}>
                            {labels[hover !== -1 ? hover : score]}
                          </Box>
                        )}
                      </Stack>
                    </Stack>
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                  }}
                >
                  <TableCell width={150} sx={{ verticalAlign: "top" }}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: "bolder",
                        mt: 0.5,
                        ml: 0.5,
                      }}
                    >
                      상세 리뷰
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <TextField
                      id="outlined-multiline-static"
                      fullWidth
                      multiline
                      rows={4}
                      placeholder="다른 고객님에게 도움이 되도록 상품에 대한 솔직한 평가를 남겨주세요."
                      name="content"
                      value={content}
                      onChange={onChange}
                      sx={{ mt: 0.5, mb: 2 }}
                    />
                    <Typography variant="caption" color="grey">
                      상품 품질과 관계없는 내용은 비공개 처리될 수 있습니다.
                      <br />
                      작성된 리뷰는 삭제 전까지 '상품 리뷰'에 공개되고, 'My 활동
                      {" > "}
                      활동 내역 {">"} 리뷰'에서 수정 및 삭제가 가능합니다.
                    </Typography>
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                  }}
                >
                  <TableCell width={150} sx={{ verticalAlign: "top" }}>
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: "bolder",
                        mt: 0.5,
                        ml: 0.5,
                      }}
                    >
                      사진 수정
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <ImageUploader ref={uploaderRef} urls={urls} />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions sx={{ mr: 2, mb: 2 }}>
          <Button variant="contained" onClick={onSubmit}>
            수정
          </Button>
          <Button variant="outlined" autoFocus onClick={handleClose}>
            취소
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UpdateReview;
