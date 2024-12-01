import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import Alert from "@mui/material/Alert";
import {
  getTasks,
  assignToTask,
  changeTaskStatus,
  addTask,
  generateTasks,
} from "../functions";
import TaskList from "./kanbanComponents/TaskList";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { Stack } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

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

const BasicTabs = ({
  eventId,
  eventDescription,
  eventName,
  asignees,
  isOrganizer,
  isMobile,
}) => {
  const { t } = useTranslation();
  const [value, setValue] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [generatingTasks, setGeneratingTasks] = useState(false);
  const [suggestedTasks, setSuggestedTasks] = useState([]);
  const [taskModal, setTaskModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [loading, setloading] = useState(true);
  const [newTask, setNewTask] = useState({
    summary: "",
    description: "",
  });

  const fetchTasks = async (eventId) => {
    const fetchedTasks = await getTasks(eventId);

    setTasks(fetchedTasks || []);
  };
  useEffect(() => {
    fetchTasks(eventId);
    setloading(false);
  }, [eventId]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleAssign = async (taskId, assignee) => {
    await assignToTask(taskId, assignee);
    await fetchTasks(eventId);
  };

  const handleMove = async (taskId, newStatus) => {
    await changeTaskStatus(taskId, newStatus);
    await fetchTasks(eventId);
  };

  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleOpenTaskModal = () => {
    setTaskModal(true);
  };

  const handleCloseTaskModal = () => {
    setTaskModal(false);
  };

  const handleSubmit = async () => {
    // console.log("ok");

    setNewTask({ summary: "", description: "" });
    handleCloseModal();
    if (newTask.summary?.length > 0) {
      setloading(true);
      await addTask(eventId, newTask);
      fetchTasks(eventId);
      setloading(false);
    }
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleGenerateTasks = async () => {
    setSuggestedTasks([]);
    setGeneratingTasks(true);
    const tasks = await generateTasks(eventName, eventDescription);
    // console.log(tasks);
    if (tasks && tasks.length > 0) {
      setSuggestedTasks(tasks);
    } else {
      setShowError(true);
    }

    setGeneratingTasks(false);
  };
  return (
    <Box sx={{ width: "90vw" }}>
      <Stack direction="row" spacing={2}>
        <div onClick={handleOpenModal}>
          <AddIcon color="primary" />
        </div>
        <div onClick={handleOpenTaskModal}>
          <AutoAwesomeIcon color="primary" />
        </div>
      </Stack>
      {loading && (
        <div style={{ width: "100%" }}>
          <LinearProgress />
        </div>
      )}

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label={t("Todo")} {...a11yProps(0)} />
          <Tab label={t("In progress")} {...a11yProps(1)} />
          <Tab label={t("Done")} {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <TaskList
          onAssign={handleAssign}
          onMove={handleMove}
          tasks={tasks.filter((task) => task.status === "TODO")}
          asignees={asignees}
          isOrganizer={isOrganizer}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <TaskList
          onAssign={handleAssign}
          onMove={handleMove}
          tasks={tasks.filter((task) => task.status === "In progress")}
          asignees={asignees}
          isOrganizer={isOrganizer}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <TaskList
          onAssign={handleAssign}
          onMove={handleMove}
          tasks={tasks.filter((task) => task.status === "Done")}
          asignees={asignees}
          isOrganizer={isOrganizer}
        />
      </CustomTabPanel>

      <Dialog open={open} onClose={handleCloseModal}>
        <DialogTitle> {t("Add New Task")}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="summary"
            label={t("Summary")}
            type="text"
            fullWidth
            variant="outlined"
            value={newTask.summary}
            onChange={handleFieldChange}
          />
          <TextField
            margin="dense"
            name="description"
            label={t("Description")}
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={newTask.description}
            onChange={handleFieldChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            {t("Cancel")}
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {t("Add Task")}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={taskModal} onClose={handleCloseTaskModal}>
        <DialogTitle> {t("AI suggested Tasks")}</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <Alert severity="info">
              {t(
                "This is an experimental feature. The API with the model must be run locally."
              )}
            </Alert>
            <Button
              onClick={handleGenerateTasks}
              variant="contained"
              color="primary"
            >
              {t("Suggest tasks")}
            </Button>
            {generatingTasks && "Generating tasks..."}
            {suggestedTasks.length > 0 && (
              <Stack spacing={1}>
                {suggestedTasks.map((task, index) => (
                  <div key={index}>
                    <p>{task}</p>
                    <Button variant="contained">{t("Add Task")}</Button>
                  </div>
                ))}
              </Stack>
            )}
            {showError && (
              <Alert severity="error">
                {t("Error occured. Make sure you are running API locally!")}
              </Alert>
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTaskModal} color="primary">
            {t("Cancel")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

BasicTabs.propTypes = {
  eventId: PropTypes.string.isRequired,
};

export default BasicTabs;
