const productService = require("../services/products.service");

const listAllProducts = async (req, res) => {
    const products = await productService.listAllProducts(req.query);

    res.json(products);
};

const listOneProduct = async (req, res) => {
    const product = await productService.listOneProduct(req.params);

    res.json(product);
};

const createProduct = async (req, res) => {
    const product = await productService.createProduct(req.body);

    res.status(201).json({ message: 'Product created', product });
};

const updateProduct = async (req, res) => {
    const product = await productService.updateProduct(req.params.id, req.body);

    res.status(200).json({ message: 'Product updated', product });
};

const deleteProduct = async (req, res) => {
    await productService.deleteProduct(req.params.id);

    res.status(204).json();
};

module.exports = {
    listAllProducts,
    listOneProduct,
    createProduct,
    updateProduct,
    deleteProduct
};