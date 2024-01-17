// MyExcerciseList.jsx로 대체

// import {
//   EastRounded,
//   ExpandMore,
//   FolderSpecialRounded,
// } from "@mui/icons-material";
// import {
//   Accordion,
//   AccordionDetails,
//   AccordionSummary,
//   Backdrop,
//   CircularProgress,
//   Stack,
//   Typography,
// } from "@mui/material";
// import axios from "axios";
// import React, { useEffect, useState } from "react";

// const MyExcercise = () => {
//   const [loading, setLoading] = useState(false);
//   const [list, setList] = useState([]);

//   const getList = async () => {
//     setLoading(true);
//     const res = await axios("/user/my-excercise", {
//       params: { userid: sessionStorage.getItem("userid") },
//     });
//     // console.log(res.data);

//     const data = res.data.reduce((acc, item) => {
//       if (!acc[item.categoryid]) {
//         acc[item.categoryid] = {
//           categoryid: item.categoryid,
//           categoryname: item.categoryname,
//           excercises: [],
//         };
//       }
//       acc[item.categoryid].excercises.push(item.excercisename);
//       return acc;
//     }, {});

//     const dataArray = Object.values(data);
//     setList(dataArray);
//     console.log(list);
//     setLoading(false);
//   };

//   useEffect(() => {
//     getList();
//   }, []);

//   return (
//     <>
//       <Backdrop
//         sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
//         open={loading}
//       >
//         <CircularProgress color="inherit" />
//       </Backdrop>
//       <div>
//         <Typography sx={{ pb: 2 }}>OO님을 위한 추천 운동</Typography>
//         {list.map((l, index) => (
//           <Accordion key={index} sx={{ width: "80%" }}>
//             <AccordionSummary
//               expandIcon={<ExpandMore />}
//               aria-controls="panel1-content"
//               id="panel1-header"
//             >
//               <Typography
//                 variant="h6"
//                 color="primary"
//                 ml={2}
//                 sx={{ fontWeight: "bolder" }}
//               >
//                 {l.categoryname} 운동
//               </Typography>
//             </AccordionSummary>
//             {l.excercises.map((e) => (
//               <AccordionDetails sx={{ ml: 15 }}>
//                 <Stack direction="row" spacing={2}>
//                   <EastRounded color="secondary" />
//                   <Typography variant="body1" color="text.secondary">
//                     {e}
//                   </Typography>
//                 </Stack>
//               </AccordionDetails>
//             ))}
//           </Accordion>
//         ))}
//       </div>
//     </>
//   );
// };

// export default MyExcercise;
