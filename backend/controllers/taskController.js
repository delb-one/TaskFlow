import Task from '../models/Task.js';
import Project from '../models/Project.js';

// @desc    Crea nuovo task
export const createTask = async (req, res) => {
  const { title, description, projectId } = req.body;
  
  try {
    // Verifica esistenza progetto
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Progetto non trovato' });
    }

    // Verifica proprietario progetto
    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Non autorizzato' });
    }

    const task = await Task.create({
      title,
      description,
      project: projectId,
      author: req.user._id,
    });
    
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Errore nel server' });
  }
};

// @desc    Aggiorna task
export const updateTask = async (req, res) => {
  const { status } = req.body;
  
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task non trovato' });
    }

    // Verifica proprietario progetto padre
    const project = await Project.findById(task.project);
    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Non autorizzato' });
    }

    task.status = status || task.status;
    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Errore nel server' });
  }
};

// @desc    Elimina task
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task non trovato' });
    }

    // Verifica proprietario progetto padre
    const project = await Project.findById(task.project);
    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Non autorizzato' });
    }

    await task.deleteOne();
    res.json({ message: 'Task eliminato' });
  } catch (error) {
    res.status(500).json({ message: 'Errore nel server' });
  }
};

// @desc    Ottieni tutti i task di un progetto
export const getTasksByProject = async (req, res) => {
  try {
    const { projectId } = req.query;
    if (!projectId) {
      return res.status(400).json({ message: 'projectId richiesto' });
    }

    // Verifica esistenza progetto e proprietà
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Progetto non trovato' });
    }
    if (project.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Non autorizzato' });
    }

    const tasks = await Task.find({ project: projectId });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Errore nel server' });
  }
};