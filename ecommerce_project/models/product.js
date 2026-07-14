'use strict';

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Product extends Model {

        static associate(models) {
            Product.belongsToMany(models.Category, {
                through: models.ProductCategory,
                foreignKey: 'product_id',
                otherKey: 'category_id'
            });

            Product.hasMany(models.CartItem, {
                foreignKey: 'product_id'
            });

            Product.hasMany(models.OrderItem, {
                foreignKey: 'product_id'
            });

            Product.hasMany(models.Review, {
                foreignKey: 'product_id'
            });
        }
    }

    Product.init(
      {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        stock: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
      },

      {
        sequelize,
        modelName: 'Product',
        tableName: 'products',
        timestamps: false
      }
    );

    return Product;
};