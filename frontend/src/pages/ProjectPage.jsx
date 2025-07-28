import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getProjectDetails, deleteProject } from '../services/projectService';
import { getTasks, createTask, updateTask, deleteTask } from '../services/taskService';
import ProjectForm from '../components/projects/ProjectForm';
import TaskList from '../components/tasks/TaskList';
import TaskForm from '../components/tasks/TaskForm';
import { 
  Button, 
  Container, 
  Typography, 
  Box, 
  CircularProgress,
  Alert,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const ProjectPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [openTaskForm, setOpenTaskForm] = useState(false);
  const [openProjectForm, setOpenProjectForm] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        setLoading(true);
        const projectData = await getProjectDetails(id);
        setProject(projectData);
        
        const tasksData = await getTasks(id);
        setTasks(tasksData);
      } catch (err) {
        setError('Errore nel caricamento del progetto');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjectData();
  }, [id]);

  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await createTask({ ...taskData, projectId: id });
      setTasks([...tasks, newTask]);
      setOpenTaskForm(false);
    } catch (err) {
      setError(err.message || 'Errore nella creazione del task');
    }
  };

  const handleUpdateTask = async (taskId, updatedData) => {
    try {
      const updatedTask = await updateTask(taskId, updatedData);
      setTasks(tasks.map(task => 
        task._id === taskId ? updatedTask : task
      ));
    } catch (err) {
      setError(err.message || 'Errore nell\'aggiornamento del task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (err) {
      setError(err.message || 'Errore nell\'eliminazione del task');
    }
  };

  const handleUpdateProject = (updatedProject) => {
    setProject(updatedProject);
    setOpenProjectForm(false);
  };

  const handleDeleteProject = async () => {
    try {
      await deleteProject(id);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Errore nell\'eliminazione del progetto');
    } finally {
      setOpenDeleteDialog(false);
    }
  };

  if (loading) {
    return (
      <Container className="py-10 text-center">
        <CircularProgress />
      </Container>
    );
  }

  if (!project) {
    return (
      <Container className="py-10 text-center">
        <Alert severity="error">Progetto non trovato</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" className="py-8">
      <Box className="mb-6">
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate('/')}
          className="text-gray-600 mb-4"
        >
          Torna alla dashboard
        </Button>
        
        <Box className="flex justify-between items-center">
          <Typography variant="h4" component="h1">
            {project.title}
          </Typography>
          
          <Box className="flex gap-2">
            <IconButton 
              onClick={() => setOpenProjectForm(true)}
              className="text-primary-500"
            >
              <EditIcon />
            </IconButton>
            <IconButton 
              onClick={() => setOpenDeleteDialog(true)}
              className="text-red-500"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
        
        <Typography variant="body1" className="mt-2 text-gray-600">
          {project.description || 'Nessuna descrizione'}
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" className="mb-4">
          {error}
        </Alert>
      )}

      <Box className="flex justify-between items-center mb-6">
        <Typography variant="h5" component="h2">
          Tasks ({tasks.length})
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenTaskForm(true)}
          className="bg-primary-500 hover:bg-primary-600"
        >
          Nuovo Task
        </Button>
      </Box>

      <TaskList 
        tasks={tasks} 
        onUpdate={handleUpdateTask}
        onDelete={handleDeleteTask}
      />

      {/* Modali e dialoghi */}
      <TaskForm
        open={openTaskForm}
        onClose={() => setOpenTaskForm(false)}
        onCreate={handleCreateTask}
      />
      
      <ProjectForm
        open={openProjectForm}
        onClose={() => setOpenProjectForm(false)}
        project={project}
        onUpdate={handleUpdateProject}
      />
      
      <Dialog
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      >
        <DialogTitle>Conferma eliminazione</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Sei sicuro di voler eliminare il progetto "{project.title}"? 
            Tutti i task associati verranno eliminati permanentemente.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Annulla</Button>
          <Button 
            onClick={handleDeleteProject} 
            variant="contained"
            className="bg-red-500 hover:bg-red-600"
          >
            Elimina
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProjectPage;