import React from 'react';
import TaskItem from './TaskItem';
import { Box, Typography } from '@mui/material';
import EmptyState from '../layout/EmptyState';

const statusGroups = {
  'Da fare': 'todo',
  'In corso': 'inprogress',
  'Completato': 'completed'
};

const TaskList = ({ tasks, onUpdate, onDelete }) => {
  // Raggruppa i task per stato
  const groupedTasks = tasks.reduce((acc, task) => {
    const status = task.status || 'Da fare';
    if (!acc[status]) acc[status] = [];
    acc[status].push(task);
    return acc;
  }, {});

  // Ordina le colonne secondo l'ordine definito
  const orderedGroups = Object.entries(statusGroups).map(([label, key]) => ({
    label,
    key,
    tasks: groupedTasks[label] || []
  }));

  if (tasks.length === 0) {
    return (
      <EmptyState
        title="Nessun task trovato"
        description="Crea il tuo primo task per iniziare a lavorare su questo progetto"
        buttonText="Crea Task"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {orderedGroups.map(group => (
        <Box key={group.key} className="bg-gray-50 rounded-lg p-4">
          <Typography variant="h6" className="font-semibold mb-4 capitalize">
            {group.label} ({group.tasks.length})
          </Typography>
          
          <div className="space-y-4">
            {group.tasks.map(task => (
              <TaskItem 
                key={task._id} 
                task={task} 
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            ))}
          </div>
        </Box>
      ))}
    </div>
  );
};

export default TaskList;