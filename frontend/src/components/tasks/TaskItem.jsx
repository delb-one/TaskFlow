import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  IconButton, 
  Menu, 
  MenuItem, 
  Checkbox,
  FormControlLabel
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import TaskForm from './TaskForm';

const TaskItem = ({ task, onUpdate, onDelete }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  
  const handleMenuOpen = (e) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleEdit = () => {
    setOpenForm(true);
    handleMenuClose();
  };
  
  const handleDelete = () => {
    onDelete(task._id);
    handleMenuClose();
  };
  
  const handleStatusChange = (e) => {
    const newStatus = e.target.checked ? 'Completato' : 'Da fare';
    onUpdate(task._id, { status: newStatus });
  };

  return (
    <Box className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
      <Box className="flex justify-between items-start">
        <FormControlLabel
          control={
            <Checkbox 
              checked={task.status === 'Completato'} 
              onChange={handleStatusChange}
              color="primary"
            />
          }
          label={
            <Typography 
              className={`font-medium ${task.status === 'Completato' ? 'line-through text-gray-500' : ''}`}
            >
              {task.title}
            </Typography>
          }
        />
        
        <IconButton size="small" onClick={handleMenuOpen}>
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </Box>
      
      {task.description && (
        <Typography variant="body2" className="mt-2 text-gray-600">
          {task.description}
        </Typography>
      )}
      
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleEdit}>
          <EditIcon fontSize="small" className="mr-2 text-gray-600" />
          Modifica
        </MenuItem>
        <MenuItem onClick={handleDelete}>
          <DeleteIcon fontSize="small" className="mr-2 text-red-500" />
          Elimina
        </MenuItem>
      </Menu>
      
      <TaskForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        task={task}
        onUpdate={(updatedTask) => {
          onUpdate(task._id, updatedTask);
          setOpenForm(false);
        }}
      />
    </Box>
  );
};

export default TaskItem;