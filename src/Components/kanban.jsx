import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import {
  getTasks,
  assignToTask,
  changeTaskStatus,
  addTask,
} from "../functions";
import TaskList from "./kanbanComponents/TaskList";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
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

const BasicTabs = ({ eventId }) => {
  const [value, setValue] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
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
  }, [eventId]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleAssign = async (taskId) => {
    await assignToTask(taskId);
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

  const handleSubmit = async () => {
    console.log("ok");
    await addTask(eventId, newTask);
    setNewTask({ summary: "", description: "" });
    handleCloseModal();
    fetchTasks(eventId);
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };
  return (
    <Box sx={{ width: "100%" }}>
      <div>
        {" "}
        <AddIcon color="primary" onClick={handleOpenModal} />
      </div>

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Todo" {...a11yProps(0)} />
          <Tab label="In progress" {...a11yProps(1)} />
          <Tab label="Done" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <TaskList
          onAssign={handleAssign}
          onMove={handleMove}
          tasks={tasks.filter((task) => task.status === "TODO")}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <TaskList
          onAssign={handleAssign}
          onMove={handleMove}
          tasks={tasks.filter((task) => task.status === "In progress")}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <TaskList
          onAssign={handleAssign}
          onMove={handleMove}
          tasks={tasks.filter((task) => task.status === "Done")}
        />
      </CustomTabPanel>

      <Dialog open={open} onClose={handleCloseModal}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="summary"
            label="Summary"
            type="text"
            fullWidth
            variant="outlined"
            value={newTask.summary}
            onChange={handleFieldChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
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
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add Task
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
