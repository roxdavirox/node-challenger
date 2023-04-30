const CategoryRepository = require('../repositories/CategoryRepository')

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryRepository.getAll();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const foundCategory = await CategoryRepository.getById(id);
    if (foundCategory) {
      res.json(foundCategory);
    } else {
      res.status(404).json({ message: `Category with id ${id} not found` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.createCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    const category = await CategoryRepository.create({ name, description });
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const foundCategory = await CategoryRepository.getById(id);
    if (foundCategory) {
      const category = await CategoryRepository.update(id, { name, description });
      res.json(category);
    } else {
      res.status(404).json({ message: `Category with id ${id} not found` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.partialUpdateCategory = async (req, res) => {
  const { id } = req.params;
  const fieldsToUpdate = req.body;

  try {
    const foundCategory = await CategoryRepository.getById(id);
    if (foundCategory) {

      const validFields = Object.keys(fieldsToUpdate).every(field => foundCategory.hasOwnProperty(field));
      if (!validFields) {
        return res.status(400).json({ message: 'One or more invalid fields provided' });
      }

      const updatedCategory = await CategoryRepository.update(id, { ...foundCategory, ...fieldsToUpdate });
      res.json(updatedCategory);
    } else {
      res.status(404).json({ message: `Category with id ${id} not found` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const foundCategory = await CategoryRepository.getById(id);

    if (foundCategory) {
      await CategoryRepository.deleteEntityAndAssociations(id, ['expenses']);
      res.json({ message: `Category with id ${id} deleted successfully` });
    } else {
      res.status(404).json({ message: `Category with id ${id} not found` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

