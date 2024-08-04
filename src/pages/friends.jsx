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
            <FriendsTab />
            {/*<div>Znajomi</div>
            <FixedSizeList
              height={200}
              width={360}
              itemSize={46}
              itemCount={friends && friends.length}
              overscanCount={5}
            >
              {renderFriend}
            </FixedSizeList>

            {invitations !== undefined && (
              <>
                <div>Zaproszenia</div>
                <FixedSizeList
                  height={200}
                  width={360}
                  itemSize={46}
                  itemCount={invitations.length}
                  overscanCount={5}
                >
                  {renderInvitation}
                </FixedSizeList>
              </>
            )}*/}
          </Stack>
        </div>
      </div>
    </>
  );
};
export default Friends;
