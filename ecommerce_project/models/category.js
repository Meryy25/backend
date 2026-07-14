'use strict';

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Category extends Model {

        static associate(models) {
            Category.belongsToMany(models.Product, {
                through: models.ProductCategory,
                foreignKey: 'category_id',
                otherKey: 'product_id'
            });
        }
    }

    Category.init(
      {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.TEXT
        }
      },

      {
        sequelize,
        modelName: 'Category',
        tableName: 'categories',
        timestamps: false
      }
    );

    return Category;
};