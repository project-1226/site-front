import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";

const HealthcareModal = ({ show, handleClose, selectedCategory, page }) => {
  const [exercise, setExercise] = useState([]);
  const [showPage, setShowPage] = useState(page);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectState, setSelectState] = useState("");
  //여기에 내가선택한 운동들을 가져옴 해당 요소마다 excerciseid정보가 들어있음
  const [myExercise, setMyExercise] = useState([]);
  const text = "";
  //table설정
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
          onClick={(e) => handleYoutubeClick(e, params.row)}
        >
          운동영상 보러가기
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
            onClick={(e) => handleAIClick(e, params.row)}
          >
            AI와 운동하기
          </Button>
        ),
    },
  ];
  //이미저장되어있는 excerciseid들을 가져오기
  const getMyExercise = async () => {
    const res = await axios(
      `/exercise/myexercises?userid=${sessionStorage.getItem(
        "userid"
      )}&categoryid=${selectedCategory.categoryid}`
    );
    console.log(res.data);
    setMyExercise(res.data);
  };

  //카테고리별 운동들고오기
  const getExerciseList = async () => {
    console.log(selectedCategory.categoryid);
    const res = await axios(
      `/exercise/list?categoryid=${selectedCategory.categoryid}`
    );
    //console.log(res.data);
    setExercise(res.data);
  };

  //운동영상보러가기 클릭
  const handleYoutubeClick = (event, row) => {
    event.stopPropagation();
    setShowPage(1);
    console.log("Button clicked for row:", row);
  };
  //AI와 운동하기 선택
  const handleAIClick = (event, row) => {
    event.stopPropagation();
    setShowPage(2);
    console.log("ai!!!!!!!!Button clicked for row:", row);
  };

  //각행 운동선택했을때
  const onRowsSelectionHandler = (ids) => {
    //사용자정보
    const userid = sessionStorage.getItem("userid");

    const selectedRowsData = ids.map((id) => {
      const selectedRow = exercise.find((row) => row.excerciseid === id);
      return {
        ...selectedRow,
        userid,
      };
    });

    setSelectedRows(selectedRowsData);
    console.log(selectedRows);
    if (selectedRowsData.length === 0) {
      setSelectState("선택한 운동이 없습니다.");
    } else {
      setSelectState("");
    }
  };
  //저장하기버튼 눌렀을때
  const handleSaveClick = async () => {
    console.log("Selected Rows:", selectedRows);
    // my exercise table저장
    if (selectedRows.length) {
      const res = await axios.post(
        "/exercise/insert/my_exercise",
        selectedRows
      );
      console.log(res.data);
      if (res.data > 0) {
        setSelectState(
          `${selectedRows.length - res.data}개는 이미 들어있는 운동입니다.${
            selectedRows.length
          }개 중 ${res.data}개 저장되었습니다`
        );
      } else if (res.data == 0) {
        setSelectState("이미 선택한 운동들 입니다.");
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getMyExercise();
      getExerciseList();
    };
    if (show) {
      fetchData();
    } else {
      // 모달이 닫힐 때 초기화 작업 수행
      setSelectedRows([]);
      setSelectState("");
    }
    // setismodalopen(show);
  }, [show]);
  useEffect(() => {}, [selectState]);
  useEffect(() => {}, [showPage]);
  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      size="xl"
    >
      <Modal.Header closeButton variant="white">
        <Modal.Title> {selectedCategory.name} 운동</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {showPage == 0 && (
          <>
            <div className="healthcare_modal_body">
              <DataGrid
                rows={exercise}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                  },
                }} // 한 페이지당 보이는 행 수 설정
                pageSizeOptions={[5, 10]}
                checkboxSelection
                getRowId={(row) => row.excerciseid}
                selectionModel={myExercise.map((item) => item.excerciseid)}
                onSelectionModelChange={(ids) => {
                  const selectedRowData = exercise.filter((row) => {
                    console.log("Selected IDs:", ids);
                    ids.includes(row.excerciseid.toString());
                  });
                  setSelectedRows(selectedRowData);
                  console.log(selectedRowData);
                }}
                onRowSelectionModelChange={(selection) =>
                  onRowsSelectionHandler(selection)
                }
              />
            </div>

            <div className="modal_wrap">
              <section className="healthcare_modal_btm_wrap">
                <div className="healthcare_modal_btm">
                  {/* 글자가 모달보다 길어지면 빠져나감  */}
                  <p className="healthcare_modal_selected_title">
                    {selectedCategory.name}에서 선택한 운동리스트
                  </p>
                  {selectState != "" && (
                    <p className="healthcare_modal_unselected">{selectState}</p>
                  )}
                  {selectedRows &&
                    selectedRows.map((row) => (
                      <p className="healthcare_modal_selected_name">
                        ☑️&nbsp; {row.name}{" "}
                      </p>
                    ))}
                </div>
              </section>
            </div>
            <div className="healthcare_modal_btn">
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveClick}
              >
                {" "}
                저장하기{" "}
              </Button>
            </div>
          </>
        )}
        {showPage == 1 && (
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowPage(0)}
            >
              뒤로가기
            </Button>
            <p>유튜브영상나와야함 </p>
          </div>
        )}
        {showPage == 2 && (
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowPage(0)}
            >
              뒤로가기
            </Button>
            <p>AI수행 컴포넌트 </p>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default HealthcareModal;
