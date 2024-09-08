import React, { useEffect, useState } from "react";
import { Button, Chip, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

import FriendsTab from "../Components/friendTabs";

const Friends = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="page" style={{ marginTop: "40px" }}>
        <div>
          <Stack spacing={2}>
            <Button onClick={() => navigate("/addFriend")} variant="contained">
              Add friend
            </Button>
            <div>
              <FriendsTab />
            </div>
          </Stack>
        </div>
      </div>
    </>
  );
};
export default Friends;
