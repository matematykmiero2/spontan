import React from "react";
import PropTypes from "prop-types";
import {
  Card as MuiCard,
  CardContent,
  Typography,
  Chip,
  Box,
  Stack,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";

const TaskCard = ({
  summary,
  description,
  status,
  date,
  reporter,
  assignee,
  onAssign,
  onMove,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMove = (newStatus) => {
    onMove(newStatus);
    handleClose();
  };

  return (
    <MuiCard variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Stack direction="row" spacing={2}>
          <Typography variant="h6" component="div" sx={{ mb: 1 }}>
            {summary}
          </Typography>
          <Chip
            label={status}
            color={
              status === "Done"
                ? "success"
                : status === "In progress"
                ? "warning"
                : "info"
            }
            sx={{ mb: 1 }}
          />
        </Stack>
        <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
          {description}
        </Typography>
        <Stack>
          <Stack direction="row" spacing={2}>
            <Typography variant="caption">Assignee: {assignee}</Typography>
          </Stack>
          <Typography variant="caption">
            {new Date(date).toLocaleDateString()}
          </Typography>
        </Stack>
        <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
          {assignee === "Unassigned" && (
            <Button variant="outlined" size="small" onClick={() => onAssign()}>
              Assign
            </Button>
          )}
          <Button variant="outlined" size="small" onClick={handleClick}>
            Move
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {status !== "TODO" && (
              <MenuItem onClick={() => handleMove("TODO")}>Todo</MenuItem>
            )}
            {status !== "In progress" && (
              <MenuItem onClick={() => handleMove("In progress")}>
                In progress
              </MenuItem>
            )}
            {status !== "Done" && (
              <MenuItem onClick={() => handleMove("Done")}>Done</MenuItem>
            )}
          </Menu>
        </Stack>
      </CardContent>
    </MuiCard>
  );
};

TaskCard.propTypes = {
  summary: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  reporter: PropTypes.string.isRequired,
  assignee: PropTypes.string,
  onAssign: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
};

export default TaskCard;
