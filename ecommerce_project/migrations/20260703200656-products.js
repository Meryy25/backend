'use strict';
const { Op } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        description: {
            type: Sequelize.TEXT
        },
        price: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        },
        stock: {
            type: Sequelize.INTEGER,
            defaultValue: 0
        },
        created_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal("NOW()")
        }
    })

    await queryInterface.addConstraint('products', {
        fields: ['price', 'stock'],
        type: 'check',
        where: {
            price: {
                [Op.gt]: 0
            },
            stock: {
                [Op.gte]: 0
            }
        },
        name: 'products_price_stock_check'
    })
  },

  async down (queryInterface, Sequelize) {   
    await queryInterface.dropTable('products');
  }
};