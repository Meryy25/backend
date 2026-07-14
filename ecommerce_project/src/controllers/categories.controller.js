const categoryService = require("../services/categories.service");

const listAllCategories = async (req, res) => {
    const categories = await categoryService.listAllCategories();

    res.json(categories);
};

const createCategory = async (req, res) => {
    const category = await categoryService.createCategory(req.body);

    res.status(201).json(category);
};

const deleteCategory = async (req, res) => {
    const { id } = req.params;

    await categoryService.deleteCategory(parseInt(id));

    res.status(204).json();
};

module.exports = {
    listAllCategories,
    createCategory,
    deleteCategory
};