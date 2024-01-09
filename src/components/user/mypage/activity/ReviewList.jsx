import {
  Backdrop,
  Button,
  Card,
  CardContent,
  CircularProgress,
  ImageList,
  ImageListItem,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

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
    const res = await axios("/product_review/image", {
      params: { product_reviewid: id },
    });
    return res.data;
  };

  const getList = async () => {
    setLoading(true);
    const res = await axios("/product_review/list", {
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
    // console.log(reviews);
    setLoading(false);
  };

  const onDelete = async (e, id) => {
    e.preventDefault();
    if (window.confirm("해당 리뷰를 삭제하시겠습니까?")) {
      // await axios("/product_review/delete");
      alert("해당 리뷰가 삭제되었습니다.");
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <>
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
                        height: "100px",
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
            <Typography variant="body2" color="text.secondary">
              (별점 넣을 자리~~~)
            </Typography>
            <Typography variant="body1">{r.content}</Typography>
            <Stack direction="row" spacing={1} mt={1} justifyContent="end">
              <Button variant="contained" size="small">
                수정
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={(e) => onDelete(e, r.product_reviewid)}
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
    </>
  );
};

export default ReviewList;
