import {
  Backdrop,
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
<<<<<<< HEAD:src/components/user/mypage/activity/ReviewList.jsx
import React, { useEffect, useState } from "react";
import { storage } from "../../../FirebaseConfig";
import { ref, deleteObject } from "firebase/storage";
=======
import { deleteObject, ref } from "firebase/storage";
import React, { useEffect } from "react";
import { useState } from "react";
import { storage } from "../../../../FirebaseConfig";
>>>>>>> f09192c53c8520a72d029fc8a112a42896814ccb:src/components/user/mypage/activity/ReviewAfterList.jsx
import UpdateReview from "./UpdateReview";

const ReviewAfterList = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);

  const size = 5;
  const [page, setPage] = useState(1);
  const handleChange = (e, value) => {
    e.preventDefault();
    setPage(value);
  };

  const getList = async () => {
    setLoading(true);
    const res = await axios("/product-review/list", {
      params: { userid: sessionStorage.getItem("userid"), page, size },
    });
    setTotal(res.data.total);

    const list_prev = res.data.list;
    const data = [];
    for (const review of list_prev) {
      const imageData = await axios("/product-review/image", {
        params: { product_reviewid: review.product_reviewid },
      });
      // console.log("이미지데이타 : ", imageData.data);
      const reviewWithImages = {
        ...review,
        images: imageData.data,
      };
      data.push(reviewWithImages);
    }
    setList(data);
    // console.log(list);
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
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {list.map((l) => (
        <Card key={l.product_reviewid} sx={{ my: 3 }}>
          <CardContent>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: "bolder" }}
              flexGrow="1"
            >
              {l.name} / {l.count}개
            </Typography>
            <ImageList cols={5} gap={10} sx={{ mt: 1 }}>
              {l.images.map((i) => (
                <ImageListItem key={i.imageid}>
                  <img
                    src={i.image_url}
                    alt={"리뷰 이미지"}
                    style={{
                      height: "130px",
                      objectFit: "cover",
                      marginRight: "10px",
                    }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ fontStyle: "italic", mb: 2 }}
            >
              {l.fmtdate}
            </Typography>
            <Stack spacing={1.5}>
              <Typography variant="body2" color="text.secondary">
                <Rating value={l.score} readOnly />
              </Typography>
              <Typography variant="body1">{l.content}</Typography>
            </Stack>
            <Stack direction="row" spacing={1} mt={1} justifyContent="end">
              <UpdateReview review={l} />
              <Button
                variant="outlined"
                size="small"
                onClick={(e) => onDelete(e, l.product_reviewid, l.images)}
              >
                삭제
              </Button>
            </Stack>
          </CardContent>
        </Card>
      ))}

      {total == 0 ? (
        <Typography>작성된 리뷰가 없습니다.</Typography>
      ) : (
        <Pagination
          count={Math.ceil(total / size)}
          shape="rounded"
          color="primary"
          page={page}
          sx={{ marginBottom: 5 }}
          onChange={handleChange}
        />
      )}
    </>
  );
};

export default ReviewAfterList;
