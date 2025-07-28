import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  TextField, 
  DialogActions, 
  Button 
} from '@mui/material';
import { createProject, updateProject } from '../../services/projectService';

const ProjectForm = ({ open, onClose, project, onCreate, onUpdate }) => {
  const isEditMode = !!project;

  const [title, setTitle] = useState(project?.title || '');
  const [description, setDescription] = useState(project?.description || '');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Aggiorna i campi quando cambia il progetto
  useEffect(() => {
    setTitle(project?.title || '');
    setDescription(project?.description || '');
  }, [project]);

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
        const updatedProject = await updateProject(project._id, { title, description });
        onUpdate && onUpdate(updatedProject); // <-- usa onUpdate in edit mode
      } else {
        const newProject = await createProject({ title, description });
        onCreate && onCreate(newProject); // <-- usa onCreate in create mode
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
        {isEditMode ? 'Modifica Progetto' : 'Crea Nuovo Progetto'}
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
            {loading ? 'Salvataggio...' : (isEditMode ? 'Salva Modifiche' : 'Crea Progetto')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ProjectForm;