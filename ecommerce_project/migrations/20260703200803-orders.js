'use strict';
const { Op } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
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
            }
        },
        status: {
            type: Sequelize.TEXT,
            defaultValue: 'pending'
        },
        total: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false
        },
        created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('NOW()')
        }
    });

    await queryInterface.addConstraint('orders', {
        fields: ['status', 'total'],
        type: 'check',
        where: {
            status: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'],
            total: {
                [Op.gte]: 0
            }
        },
        name: 'orders_status_total_check'
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('orders');
  }
};