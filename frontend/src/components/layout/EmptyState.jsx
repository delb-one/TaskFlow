import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

const EmptyState = ({ 
  title, 
  description, 
  buttonText, 
  onButtonClick 
}) => {
  return (
    <Box className="text-center py-10">
      <NoteAddIcon 
        className="text-gray-300" 
        style={{ fontSize: '4rem' }} 
      />
      <Typography variant="h6" className="mt-4 font-medium">
        {title}
      </Typography>
      <Typography variant="body1" className="mt-2 text-gray-600 ">
        {description}
      </Typography>
      {/* {buttonText && (
        <Button
          variant="contained"
          className="mt-4 bg-primary-500 hover:bg-primary-600"
          onClick={onButtonClick}
        >
          {buttonText}
        </Button>
      )} */}
    </Box>
  );
};

export default EmptyState;