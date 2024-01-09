import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import AddressList from "./AddressList";
import InsertAddress from "./InsertAddress";
import UpdateAddress from "./UpdateAddress";

const ManageAddress = () => {
  const [clickAdd, setClickAdd] = useState(false);
  const [clickUpdate, setClickUpdate] = useState(false);
  const [selectedList, setSelectedList] = useState();

  return (
    <Box sx={{ width: "100%", bgcolor: "transparent", py: 5, pr: 3 }}>
      {clickUpdate ? (
        <UpdateAddress
          setClickUpdate={setClickUpdate}
          addressInfo={selectedList}
          setSelectedList={setSelectedList}
        />
      ) : !clickAdd ? (
        <>
          <AddressList
            setClickUpdate={setClickUpdate}
            setSelectedList={setSelectedList}
          />
          <Button
            fullWidth
            variant="contained"
            onClick={() => setClickAdd(true)}
          >
            배송지 추가하기
          </Button>
        </>
      ) : (
        <InsertAddress setClickAdd={setClickAdd} />
      )}
    </Box>
  );
};

export default ManageAddress;
