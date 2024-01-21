import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { Button, TextField } from '@mui/material';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const AdminNoticeList = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [selectNotice, setSelectNotice] = useState(null);
  const [cancelEdit, setCancelEdit] = useState(null);
  const categoryid = '101';

  const getList = async () => {
    setLoading(true);
    const res = await axios.get(`/admin/list?categoryid=${categoryid}`);
    //console.log(res.data);

    setList(res.data);
    setLoading(false);
  }

  useEffect(() => {
    getList();
  }, []);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  }

  //수정버튼 눌렀을때
  const handleEditClick = (notice) => {
    setSelectNotice(notice);
    setCancelEdit({ ...notice });
  }

  const handleEditSave = async () => {
    const editedNotice = {
      postid: selectNotice.postid,
      title: selectNotice.title,
      content: selectNotice.content
    };

    if (window.confirm(`${editedNotice.postid}번 공지를 수정할까요?`)) {
      await axios.post("/admin/update", editedNotice);
      alert("수정완료!");

      setSelectNotice(null); //수정 후 초기화
      setCancelEdit(null);
      getList();
    }
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setSelectNotice((preNotice) => ({
      ...preNotice,
      [name]: value,
    }));
  };

  const handleEditCancel = () => {
    setSelectNotice(null);
    setCancelEdit(null);

    //아코디언 열려있는 상태로 변경
    setExpanded('panel' + list.findIndex(item => item === selectNotice));
  }

  const onDelete = async (postid) => {
    if (window.confirm(`${postid}번 공지를 삭제할까요?`)) {
      await axios.post("/admin/deletePost?postid=" + postid);
      alert("삭제완료!");
      getList();
    }
  }

  if (loading) return <div className='my-5 text-center'><Spinner /></div>

  return (
    <div style={{ marginTop: '70px' }}>
      {list.map((n, index) => (
        <Accordion key={index}
          expanded={expanded === `panel${index}`}
          onChange={handleChange(`panel${index}`)}
          sx={{ width: '1050px' }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}bh-content`}
            id={`panel${index}bh-header`}
          >
            <Typography sx={{ width: '35%', flexShrink: 0, marginLeft: '3%' }}>
              {n.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {selectNotice ? (
              <div>
                <TextField
                  label="제목"
                  variant="outlined"
                  fullWidth
                  value={selectNotice.title}
                  name="title"
                  onChange={handleEditChange}
                  style={{ marginBottom: '10px' }}
                />
                <TextField
                  label="내용"
                  variant="outlined"
                  fullWidth
                  multiline
                  rows={4}
                  value={selectNotice.content}
                  name="content"
                  onChange={handleEditChange}
                  style={{ marginBottom: '10px' }}
                />
                <div>
                  <Button onClick={handleEditSave}>수정</Button>
                  <Button onClick={handleEditCancel}>취소</Button>
                </div>
              </div>
            ) : (
              <>
                <Typography sx={{ height: '150px', marginLeft: '3%', marginRight: '3%' }}>
                  {n.content}
                </Typography>
                <div className='text-end'>
                  <Button onClick={() => handleEditClick(n)}>수정</Button>
                  <Button onClick={() => onDelete(n.postid)} color='error' >삭제</Button>
                </div>
              </>
            )}
          </AccordionDetails>
        </Accordion>
      ))}

    </div>
  )
}

export default AdminNoticeList