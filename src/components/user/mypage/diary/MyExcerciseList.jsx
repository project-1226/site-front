// Healthcare.jsx
import React, { useState, useEffect } from "react";
import HealthcareModal from "../../../healthcare/HealthcareModal";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Tab, Box } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import axios from "axios";

const MyExcerciseList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [myExercise, setMyExercise] = useState([]);
  const columns = [
    { field: "name", headerName: "Name", width: 200 },
    {
      field: "description",
      headerName: "Description",
      width: 400,
    },
    {
      field: "action1",
      headerName: "운동영상",
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
  const [value, setValue] = React.useState("one");
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
    const res = await axios(
      `/exercise/myexercises?userid=${sessionStorage.getItem(
        "userid"
      )}&categoryid=${value}`
    );
    console.log(res.data);
    setMyExercise(res.data);
  };

  useEffect(() => {
    getCategories();
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

  return (
    <>
      <div className="healthcare_wrap">
        {/* 내가선택한 운동 리스트  */}

        <Box
          sx={{
            width: "100%",
            typography: "body1",
            bgcolor: "transparent",
          }}
        >
          <TabContext value={value}>
            <Box>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                {categories.map((category) => (
                  <Tab value={category.categoryid} label={category.name} />
                ))}
              </TabList>
            </Box>
            <TabPanel value={value}>
              {myExercise.length == 0 ? (
                <div>
                  <h6>해당 카테고리에 선택한 운동이 없습니다</h6>
                </div>
              ) : (
                <DataGrid
                  rows={myExercise}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 },
                    },
                  }} // 한 페이지당 보이는 행 수 설정
                  pageSizeOptions={[5, 10]}
                  getRowId={(row) => row.excerciseid}
                />
              )}
            </TabPanel>
          </TabContext>
        </Box>

        <HealthcareModal
          show={isModalOpen}
          handleClose={handleCloseModal}
          selectedCategory={selectedCategory}
        />
      </div>
    </>
  );
};

export default MyExcerciseList;
