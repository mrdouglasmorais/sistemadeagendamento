"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _File = require('../models/File'); var _File2 = _interopRequireDefault(_File);

class CollaboratorController{
  async index( req, res){

    const collaborator = await _User2.default.findAll({
      where: { provider: true },
      attributes: ['id', 'name', 'email', 'photo_id'],
      include: [{
        model: _File2.default,
        as: 'photo',
        attributes: ['name', 'path', 'url']
      }]
    })

    return res.json(collaborator)

  }
}

exports. default = new CollaboratorController();