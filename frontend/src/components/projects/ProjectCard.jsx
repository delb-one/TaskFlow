import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Chip,
  IconButton
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import TaskIcon from '@mui/icons-material/Task';

const ProjectCard = ({ project, onEdit, onClick }) => {
  return (
    <Card 
      className="shadow-md hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onClick(project._id)}
    >
      <CardContent className="relative">
        <Box className="flex justify-between items-start">
          <Box>
            <Typography variant="h6" component="h3" className="font-bold">
              {project.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" className="mt-1">
              {project.description || 'Nessuna descrizione'}
            </Typography>
          </Box>
          
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(project);
            }}
            className="text-gray-500 hover:text-primary-500"
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>
        
        <Box className="mt-4 flex justify-between items-center">
          <Chip 
            icon={<TaskIcon fontSize="small" />}
            label={`${project.taskCount || 0} tasks`}
            size="small"
            variant="outlined"
            className="border-gray-300"
          />
          
          <Typography variant="caption" color="textSecondary">
            Creato il: {new Date(project.createdAt).toLocaleDateString()}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;