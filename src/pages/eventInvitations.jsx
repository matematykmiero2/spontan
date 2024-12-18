import React, { useEffect, useState } from "react";
import {
  Button,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
} from "@mui/material";
import { FixedSizeList } from "react-window";
import {
  getEventInvitations,
  acceptEventInvitations,
  declineInvitation,
} from "../functions";
import "../Components/components.css";
import { useTranslation } from "react-i18next";

function renderRow(props) {
  const { index, style, data } = props;
  const invitation = data[index];
  const { t } = data;

  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <ListItemButton>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ListItemText
            primary={invitation.event_name}
            secondary={`${t("Invited by")}: ${invitation.inviter_nickname}`}
          />
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              color="success"
              onClick={() => data.handleAccept(invitation.id)}
            >
              {t("Accept")}
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={() => data.handleDecline(invitation.id)}
            >
              {t("Decline")}
            </Button>
          </Stack>
        </Stack>
      </ListItemButton>
    </ListItem>
  );
}

const Friends = () => {
  const [invitations, setInvitations] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    async function fetchAndParseInvitations() {
      const fetchedInvitations = await getEventInvitations();
      setInvitations(fetchedInvitations);
    }

    fetchAndParseInvitations();
  }, []);

  const handleAccept = async (invitationId) => {
    await acceptEventInvitations(invitationId);
    setInvitations((prev) =>
      prev.filter((invitation) => invitation.id !== invitationId)
    );
  };

  const handleDecline = async (invitationId) => {
    await declineInvitation(invitationId);
    setInvitations((prev) =>
      prev.filter((invitation) => invitation.id !== invitationId)
    );
  };

  return (
    <div className="page" style={{ marginTop: "40px" }}>
      <FixedSizeList
        height={window.innerHeight * 0.9}
        width={"90vw"}
        itemSize={80}
        itemCount={invitations.length}
        itemData={{ ...invitations, handleAccept, handleDecline, t }}
        overscanCount={5}
      >
        {renderRow}
      </FixedSizeList>
    </div>
  );
};

export default Friends;
