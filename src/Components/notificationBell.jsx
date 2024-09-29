import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  List,
  ListItem,
  IconButton,
  Divider,
  Stack,
} from "@mui/material";
import {
  deleteNotification,
  deleteNotifications,
  checkIfLogged,
} from "../functions";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate, useLocation } from "react-router-dom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
const Bell = ({ notifications }) => {
  const unLogged = checkIfLogged();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    console.log("close");
    setIsOpen(false);
  };

  const NotificationListItem = ({ notification }) => {
    return (
      <Box key={notification.notification_id}>
        <ListItem>
          <Box
            sx={{
              padding: "10px 20px",
              borderRadius: "4px",
              backgroundColor: "#f5f5f5",
              margin: "5px 0",
              transition: "background-color 0.3s",
              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
              flex: 1,
            }}
          >
            {" "}
            <Typography variant="body1">
              {notification.notification_type === "newFriendRequest" && (
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate(unLogged ? "/friends" : "/login");
                    setIsOpen(false);
                  }}
                >
                  <span>{`Nowe zaproszenie od ${notification.additional_info}`}</span>
                </div>
              )}
              {notification.notification_type === "newTask" && (
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate(
                      unLogged
                        ? `/event/${notification.reference_id}`
                        : "/login"
                    );
                    setIsOpen(false);
                  }}
                >
                  <span>{`Nowe zadanie w: ${notification.additional_info}`}</span>
                </div>
              )}
              {notification.notification_type === "newMessage" && (
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate(
                      unLogged
                        ? `/event/${notification.reference_id}`
                        : "/login"
                    );
                    setIsOpen(false);
                  }}
                >
                  <span>{`Nowa wiadomość w: ${notification.additional_info}`}</span>
                </div>
              )}
              {notification.notification_type === "newEventInvitation" && (
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate(unLogged ? "/eventInvitations" : "/login");
                    setIsOpen(false);
                  }}
                >
                  <span>{`Zaproszenie do nowego wydarzenia: ${notification.additional_info}`}</span>
                </div>
              )}
              {notification.notification_type === "newFriend" && (
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate(unLogged ? "/friends" : "/login");
                    setIsOpen(false);
                  }}
                >
                  <span>{`Zaproszenie przyjęte przez: ${notification.additional_info}`}</span>
                </div>
              )}
            </Typography>
          </Box>
          <Box
            sx={{
              cursor: "pointer",
              marginLeft: "10px",
            }}
            onClick={async () =>
              await deleteNotification(notification.notification_id)
            }
          >
            <DeleteIcon />
          </Box>
        </ListItem>
        <Divider />
      </Box>
    );
  };
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "20px",
          right: "30px",
          cursor: "pointer",
          zIndex: 10000,
        }}
        onClick={handleOpen}
      >
        <NotificationsActiveIcon />
      </div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "70vw",
            height: "70vh",
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,

            p: 4,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            <Stack direction="row">
              Powiadomienia{" "}
              <Box
                sx={{
                  cursor: "pointer",
                  marginLeft: "10px",
                }}
                onClick={async () => await deleteNotifications()}
              >
                <DeleteForeverIcon />
              </Box>
            </Stack>
          </Typography>

          <List sx={{ width: "100%", height: "90%", overflow: "auto" }}>
            {notifications.length === 0 ? (
              <Typography variant="body2">Brak powiadomień.</Typography>
            ) : (
              notifications.map((notification) => (
                <Box key={notification.notification_id}>
                  <NotificationListItem
                    key={notification.notification_id}
                    notification={notification}
                  />
                  <Divider />
                </Box>
              ))
            )}
          </List>
        </Box>
      </Modal>{" "}
    </>
  );
};

export default Bell;