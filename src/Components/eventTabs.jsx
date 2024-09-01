import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList } from "react-window";
import Card from "./eventPageTile";
import Chat from "./chat";
import Kanban from "./kanban";
import {
  getUserInvitations,
  getUserFriends,
  makeFriend,
  deleteFriend,
  getUserSendInvitations,
  deleteFriendInvitation,
} from "../functions";
import ListItemButton from "@mui/material/ListItemButton";
import ListItem from "@mui/material/ListItem";
import { Button, Chip, Stack } from "@mui/material";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const BasicTabs = ({ id, event }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Info" {...a11yProps(0)} />
          <Tab label="Chat" {...a11yProps(1)} />
          <Tab label="Kanban" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <div style={{ paddingBlockEnd: "10%" }}>
          {event !== null ? (
            <Card
              location={`${event.city} ${event.street} ${event.number} ${event.apartment}`}
              name={event.name}
              description={event.description}
              date={event.date_time}
              photo={event.photo}
              first_name={event.first_name}
              last_name={event.last_name}
              nickname={event.organizer_nickname}
              price={event.price}
              duration={event.duration}
              categories={event.categories}
              id={id}
            />
          ) : (
            <p>Loading ...</p>
          )}
        </div>
        <renderInfo />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <div style={{ alignContent: "center", paddingBlockEnd: "10%" }}>
          {event !== null && <Chat eventId={id} name={event.name}></Chat>}
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Kanban eventId={id} />
      </CustomTabPanel>
    </Box>
  );
};
export default BasicTabs;