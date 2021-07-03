"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

class User extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        name: _sequelize2.default.STRING,
        email: _sequelize2.default.STRING,
        password: _sequelize2.default.VIRTUAL,
        password_hash: _sequelize2.default.STRING,
        provider: _sequelize2.default.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async user => {
      if (user.password){
        user.password_hash = await _bcryptjs2.default.hash(user.password, 10)
      }
    })

    return this;
  }

  static associate(models){
    this.belongsTo( models.File, { foreignKey: 'photo_id', as: 'photo'})
  }

  checkPassword(password){
    return _bcryptjs2.default.compare( password, this.password_hash)
  }
}

exports. default = User;
