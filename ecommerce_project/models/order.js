'use strict';

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Order extends Model {

        static associate(models) {
            Order.belongsTo(models.User, {
                foreignKey: 'user_id',
            });

            Order.hasMany(models.OrderItem, {
                foreignKey: 'order_id'
            });
        }
    }

    Order.init(
      {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.TEXT,
            defaultValue: 'pending'
        },
        total: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
      },

      {
        sequelize,
        modelName: 'Order',
        tableName: 'orders',
        timestamps: false
      }
    );

    return Order;
};