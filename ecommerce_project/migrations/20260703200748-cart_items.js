'use strict';
const { Op } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('cart_items', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        cart_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'carts',
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
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });

    await queryInterface.addConstraint('cart_items', {
        fields: ['quantity'],
        type: 'check',
        where: {
            quantity: {
                [Op.gt]: 0
            }
        },
        name: 'cart_items_quantity_check'
    });

    await queryInterface.addConstraint('cart_items', {
        fields: ['cart_id', 'product_id'],
        type: 'unique',
        name: 'cart_items_unique'
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('cart_items');
  }
};