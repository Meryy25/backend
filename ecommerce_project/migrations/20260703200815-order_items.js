'use strict';
const { Op } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('order_items', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        order_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'orders',
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
            allowNull: false,
        },
        price_at_purchase: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        }
    });

    await queryInterface.addConstraint('order_items', {
        fields: ['quantity'],
        type: 'check',
        where: {
            quantity: {
                [Op.gt]: 0
            }
        },
        name: 'order_items_quantity_check'
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('order_items');
  }
};