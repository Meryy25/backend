'use strict';

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class CartItem extends Model {

        static associate(models) {
            CartItem.belongsTo(models.Cart, {
                foreignKey: 'cart_id'
            });

            CartItem.belongsTo(models.Product, {
                foreignKey: 'product_id'
            });
        }
    }

    CartItem.init(
      {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cart_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
      },

      {
        sequelize,
        modelName: 'CartItem',
        tableName: 'cart_items',
        timestamps: false
      }
    );

    return CartItem;
};