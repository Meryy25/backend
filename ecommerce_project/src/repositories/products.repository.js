const { Product, Category, Review } = require('../../models');

const listAllProducts = async (category) => {
    if(!category) {
		return Product.findAll();
    }
	return Product.findAll({
		include: [
			{
				model: Category,
				where: {
					name: category
				},
			}
		]
	});
};

const listOneProduct = async (productId) => {
    return Product.findByPk(productId, {
        include: [
            {
                model: Category
            },
            {
                model: Review
            }
        ]
    });
};

const createProduct = async (productData) => {
    const product = await Product.create(productData);

    await product.setCategories(productData.categoryIds);

    return product;
};

const updateProduct = async (productData, productId) => {
    const [, [updatedProduct]] = await Product.update(productData, {
		where: {
			id: productId
		},
		returning: true
	});

	return updatedProduct;
};

const decrementStock = async (stock, quantity, productId, transaction) => {
    const [, [updatedProduct]] = await Product.update( { stock: stock - quantity }, {
		where: {
			id: productId
		},
		returning: true,
		transaction
	});

	return updatedProduct;
};

const deleteProduct = async (productId) => {
    const deletedCount = await Product.destroy({
		where: {
			id: productId
		}
	});

	return deletedCount
}

module.exports = {
    listAllProducts,
    listOneProduct,
    createProduct,
    updateProduct,
    decrementStock,
    deleteProduct
};