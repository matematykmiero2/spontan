import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList } from "react-window";
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

const BasicTabs = () => {
  const [value, setValue] = React.useState(0);
  const [friends, setFriends] = useState();
  const [invitations, setInvitations] = useState();
  const [userInvitations, setUserInvitations] = useState();

  function renderFriend(props) {
    const { index, style } = props;

    return (
      <ListItemButton>
        <ListItemText
          primary={`${friends[index].friend_first_name} ${friends[index].friend_last_name}`}
        />
        <Button
          color="error"
          onClick={() => deleteFriend(friends[index].friend_id)}
        >
          Remove
        </Button>
      </ListItemButton>
    );
  }

  function renderInvitation(props) {
    const { index, style } = props;

    return (
      <ListItemButton>
        <ListItemText
          primary={`${invitations[index].inviter_first_name} ${invitations[index].inviter_last_name} `}
        />
        <Button onClick={() => makeFriend(invitations[index].inviter_id)}>
          accept
        </Button>
      </ListItemButton>
    );
  }

  function renderUserInvitation(props) {
    const { index, style } = props;

    return (
      <ListItemButton>
        <ListItemText
          primary={`${userInvitations[index].invited_first_name} ${userInvitations[index].invited_last_name} `}
        />
        <Button
          color="error"
          onClick={() =>
            deleteFriendInvitation(userInvitations[index].invited_id)
          }
        >
          Remove
        </Button>
      </ListItemButton>
    );
  }

  useEffect(() => {
    async function init() {
      setFriends(await getUserFriends());
      setInvitations(await getUserInvitations());
      setUserInvitations(await getUserSendInvitations());
    }

    init();
  }, []);

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
          <Tab label="Friends" {...a11yProps(0)} />
          <Tab label="Invitations" {...a11yProps(1)} />
          <Tab label="Your invitations" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <>
          <FixedSizeList
            height={200}
            width={360}
            itemSize={46}
            itemCount={friends && friends.length}
            overscanCount={5}
          >
            {renderFriend}
          </FixedSizeList>
        </>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <>
          {invitations !== undefined && invitations.length > 0 ? (
            <>
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
          ) : (
            "No invitations"
          )}
        </>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <>
          {userInvitations !== undefined && userInvitations.length > 0 ? (
            <>
              <FixedSizeList
                height={200}
                width={360}
                itemSize={46}
                itemCount={userInvitations.length}
                overscanCount={5}
              >
                {renderUserInvitation}
              </FixedSizeList>
            </>
          ) : (
            "No send invitations "
          )}
        </>
      </CustomTabPanel>
    </Box>
  );
};
export default BasicTabs;
