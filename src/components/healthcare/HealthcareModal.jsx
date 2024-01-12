import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { DataGrid } from '@mui/x-data-grid';
import {Button} from "@mui/material";

const HealthcareModal = ({ show, handleClose, selectedCategory }) => {
  const [exercise,setExercise] = useState([]);
  const [showYutube,setShowYutube]= useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  //table설정
  const columns = [
    { field: 'excerciseid', headerName: 'Exercise ID', width: 120 },
    { field: 'name', headerName: 'Name', width: 200 },
    {
      field: 'description',
      headerName: 'Description',
      width: 400,
    },{
      field: 'action1',
      headerName: '',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => handleButtonClick(e,params.row)}
        >
          운동영상 보러가기
        </Button>
      ),
    },
    {
      field: 'action2',
      headerName: 'AI',
      width: 150,
      renderCell: (params) => (
        params.row.excerciseid == 21 &&
        <Button
          variant="contained"
          color="primary"
          onClick={(e) => handleAIClick(e,params.row)}
        >
          AI와 운동하기
        </Button>
      ),
    },
  ];
  //카테고리별 운동들고오기
  const getExerciseList = async() => {
    console.log(selectedCategory.categoryid);
    const res = await axios(`/exercise/list?categoryid=${selectedCategory.categoryid}`)
    console.log(res.data);
    setExercise(res.data)
  }

  //운동영상보러가기 클릭 
  const handleButtonClick = (event,row) => {
    event.stopPropagation();
    setShowYutube(true);
    console.log('Button clicked for row:', row);
  };
  //AI와 운동하기 선택
  const handleAIClick =(event,row) =>{
    event.stopPropagation();
    console.log('ai!!!!!!!!Button clicked for row:', row);
  }

  //////////////선택운동 my_exercise에 넣으려고 datagrid에서 체크내용 받아오는부분 구현중
  //////////////////////////////////////////////////////////////
  //각행 운동선택했을때
  const handleSelectionChange=(selection)=>{
    setSelectedRows(selection.selectionModel);
    console.log("운동 행 체크했을 때", selectedRows);
  } 
  const handleSaveClick = () => {
    console.log('Selected Rows:', selectedRows);
    // 이제 이 정보를 백엔드로 전송하거나 다른 작업을 수행할 수 있습니다.
  }
  
  useEffect(()=>{
    getExerciseList();
  },[show])
  
  const onRowsSelectionHandler = (ids) => {
    // const selectedRowsData = ids.map((id) => rows.find((row) => row.id === id));
    // setSelectedRows(selectedRowsData);
    // console.log(selectedRows);
  };


  return (
    <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} size="xl">
      <Modal.Header closeButton variant="white">
        <Modal.Title>상세보기</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {showYutube ? 
        <div>
          <Button
          variant="contained"
          color="primary"
          onClick={() =>setShowYutube(false)}
        >
        뒤로가기
        </Button>
          <p>유튜브영상나와야함 </p>  
          
        </div>
        :
        <>
        <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={exercise}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}  // 한 페이지당 보이는 행 수 설정
          pageSizeOptions={[5, 10]}
          checkboxSelection
          getRowId={(row) => row.excerciseid}
          onRowSelectionModelChange={(selection) => onRowsSelectionHandler(selection)}
        />
        </div>
        
        <div className="modal_wrap">
        <Button
              variant="contained"
              color="primary"
              onClick={handleSaveClick}
            >
              저장하기
            </Button>
          <section className="modal_top">
            <div className='modal_food_img'>{selectedCategory.name}</div>
          </section>

          <section className="modal_btm">
          </section>
        </div>
        </>      
        }             
      </Modal.Body>
    </Modal>
  );
}

export default HealthcareModal;
