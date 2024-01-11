import {
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  ImageList,
  ImageListItem,
  Pagination,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { storage } from "../../../../FirebaseConfig";
import { ref, deleteObject } from "firebase/storage";
import UpdateReview from "./UpdateReview";

const ReviewList = () => {
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [total, setTotal] = useState(0);

  const size = 5;
  const [page, setPage] = useState(1);
  const handleChange = (e, value) => {
    e.preventDefault();
    setPage(value);
  };

  const getImage = async (id) => {
    const res = await axios("/product-review/image", {
      params: { product_reviewid: id },
    });
    return res.data;
  };

  const getList = async () => {
    setLoading(true);
    const res = await axios("/product-review/list", {
      params: { userid: sessionStorage.getItem("userid"), page, size },
    });
    setTotal(res.data.total);

    const list = res.data.list;
    const data = [];
    for (const review of list) {
      const imageData = await getImage(review.product_reviewid);
      const reviewWithImages = {
        ...review,
        images: imageData,
      };
      data.push(reviewWithImages);
    }
    setReviews(data);
    setLoading(false);
  };

  const onDelete = async (e, product_reviewid, images) => {
    e.preventDefault();
    // console.log(images);
    if (window.confirm("해당 리뷰를 삭제하시겠습니까?")) {
      try {
        setLoading(true);
        if (images) {
          for (const i of images) {
            // console.log(i.image_name);
            const imageRef = ref(storage, `images/review/${i.image_name}`);
            await deleteObject(imageRef).catch((error) => {
              console.error("Error - delete imagefile:", error);
            });
          }
        }
        await axios.delete("/product-review/delete", {
          params: { product_reviewid },
        });
        setLoading(false);
        alert("해당 리뷰가 삭제되었습니다.");
        getList();
      } catch (error) {
        console.error("Error - delete review:", error);
        alert("리뷰 삭제가 실패하였습니다.\n관리자에게 문의해주세요!");
      }
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        typography: "body1",
        bgcolor: "transparent",
        py: 4.5,
        pr: 3,
      }}
    >
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: "bolder" }}>
        리뷰 ({total})
      </Typography>
      {reviews.map((r) => (
        <Card key={r.product_reviewid} sx={{ my: 3 }}>
          <CardContent>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: "bolder" }}
              flexGrow="1"
            >
              {r.name} / {r.count}개
            </Typography>
            <ImageList cols={5} gap={10} sx={{ mt: 1 }}>
              {r.images.map((i) => (
                <ImageListItem key={i.imageid}>
                  {i.image_url !== "" && (
                    <img
                      src={i.image_url}
                      alt={"리뷰 이미지"}
                      style={{
                        height: "130px",
                        objectFit: "cover",
                        marginRight: "10px",
                      }}
                    />
                  )}
                </ImageListItem>
              ))}
            </ImageList>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontStyle: "italic", mb: 2 }}
            >
              {r.fmtdate}
            </Typography>
            <Stack spacing={1.5}>
              <Typography variant="body2" color="text.secondary">
                <Rating value={r.score} readOnly />
              </Typography>
              <Typography variant="body1">{r.content}</Typography>
            </Stack>
            <Stack direction="row" spacing={1} mt={1} justifyContent="end">
              <UpdateReview review={r} />
              <Button
                variant="outlined"
                size="small"
                onClick={(e) => onDelete(e, r.product_reviewid, r.images)}
              >
                삭제
              </Button>
            </Stack>
          </CardContent>
        </Card>
      ))}
      <Stack justifyContent="center">
        <Pagination
          count={Math.ceil(total / size)}
          shape="rounded"
          color="primary"
          page={page}
          sx={{ marginBottom: 5 }}
          onChange={handleChange}
        />
      </Stack>
    </Box>
  );
};

export default ReviewList;
