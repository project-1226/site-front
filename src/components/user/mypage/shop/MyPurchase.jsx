import { SearchRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MyPurchase = () => {
  const [selectedChip, setSelectedChip] = useState(null);
  const navi = useNavigate();

  const onClickReview = () => {
    navi("/mp/revw");
  };

  const handleChipClick = (index) => {
    setSelectedChip(index);
  };

  const onSearch = () => {
    alert("검색!");
  };
  return (
    <Box sx={{ width: "100%", bgcolor: "transparent", py: 5, pr: 3 }}>
      <Typography variant="h6" gutterBottom sx={{ fontWeight: "bolder" }}>
        주문목록
      </Typography>
      <TextField
        label="주문상품"
        placeholder="주문한 상품을 검색할 수 있어요!"
        sx={{ width: "65%", mt: 2 }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={onSearch}>
                <SearchRounded />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
        <Chip
          label="6개월 내"
          size="small"
          color={selectedChip === 0 ? "primary" : "default"}
          variant={selectedChip === 0 ? "filled" : "outlined"}
          onClick={() => handleChipClick(0)}
        />
        <Chip
          label="2024"
          size="small"
          color={selectedChip === 1 ? "primary" : "default"}
          variant={selectedChip === 1 ? "filled" : "outlined"}
          onClick={() => handleChipClick(1)}
        />
        <Chip
          label="2023"
          size="small"
          color={selectedChip === 2 ? "primary" : "default"}
          variant={selectedChip === 2 ? "filled" : "outlined"}
          onClick={() => handleChipClick(2)}
        />
      </Stack>
      <Card sx={{ minWidth: 275, mt: 2 }}>
        <CardContent>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: "bolder", ml: 1, mb: 1 }}
          >
            날짜
          </Typography>
          <Card variant="outlined">
            <Stack direction="row">
              <CardContent sx={{ flex: 1 }}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ fontWeight: "bolder", mb: 1 }}
                >
                  배송완료
                </Typography>
                <Stack direction="row" spacing={3}>
                  <CardMedia
                    component="img"
                    alt="product"
                    src="http://via.placeholder.com/500x500"
                    sx={{ width: 82 }}
                  />
                  <Stack>
                    <Typography sx={{ mb: 1.5 }} color="text">
                      상품명
                    </Typography>
                    <Typography variant="body2">가격 / 수량</Typography>
                  </Stack>
                </Stack>
              </CardContent>
              <Divider orientation="vertical" />
              <CardContent sx={{ width: 170, alignSelf: "center", pt: 3 }}>
                <Stack spacing={1}>
                  <Button variant="outlined" size="small" fullWidth>
                    배송조회
                  </Button>
                  <Button variant="outlined" size="small" fullWidth>
                    교환, 반품 신청
                  </Button>
                  <Button
                    variant="outlined"
                    size="small"
                    fullWidth
                    onClick={onClickReview}
                  >
                    리뷰 작성하기
                  </Button>
                </Stack>
              </CardContent>
            </Stack>
          </Card>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MyPurchase;
