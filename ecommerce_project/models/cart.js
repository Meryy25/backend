'use strict';

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Cart extends Model {

        static associate(models) {
            Cart.belongsTo(models.User, {
                foreignKey: 'user_id',
            });

            Cart.hasMany(models.CartItem, {
                foreignKey: 'cart_id'
            });
        }
    }

    Cart.init(
      {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
      },
      
      {
        sequelize,
        modelName: 'Cart',
        tableName: 'carts',
        timestamps: false
      }
    );

    return Cart;
};