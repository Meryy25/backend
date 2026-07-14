const productRepository = require('../repositories/products.repository');
const categoryRepository = require('../repositories/categories.repository');
const { NotFoundError, BadRequestError } = require('../errors');

const listAllProducts = async (category) => {
    const products = await productRepository.listAllProducts(category);

    if(!products.length) {
        throw new NotFoundError('Products not found', 'PRODUCTS_NOT_FOUND');
    }

    return products;
};

const listOneProduct = async (productId) => {
    const product = await productRepository.listOneProduct(productId);

    if(!product) {
        throw new NotFoundError('Product not found', 'PRODUCT_NOT_FOUND');
    }

    return product;
};

const createProduct = async (productData) => {
    const categoryIds = productData.categoryIds;
    const categories = await categoryRepository.getByIds(categoryIds);

    if(categories.length !== categoryIds.length) {
        throw new BadRequestError('Wrong category Id', 'WRONG_CATEGORY_IDS');
    }

    return productRepository.createProduct(productData);
};

const updateProduct = async (productData, productId) => {
    const updatedProduct = await productRepository.updateProduct(productData, productId);

    if(!updatedProduct) {
        throw new NotFoundError('Product not found', 'PRODUCT_NOT_FOUND');
    }

    return updatedProduct;
};

const deleteProduct = async (productId) => {
    const deleted = await productRepository.deleteProduct(productId);

    if(!deleted) {
        throw new NotFoundError('Product not found', 'PRODUCT_NOT_FOUND');
    }

    return deleted;
};

module.exports = {
    listAllProducts,
    listOneProduct,
    createProduct,
    updateProduct,
    deleteProduct
};