import React, { useEffect, useState } from "react";
import { Button, Chip, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import FriendsTab from "../Components/friendTabs";

const Friends = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <>
      <div className="page" style={{ marginTop: "40px" }}>
        <div>
          <Stack spacing={2}>
            <div style={{ paddingInline: "5%" }}>
              <Button
                fullWidth
                onClick={() => navigate("/addFriend")}
                variant="contained"
              >
                {t("Add friend")}
              </Button>
            </div>

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
