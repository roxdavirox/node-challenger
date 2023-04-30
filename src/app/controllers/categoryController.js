const Category = require('../models/Category');

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.getCategoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);
    if (category) {
      res.json(category);
    } else {
      res.status(404).json({ message: `Category with id ${id} not found` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const category = await Category.create({ name });
    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

exports.updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const category = await Category.findByPk(id);
    if (category) {
      await category.update({ name });
      res.json(category);
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
    const category = await Category.findByPk(id);
    if (category) {
      await category.destroy();
      res.json({ message: `Category with id ${id} deleted successfully` });
    } else {
      res.status(404).json({ message: `Category with id ${id} not found` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
