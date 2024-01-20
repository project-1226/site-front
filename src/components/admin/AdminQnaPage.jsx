import React, { useEffect, useState } from "react";
import { Tabs, Tab, Typography, Box, Accordion, AccordionDetails,
    AccordionSummary, Table, TableBody, TextField, Button } from '@mui/material';
import axios from "axios";

const AdminQnaPage = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [expanded, setExpanded] = useState(null);

    const getList = async () => {
        setLoading(true);
        const res = await axios.get("/admin/qnaList", {
            params: {
                userid: "e91b8eb6-24af-404a-b",
            },
        });
        setList(res.data);
        //console.log(res.data);
        setLoading(false);
    }

    useEffect(() => {
        getList();
    }, []);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : null);
    }

    const handleSubmit = (e, postid) => {
        e.preventDefault();
        if(window.confirm(`${postid}번 문의 답변을 등록할까요?`)){

            //axios.post("/admin/insertQnaComment");
            //alert("답변완료!");
        }
    }

    return (
        <Box sx={{ width: '80%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', marginTop: '20px', width: '80%' }}>
                <Tabs value="0" aria-label="disabled tabs example">
                    <Tab label="상품 문의" />
                </Tabs>
            </Box>
            <Table sx={{ width: '80%' }}>
                <TableBody>
                    {list.map((q, index) => (
                        <Accordion
                            key={index}
                            expanded={expanded === `panel${index}`}
                            onChange={handleChange(`panel${index}`)}
                        >
                            <AccordionSummary>
                                <Typography variant="body1" sx={{ ml: 2 }}>
                                    {q.title}
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                        sx={{ fontStyle: "italic", ml: 1 }}
                                    >
                                        ({q.fmtdate}) / ({q.userid})
                                    </Typography>
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography sx={{height: '130px'}}>
                                    {q.content}
                                </Typography>
                                <form onSubmit={(e)=> handleSubmit(e, q.postid)}>
                                    <TextField 
                                        label="답변작성"
                                        variant="outlined"
                                        rows={3}
                                        fullWidth
                                        margin="normal"
                                    />
                                    <div className="text-end ms-5 mt-2">
                                        <Button variant="contained" size="samll">등록</Button>
                                    </div>
                                </form>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </TableBody>
            </Table>
        </Box>
    )
};

export default AdminQnaPage;
