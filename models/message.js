'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Message.belongsTo(models.Chat, {foreignKey: 'chat_id', as: 'chat'});
      Message.belongsTo(models.User, {foreignKey: 'sender_id', as: 'sender'});
    }
  }
  Message.init({
    chat_id: DataTypes.INTEGER,
    sender_id: DataTypes.INTEGER,
    content: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Message',
    tableName: 'messages',
    underscored: true,
    timestamps: true
  });
  return Message;
};