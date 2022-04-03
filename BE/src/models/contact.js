'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Contact.belongsTo(models.User, {foreignKey: 'fk_id'})

    }
  }
  Contact.init({
    fk_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    telephone: DataTypes.STRING,
    address: DataTypes.STRING,
    postal_code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Contact',
  });
  return Contact;
};