'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChatParticipant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ChatParticipant.init({
    user_id: DataTypes.INTEGER,
    chat_id: DataTypes.INTEGER,
    role: DataTypes.STRING,
    joined_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'ChatParticipant',
    tableName: 'chat_participants',
    underscored: true,
    timestamps: true
  });
  return ChatParticipant;
};