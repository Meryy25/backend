'use strict';

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Review extends Model {

        static associate(models) {
            Review.belongsTo(models.User, {
                foreignKey: 'user_id'
            });

            Review.belongsTo(models.Product, {
                foreignKey: 'product_id'
            });
        }
    }

    Review.init(
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
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        comment: {
            type: DataTypes.TEXT
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
      },

      {
        sequelize,
        modelName: 'Review',
        tableName: 'reviews',
        timestamps: false
      }
    );

    return Review;
};