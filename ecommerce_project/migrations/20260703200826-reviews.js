'use strict';
const { Op } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('reviews', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            },
            onDelete: 'CASCADE'
        },
        product_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'products',
                key: 'id'
            },
            onDelete: 'CASCADE'
        },
        rating: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        comment: {
            type: Sequelize.TEXT
        },
        created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('NOW()')
        }
    });

    await queryInterface.addConstraint('reviews', {
        fields: ['user_id', 'product_id'],
        type: 'unique',
        name: 'review_unique'
    })

    await queryInterface.addConstraint('reviews', {
        fields: ['rating'],
        type: 'check',
        where: {
            rating: {
                [Op.between]: [1, 5]
            }
        },
        name: 'reviews_rating_check'
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('reviews');
  }
};