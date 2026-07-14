'use strict';
const { Op } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: Sequelize.TEXT,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        name: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        role: {
            type: Sequelize.TEXT,
            allowNull: false,
            defaultValue: 'customer'
        },
        created_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.literal("NOW()")
        }
    });

    await queryInterface.addConstraint('users', {
        fields: ['role'],
        type: 'check',
        where: {
            role: {
                [Op.in]: ['customer', 'admin']
            }
        },
        name: 'users_role_check'
    })
  },

  async down (queryInterface, Sequelize) {   
    await queryInterface.dropTable('users');
  }
};