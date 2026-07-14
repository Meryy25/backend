const categoryRepository = require('../repositories/categories.repository');
const { NotFoundError } = require('../errors');

const listAllCategories = async () => {
    return categoryRepository.listAllCategories();
};

const createCategory = async (category) => {
    return categoryRepository.createCategory(category);
};

const deleteCategory = async (categoryId) => {
    const removedCount = await categoryRepository.deleteCategory(categoryId);

    if(!removedCount) {
        throw new NotFoundError('Category not found', 'NOT_FOUND');
    }

    return removedCount;
};

module.exports = {
    listAllCategories,
    createCategory,
    deleteCategory
};