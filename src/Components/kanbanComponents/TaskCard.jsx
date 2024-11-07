import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import "../../resources/i18n";
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
  InputLabel,
  FormControl,
  Select,
} from "@mui/material";

const TaskCard = ({
  summary,
  description,
  status,
  date,
  reporter,
  assignee,
  assignees,
  onAssign,
  onMove,
  isOrganizer,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedAssignee, setSelectedAssignee] = useState("");
  const { t } = useTranslation();

  const handleAssignChange = (event) => {
    setSelectedAssignee(event.target.value);

    onAssign(event.target.value);
  };
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
            <Typography variant="caption">
              {" "}
              {t("sAssignee")} {assignee}
            </Typography>
          </Stack>
          <Typography variant="caption">
            {new Date(date).toLocaleDateString()}
          </Typography>
        </Stack>
        <Stack spacing={2} sx={{ mt: 2 }}>
          {assignee === "Unassigned" && isOrganizer && (
            <FormControl variant="outlined">
              <InputLabel>{t("Assign to")}</InputLabel>
              <Select
                value={selectedAssignee}
                onChange={handleAssignChange}
                label={t("Assign to")}
              >
                {assignees &&
                  assignees.map((user) => (
                    <MenuItem key={user} value={user.user_id}>
                      {user.nickname}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          )}
          {assignee === "Unassigned" && (
            <Button variant="outlined" size="small" onClick={() => onAssign()}>
              {t("Assign")}
            </Button>
          )}
          <Button variant="outlined" size="small" onClick={handleClick}>
            {t("Move")}
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {status !== "TODO" && (
              <MenuItem onClick={() => handleMove("TODO")}>
                {t("Todo")}{" "}
              </MenuItem>
            )}
            {status !== "In progress" && (
              <MenuItem onClick={() => handleMove("In progress")}>
                {t("In progress")}
              </MenuItem>
            )}
            {status !== "Done" && (
              <MenuItem onClick={() => handleMove("Done")}>
                {t("Done")}{" "}
              </MenuItem>
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
