import React, { useEffect, useState } from "react";
import {
  getOrganizerEvents,
  getUserFriends,
  sendEventInvitations,
  updateEvent,
  getUserLocations,
} from "../functions";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import Stack from "@mui/material/Stack";
import { FixedSizeList } from "react-window";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import ListItemText from "@mui/material/ListItemText";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";
import "../Components/components.css";
import { ListItemButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Signed = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [friends, setFriends] = useState([]);
  const [locations, setLocations] = useState([]);
  const [openInviteModal, setOpenInviteModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [selectedFriends, setSelectedFriends] = useState({});
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchAndParseEvents = async () => {
      setLoading(true);
      try {
        const fetchedEvents = await getOrganizerEvents();
        setEvents(fetchedEvents);
        const fetchedFriends = await getUserFriends();
        setFriends(fetchedFriends);
        const fetchedLocations = await getUserLocations();
        setLocations(fetchedLocations);
      } catch (error) {
        console.error("Error fetching events or friends:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndParseEvents();
  }, []);

  const handleInvite = (eventId) => {
    setSelectedEventId(eventId);
    setOpenInviteModal(true);
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
    try {
      await sendEventInvitations(selectedEventId, selectedFriends);
      handleCloseInviteModal();
    } catch (error) {
      console.error("Error sending invites:", error);
    }
  };

  const handleUpdateEvent = async () => {
    if (selectedEvent) {
      try {
        await updateEvent(selectedEvent.id, selectedEvent);
        handleCloseEditModal();
        const fetchedEvents = await getOrganizerEvents();
        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Error updating event:", error);
      }
    }
  };

  const formatDateTime = (date, time) => {
    const [hours, minutes] = time.split(":");
    return `${date}T${hours}:${minutes}`;
  };

  const handleDateChange = (e) => {
    const fullDate = e.target.value;
    const date = fullDate.split("T")[0];
    const start_time = fullDate.split("T")[1];
    setSelectedEvent((prev) => ({
      ...prev,
      date: date,
      start_time: start_time,
    }));
  };
  const handleEventChange = (e) => {
    console.log(e);
    const { name, value, type, checked } = e.target;
    setSelectedEvent((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleLocationChange = (event) => {
    console.log(event.target.value);
    setSelectedEvent((prev) => ({
      ...prev,
      location_id: event.target.value,
    }));
  };
  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedEvent(null);
  };

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setOpenEditModal(true);
  };

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
          <ListItemButton onClick={() => navigate(`/event/${event.id}`)}>
            {event.name}
          </ListItemButton>
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
            onClick={() => data.handleEdit(event)}
          >
            {t("Edit")}
          </Button>
        </Stack>
      </ListItem>
    );
  }

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
        {loading ? (
          <div>Loading events...</div>
        ) : (
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
        )}
      </Box>

      <Dialog open={openInviteModal} onClose={handleCloseInviteModal}>
        <DialogTitle>{t("Select Friends to Invite")}</DialogTitle>
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

      <Dialog open={openEditModal} onClose={handleCloseEditModal}>
        <DialogTitle>{t("Edit Event")}</DialogTitle>
        <DialogContent>
          <div
            style={{
              paddingInline: "5vw",
              paddingBlock: "2vh",
              height: "70vh",
              overflowY: "auto",
            }}
          >
            {selectedEvent && (
              <Stack spacing={2}>
                <TextField
                  label={t("Event Name")}
                  name="name"
                  value={selectedEvent.name}
                  onChange={handleEventChange}
                  fullWidth
                  required
                />
                <TextField
                  label={t("Description")}
                  name="description"
                  value={selectedEvent.description}
                  onChange={handleEventChange}
                  fullWidth
                  multiline
                  required
                />
                <TextField
                  label={t("Start Time")}
                  name="start_time"
                  type="datetime-local"
                  value={formatDateTime(
                    selectedEvent.date,
                    selectedEvent.start_time
                  )}
                  onChange={handleDateChange}
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  required
                />
                <TextField
                  label={t("Duration (hours)")}
                  name="duration"
                  type="number"
                  value={selectedEvent.duration}
                  onChange={handleEventChange}
                  fullWidth
                  required
                />
                <TextField
                  label={t("Price")}
                  name="price"
                  type="number"
                  value={selectedEvent.price}
                  onChange={handleEventChange}
                  fullWidth
                  required
                />
                <Select
                  labelId="location-select-label"
                  name="location_id"
                  value={selectedEvent.location_id || ""}
                  onChange={handleLocationChange}
                  fullWidth
                  required
                >
                  {locations.map((location) => (
                    <MenuItem key={location.id} value={location.location_id}>
                      {location.city}, {location.street} {location.number}
                    </MenuItem>
                  ))}
                </Select>

                <TextField
                  label={t("Photo URL")}
                  name="photo"
                  value={selectedEvent.photo}
                  onChange={handleEventChange}
                  fullWidth
                  required
                />

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedEvent.public}
                      onChange={handleEventChange}
                      name="public"
                    />
                  }
                  label={t("Public Event")}
                />
              </Stack>
            )}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditModal} color="primary">
            {t("Cancel")}
          </Button>
          <Button onClick={handleUpdateEvent} color="primary">
            {t("Update")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Signed;
