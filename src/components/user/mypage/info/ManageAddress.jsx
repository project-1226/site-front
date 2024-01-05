import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import AddressList from "./AddressList";
import InsertAddress from "./InsertAddress";

const ManageAddress = () => {
  const [clickAdd, setClickAdd] = useState(false);

  return (
    <Box sx={{ width: "100%", bgcolor: "transparent", p: 5 }}>
      {!clickAdd ? (
        <>
          <AddressList />
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
