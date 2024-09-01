import React from "react";
import PropTypes from "prop-types";
import TaskCard from "./TaskCard"; // Zakładam, że TaskCard jest komponentem do wyświetlania pojedynczego zadania
import { Box, Typography } from "@mui/material";

const TaskList = ({ tasks, onAssign, onMove }) => {
  if (tasks.length === 0) {
    return (
      <Typography variant="h6" color="textSecondary">
        No tasks
      </Typography>
    );
  }

  return (
    <Box>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          summary={task.summary}
          description={task.description}
          status={task.status}
          date={task.date}
          reporter={task.reporter}
          assignee={task.assignee_nickname}
          onAssign={() => onAssign(task.id)}
          onMove={(newStatus) => onMove(task.id, newStatus)}
        />
      ))}
    </Box>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      reporter: PropTypes.string.isRequired,
      assignee_nickname: PropTypes.string,
      summary: PropTypes.string.isRequired,
    })
  ).isRequired,
  onAssign: PropTypes.func.isRequired,
  onMove: PropTypes.func.isRequired,
};

export default TaskList;
