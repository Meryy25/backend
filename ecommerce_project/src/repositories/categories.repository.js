const { Category } = require('../../models');

const listAllCategories = async () => {
    return await Category.findAll({
        order: [
            ['id', 'ASC']
        ]
    });
};

const createCategory = async (categoryData) => {
    return await Category.create(categoryData);
};

const deleteCategory = async (categoryId) => {
    return await Category.destroy({
        where: {
            id: categoryId
        }
    });
};

module.exports = {
    listAllCategories,
    createCategory,
    deleteCategory
};