"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

class Appointment extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        date: _sequelize2.default.DATE,
        canceled_at: _sequelize2.default.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models){
    this.belongsTo( models.User, { foreignKey: 'user_id', as: 'user'})
    this.belongsTo( models.User, { foreignKey: 'collaborator_id', as: 'collaborator'})
  }


}

exports. default = Appointment;
