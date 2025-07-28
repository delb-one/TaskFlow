import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
import ProjectForm from './ProjectForm';
import { Grid } from '@mui/material';
import EmptyState from '../layout/EmptyState';

const ProjectList = ({ projects, onProjectClick }) => {
  const [editProject, setEditProject] = useState(null);
  const [openForm, setOpenForm] = useState(false);

  if (projects.length === 0) {
    return (
      <EmptyState
        title="Nessun progetto trovato"
        description="Crea il tuo primo progetto per iniziare a organizzare i tuoi task"
        buttonText="Crea Progetto"
        onButtonClick={() => setOpenForm(true)}
      />
    );
  }

  return (
    <>
      <Grid container spacing={3}>
        {projects.map(project => (
          <Grid item xs={12} sm={6} md={4} key={project._id}>
            <ProjectCard 
              project={project} 
              onEdit={(project) => {
                setEditProject(project);
                setOpenForm(true);
              }}
              onClick={onProjectClick}
            />
          </Grid>
        ))}
      </Grid>

      <ProjectForm
        open={openForm}
        onClose={() => {
          setOpenForm(false);
          setEditProject(null);
        }}
        project={editProject}
        onCreate={(newProject) => {
          onProjectClick(newProject._id);
        }}
      />
    </>
  );
};

export default ProjectList;