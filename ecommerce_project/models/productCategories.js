'use strict';

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class ProductCategory extends Model {

        static associate(models) {
            //join table e -> can stay empty
        }
    }

    ProductCategory.init(
      {
        product_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        category_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        }
      },

      {
        sequelize,
        modelName: 'ProductCategory',
        tableName: 'product_categories',
        timestamps: false
      }
    );

    return ProductCategory;
};