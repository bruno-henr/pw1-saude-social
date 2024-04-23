"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.createTable("medico", {
            id: {
                type: Sequelize.UUID,
                primaryKey: true,
                allowNull: false,
            },

            created_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },

            updated_at: {
                type: Sequelize.DATE,
                allowNull: false,
            },

            nome: {
                type: Sequelize.STRING,
            },

            apelido: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false,
            },

            crm: {
                type: Sequelize.CHAR(13),
                unique: true,
                allowNull: false,
            },

            email: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false,
            },

            hospital: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            senha: {
                type: Sequelize.STRING,
                allowNull: false,
            },

            imagem: {
                type: Sequelize.STRING,
                unique: true,
            },
        });
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.dropTable("medico");
    },
};
