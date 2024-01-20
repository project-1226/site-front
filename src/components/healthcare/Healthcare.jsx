// Healthcare.jsx
import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import HealthcareModal from "./HealthcareModal";
import HealthcareModal2 from "./HealthcareModal2";
import { DataGrid } from "@mui/x-data-grid";
import {
  Backdrop,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  CircularProgress,
  Typography,
  Tabs,
  Tab,
  Box,
} from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import healthcareImage from "../../images/healthcare_img.jpg";
import healthcareImage2 from "../../images/healthcare_img2.jpg";
import axios from "axios";

const Healthcare = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [myExercise, setMyExercise] = useState([]);
  const [value, setValue] = React.useState("one");
  const [hometrainning,setHometrainning] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    { field: "excerciseid", headerName: "Exercise ID", width: 120 },
    { field: "name", headerName: "Name", width: 200 },
    {
      field: "description",
      headerName: "Description",
      width: 400,
    },
    {
      field: "action1",
      headerName: "",
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          // onClick={(e) => isModalOpen2(true)}
        >
          운동영상
        </Button>
      ),
    },
    {
      field: "action2",
      headerName: "AI",
      width: 150,
      renderCell: (params) =>
        params.row.ai == 1 && (
          <Button
            variant="contained"
            color="primary"
            // onClick={(e) => isModalOpen2(true)}
          >
            AI와 운동하기
          </Button>
        ),
    },
  ];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getCategories = async () => {
    try {
      //food페이지에서 카테고리가져오는 api공유
      const res = await axios(`/food/categories/exercise`);
      setCategories(res.data);
      console.log(res.data);
      // const randomIndex = Math.floor(Math.random() * res.data.length);
      // setSelectTag(res.data[randomIndex]);
    } catch (error) {
      console.error("Error fetching tags:", error);
    } finally {
      //카테고리들고와서 하는 내용
    }
  };
  const getMyExercise = async () => {
    setLoading(true);
    const res = await axios(
      `/exercise/myexercises?userid=${sessionStorage.getItem(
        "userid"
      )}&categoryid=${value}`
    );
    console.log(res.data);
    setMyExercise(res.data);
    setLoading(false);
  };

  const getHometrainning=async()=>{
    const res = await axios("/exercise/list?categoryid=58");
    setHometrainning(res.data)
  }
  useEffect(() => {
    getCategories();
    getHometrainning();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  // const handleCloseModal2 = () => {
  //   setIsModalOpen2(false);
  // };
  useEffect(() => {
    getMyExercise();
  }, [value]);

  // //운동영상보러가기 클릭
  // const handleYoutubeClick = (event,row) => {
  //   event.stopPropagation();
  //   console.log('Button clicked for row:', row);
  // };
  // //AI와 운동하기 선택
  // const handleAIClick =(event,row) =>{
  //   event.stopPropagation();
  //   console.log('ai!!!!!!!!Button clicked for row:', row);
  // }

  return (
    <div className="healthcare_wrap">
      <div className="healthcare_main">
        <div className="h_main_title_wrap">
          <p className="h_main_title1">IT DOESN'T GET EASIER.</p>
          <p className="h_main_title2">TOU GET BETTER.</p>
          <p className="h_main_title3">
            MEALJOY의 노력이 현대인들의 삶을 건강하고, 행복하게 바꿉니다.
          </p>
        </div>
      </div>

      <div className="healthcare_contents">
        <section className="select_challenge_wrap">
          <div className="contents_title_box">
            <p className="contents_title_healthcare">챌린지를 선택해주세요!</p>
          </div>

          <div className="challenge_wrap">
            <div className="challenge_box_wrap">
              {categories.slice(0, 4).map((category) => (
                <div
                  className="challenge_box"
                  onClick={() => handleCategoryClick(category)}
                >
                  {" "}
                  #{category.name}{" "}
                </div>
              ))}
            </div>
            <div className="challenge_box_wrap">
              {categories.slice(4, 8).map((category) => (
                <div
                  className="challenge_box"
                  onClick={() => handleCategoryClick(category)}
                >
                  {" "}
                  #{category.name}{" "}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="contents_title_box">
            <p className="contents_title_healthcare">HOME TRAINING</p>
          </div>
          <div className="healthcare_video_wrap">
          {hometrainning?.slice(0, 3).map((h_exercise) => (
              <iframe
                key={h_exercise?.vidioid}
                className="recipe_video"
                src={`https://www.youtube.com/embed/${h_exercise?.vidioid}`}
                title={h_exercise?.name}
                frameBorder="0"
                allowFullScreen
              />
            ))}
          </div>
        </section>

        <section className="healthcare_review_wrap">
          <div className="contents_title_box">
            <p className="contents_title_healthcare"> 오운완 챌린지 </p>
            <p className="contents_subtitle_healthcare">
              {" "}
              챌린지를 도전해 1등을 차지해보세요!{" "}
            </p>
          </div>

          <div className="healthcare_review">
            <Carousel data-bs-theme="dark" interval={null}>
              <Carousel.Item>
                <div className="carousel_imgwrap">
                  <Card sx={{ maxWidth: 345 }} className="healthcare_card">
                    <CardMedia
                      component="img"
                      height="194"
                      image={healthcareImage}
                      alt="오운완"
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        {" "}
                        #오운완{" "}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                    </CardActions>
                  </Card>

                  <Card sx={{ maxWidth: 345 }} className="healthcare_card">
                    <CardMedia
                      component="img"
                      height="194"
                      image={healthcareImage}
                      alt="오운완"
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        {" "}
                        #오운완{" "}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                    </CardActions>
                  </Card>

                  <Card sx={{ maxWidth: 345 }} className="healthcare_card">
                    <CardMedia
                      component="img"
                      height="194"
                      image={healthcareImage}
                      alt="오운완"
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        {" "}
                        #오운완{" "}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                    </CardActions>
                  </Card>

                  <Card sx={{ maxWidth: 345 }} className="healthcare_card">
                    <CardMedia
                      component="img"
                      height="194"
                      image={healthcareImage}
                      alt="오운완"
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        {" "}
                        #오운완{" "}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </div>
              </Carousel.Item>

              <Carousel.Item>
                <div className="carousel_imgwrap">
                  <Card sx={{ maxWidth: 345 }} className="healthcare_card">
                    <CardMedia
                      component="img"
                      height="194"
                      image={healthcareImage2}
                      alt="오운완"
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        {" "}
                        #오운완{" "}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                    </CardActions>
                  </Card>

                  <Card sx={{ maxWidth: 345 }} className="healthcare_card">
                    <CardMedia
                      component="img"
                      height="194"
                      image={healthcareImage2}
                      alt="오운완"
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        {" "}
                        #오운완{" "}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                    </CardActions>
                  </Card>

                  <Card sx={{ maxWidth: 345 }} className="healthcare_card">
                    <CardMedia
                      component="img"
                      height="194"
                      image={healthcareImage2}
                      alt="오운완"
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        {" "}
                        #오운완{" "}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                    </CardActions>
                  </Card>

                  <Card sx={{ maxWidth: 345 }} className="healthcare_card">
                    <CardMedia
                      component="img"
                      height="194"
                      image={healthcareImage2}
                      alt="오운완"
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        {" "}
                        #오운완{" "}
                      </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                      <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                      </IconButton>
                      <IconButton aria-label="share">
                        <ShareIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </div>
              </Carousel.Item>
            </Carousel>
          </div>
        </section>
      </div>
      <HealthcareModal
        show={isModalOpen}
        handleClose={handleCloseModal}
        selectedCategory={selectedCategory}
        page={0}
      />
      {/* <HealthcareModal2 show={isModalOpen2} handleClose={handleCloseModal2} selectedCategory={selectedCategory} /> */}
    </div>
  );
};

export default Healthcare;
