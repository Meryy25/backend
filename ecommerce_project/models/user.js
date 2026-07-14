'use strict';

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class User extends Model {

        static associate(models) {
            User.hasOne(models.Cart, {
                foreignKey: 'user_id'
            });

            User.hasMany(models.Order, {
                foreignKey: 'user_id'
            });

            User.hasMany(models.Review, {
                foreignKey: 'user_id'
            });
        }
    }

    User.init(
      {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        role: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: 'customer'
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
      },

      {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: false
      }
    );

    return User;
};