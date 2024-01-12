import { Star } from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Paper,
  Rating,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import ImageUploader from "./ImageUploader";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

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

const InsertReview = () => {
  const [loading, setLoading] = useState(false);
  const [score, setScore] = useState(0);
  const [hover, setHover] = useState(-1);
  const [content, setContent] = useState("");

  const location = useLocation();
  const itemInfo = location.state;
  const navi = useNavigate();

  console.log(itemInfo);

  let form = {
    userid: sessionStorage.getItem("userid"),
    productid: itemInfo.productid,
    score,
    content,
    purchasedetailid: itemInfo.purchasedetailid,
    image_names: "",
    image_urls: "",
  };

  // 자식 컴포넌트 함수 호출!!!
  const uploaderRef = useRef(null);
  const onSubmit = async () => {
    setLoading(true);

    try {
      const [imageNames, uploadedURLs] = await uploaderRef.current.onUpload();
      // console.log(uploadedURLs);
      if (uploadedURLs) {
        form = {
          userid: sessionStorage.getItem("userid"),
          productid: itemInfo.productid,
          score,
          content,
          purchasedetailid: itemInfo.purchasedetailid,
          image_names: imageNames.join(","),
          image_urls: uploadedURLs.join(","),
        };
        // console.log(form);
      }
      await axios.post("/product-review/insert", form);
      setLoading(false);
      alert("리뷰가 등록되었습니다.");
      window.location.href = "/mp/ract";
    } catch (error) {
      setLoading(false);
      console.log("insert review:", error);
      alert("리뷰 등록이 실패하였습니다.\n관리자에게 문의해주세요.");
    }
  };

  const onCancel = () => {
    navi(sessionStorage.getItem("path"));
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "transparent", py: 5, pr: 3 }}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: "bolder" }}>
        리뷰 작성
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={2}>
                <Typography variant="body1">
                  이 상품에 얼마나 만족하시나요?
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": {
                  border: 0,
                },
              }}
            >
              <TableCell width={150}>
                <img src={itemInfo.image_url} alt="product" />
              </TableCell>
              <TableCell>
                <Stack spacing={1}>
                  <Typography variant="h6" sx={{ fontWeight: "bolder" }}>
                    {itemInfo.name}
                  </Typography>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Rating
                      name="hover-feedback"
                      value={score}
                      precision={1}
                      size="large"
                      getLabelText={getLabelText}
                      onChange={(event, newValue) => {
                        setScore(newValue);
                      }}
                      onChangeActive={(event, newHover) => {
                        setHover(newHover);
                      }}
                      emptyIcon={
                        <Star style={{ opacity: 0.55 }} fontSize="inherit" />
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
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
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
                  사진 첨부
                </Typography>
              </TableCell>
              <TableCell>
                <ImageUploader ref={uploaderRef} />
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                "&:last-child td, &:last-child th": {
                  border: 0,
                },
              }}
            >
              <TableCell colSpan={2} sx={{ textAlign: "center" }}>
                <Button variant="contained" sx={{ mr: 2 }} onClick={onSubmit}>
                  리뷰 등록
                </Button>
                <Button variant="outlined" onClick={onCancel}>
                  등록 취소
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default InsertReview;
