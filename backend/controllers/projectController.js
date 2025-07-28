import Project from '../models/Project.js';

// @desc    Ottieni tutti i progetti dell'utente
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user._id });
    res.json(projects);
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