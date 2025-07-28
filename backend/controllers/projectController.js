import Project from '../models/Project.js';
import Task from '../models/Task.js';

// @desc    Ottieni tutti i progetti dell'utente
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user._id }).lean();

    // For each project, count tasks
    const projectsWithTaskCount = await Promise.all(
      projects.map(async (project) => {
        const taskCount = await Task.countDocuments({ project: project._id });
        return { ...project, taskCount };
      })
    );

    res.json(projectsWithTaskCount);
  } catch (error) {
    res.status(500).json({ message: 'Errore nel server' });
  }
};

// @desc    Crea un nuovo progetto
export const createProject = async (req, res) => {
  const { title, description } = req.body;
  
  try {
    const project = await Project.create({
      title,
      description,
      owner: req.user._id,
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: 'Errore nel server' });
  }
};

// @desc    Ottieni progetto + task correlati
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Progetto non trovato' });
    }

    // Verifica proprietario
    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Non autorizzato' });
    }

    const tasks = await Task.find({ project: req.params.id });
    
    res.json({ ...project._doc, tasks });
  } catch (error) {
    res.status(500).json({ message: 'Errore nel server' });
  }
};

// @desc    Elimina progetto
export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Progetto non trovato' });
    }

    // Verifica proprietario
    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Non autorizzato' });
    }

    // Elimina anche i task correlati
    await Task.deleteMany({ project: req.params.id });
    await project.deleteOne();
    res.json({ message: 'Progetto eliminato' });
  } catch (error) {
    res.status(500).json({ message: 'Errore nel server' });
  }
};

// @desc    Aggiorna progetto
export const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Progetto non trovato' });
    }
    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Non autorizzato' });
    }
    project.title = req.body.title || project.title;
    project.description = req.body.description || project.description;
    const updatedProject = await project.save();
    res.json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: 'Errore nel server' });
  }
};