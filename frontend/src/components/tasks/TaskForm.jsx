import React, { useState } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  TextField, 
  DialogActions, 
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { createTask, updateTask } from '../../services/taskService';

const TaskForm = ({ open, onClose, task, onCreate, onUpdate }) => {
  const isEditMode = !!task;
  
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [status, setStatus] = useState(task?.status || 'Da fare');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Il titolo è obbligatorio');
      return;
    }
    
    setError('');
    setLoading(true);
    
    try {
      if (isEditMode) {
        const updatedTask = await updateTask(task._id, { title, description, status });
        onUpdate(updatedTask);
      } else {
        const newTask = await createTask({ title, description, status });
        onCreate(newTask);
      }
      onClose();
    } catch (err) {
      setError(err.message || 'Si è verificato un errore');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {isEditMode ? 'Modifica Task' : 'Crea Nuovo Task'}
      </DialogTitle>
      
      <form onSubmit={handleSubmit}>
        <DialogContent>
          {error && (
            <div className="mb-4 text-red-500 text-sm">{error}</div>
          )}
          
          <TextField
            autoFocus
            margin="dense"
            label="Titolo"
            type="text"
            fullWidth
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          
          <TextField
            margin="dense"
            label="Descrizione"
            type="text"
            fullWidth
            variant="outlined"
            multiline
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-4"
          />
          
          <FormControl fullWidth className="mt-4">
            <InputLabel>Stato</InputLabel>
            <Select
              value={status}
              label="Stato"
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="Da fare">Da fare</MenuItem>
              <MenuItem value="In corso">In corso</MenuItem>
              <MenuItem value="Completato">Completato</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        
        <DialogActions className="px-6 py-4">
          <Button onClick={onClose} disabled={loading}>
            Annulla
          </Button>
          <Button 
            type="submit"
            variant="contained"
            className="bg-primary-500 hover:bg-primary-600"
            disabled={loading}
          >
            {loading ? 'Salvataggio...' : (isEditMode ? 'Salva Modifiche' : 'Crea Task')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TaskForm;