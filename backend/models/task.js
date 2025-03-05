"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Task extends Model {
        static associate(models) {
            Task.belongsTo(models.User, { foreignKey: "userId" });
        }
    }

    Task.init(
        {
            title: { type: DataTypes.STRING, allowNull: false },
            description: DataTypes.TEXT,
            completed: { type: DataTypes.BOOLEAN, defaultValue: false },
            userId: { type: DataTypes.INTEGER, allowNull: false },
        },
        {
            sequelize,
            modelName: "Task",
        }
    );

    return Task;
};
