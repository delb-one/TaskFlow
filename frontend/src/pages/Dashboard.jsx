import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getProjects } from '../services/projectService';
import ProjectList from '../components/projects/ProjectList';
import ProjectForm from '../components/projects/ProjectForm';
import { Button, Container, Typography, Box, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) return;
    
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        setError('Errore nel caricamento dei progetti');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProjects();
  }, [currentUser]);

  const handleCreateProject = (newProject) => {
    setProjects([newProject, ...projects]);
    setOpenForm(false);
    setSelectedProject(null);
  };

  const handleUpdateProject = (updatedProject) => {
    setProjects(projects.map(p => p._id === updatedProject._id ? updatedProject : p));
    setOpenForm(false);
    setSelectedProject(null);
  };

  const handleEditProject = (project) => {
    setSelectedProject(project);
    setOpenForm(true);
  };

  if (!currentUser) {
    return <div>Caricamento...</div>;
  }

  return (
    <Container maxWidth="lg" className="py-8">
      <Box className="flex justify-between items-center mb-8">
        <Typography variant="h4" component="h1">
          I miei progetti
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenForm(true)}
          className="bg-primary-500 hover:bg-primary-600"
        >
          Nuovo Progetto
        </Button>
      </Box>

      {error && (
        <Alert severity="error" className="mb-4">
          {error}
        </Alert>
      )}

      {loading ? (
        <div className="text-center py-10">Caricamento progetti...</div>
      ) : projects.length === 0 ? (
        <Box className="text-center py-10 border-2 border-dashed rounded-xl">
          <Typography variant="h6" className="mb-4">
            Nessun progetto trovato
          </Typography>
          <Button
            variant="outlined"
            onClick={() => setOpenForm(true)}
            className="border-primary-500 text-primary-500 hover:border-primary-600"
          >
            Crea il tuo primo progetto
          </Button>
        </Box>
      ) : (
        <ProjectList 
          projects={projects} 
          onProjectClick={(id) => navigate(`/projects/${id}`)} 
          onEdit={handleEditProject}
        />
      )}

      <ProjectForm
        open={openForm}
        onClose={() => {
          setOpenForm(false);
          setSelectedProject(null);
        }}
        project={selectedProject}
        onCreate={handleCreateProject}
        onUpdate={handleUpdateProject}
      />
    </Container>
  );
};

export default Dashboard;