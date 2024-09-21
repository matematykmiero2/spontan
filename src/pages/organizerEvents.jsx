import React, { useEffect, useState } from "react";
import {
  getOrganizerEvents,
  getUserFriends,
  sendEventInvitations,
} from "../functions";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import { FixedSizeList } from "react-window";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import "../Components/components.css";
import { useTranslation } from "react-i18next";
function renderRow(props) {
  const { index, style, data } = props;
  const event = data[index];
  const { t } = data;
  return (
    <ListItem style={style} key={index} component="div" disablePadding>
      <Stack
        direction="row"
        spacing={2}
        sx={{
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <ListItemText primary={event.name} />
        <Button
          variant="contained"
          color={event.public ? "primary" : "secondary"}
          onClick={() => data.handleInvite(event.id)}
        >
          {t("Invite")}
        </Button>
        <Button
          variant="contained"
          color={event.public ? "primary" : "secondary"}
          onClick={() => data.handleEdit(event.id)}
        >
          {t("Edit")}
        </Button>
      </Stack>
    </ListItem>
  );
}

const Signed = () => {
  const [events, setEvents] = useState([]);
  const [friends, setFriends] = useState([]);
  const [openInviteModal, setOpenInviteModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [selectedFriends, setSelectedFriends] = useState({});
  const { t } = useTranslation();
  useEffect(() => {
    async function fetchAndParseEvents() {
      const fetchedEvents = await getOrganizerEvents();
      setEvents(fetchedEvents);
      setFriends(await getUserFriends());
    }

    fetchAndParseEvents();
  }, []);

  const handleInvite = (eventId) => {
    setSelectedEventId(eventId);
    setOpenInviteModal(true);
  };

  const handleEdit = (eventId) => {
    console.log(`Edit event ${eventId}`);
  };

  const handleCloseInviteModal = () => {
    setOpenInviteModal(false);
    setSelectedFriends({});
  };

  const handleFriendSelection = (friendId) => {
    setSelectedFriends((prevState) => ({
      ...prevState,
      [friendId]: !prevState[friendId],
    }));
  };

  const handleSendInvites = async () => {
    await sendEventInvitations(selectedEventId, selectedFriends);
    handleCloseInviteModal();
  };

  return (
    <div className="page" style={{ marginTop: "10px" }}>
      <Box
        sx={{
          width: "100%",
          height: "90vh",
          maxWidth: 360,
          bgcolor: "background.paper",
        }}
      >
        <FixedSizeList
          height={window.innerHeight * 0.9}
          width={360}
          itemSize={46}
          itemCount={events.length}
          itemData={{ ...events, handleInvite, handleEdit, t }}
          overscanCount={5}
        >
          {renderRow}
        </FixedSizeList>
      </Box>

      <Dialog open={openInviteModal} onClose={handleCloseInviteModal}>
        <DialogTitle> {t("Select Friends to Invite")}</DialogTitle>
        <DialogContent>
          {friends.map((friend) => (
            <FormControlLabel
              key={friend.friend_id}
              control={
                <Checkbox
                  checked={selectedFriends[friend.friend_id] || false}
                  onChange={() => handleFriendSelection(friend.friend_id)}
                />
              }
              label={`${friend.friend_first_name} ${friend.friend_last_name}`}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseInviteModal} color="primary">
            {t("Cancel")}
          </Button>
          <Button onClick={handleSendInvites} color="primary">
            {t("Send Invites")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Signed;
