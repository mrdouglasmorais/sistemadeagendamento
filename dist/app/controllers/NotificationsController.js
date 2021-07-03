"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _Notifications = require('../schema/Notifications'); var _Notifications2 = _interopRequireDefault(_Notifications);

class NotificationsController{
  async index( req, res ){

    const checkIsCollaborator = await _User2.default.findOne({
      where: { id: req.userId, provider: true }, 
    })

    if (!checkIsCollaborator){
      return res.status(401).json({
        erro: 'Notificação disponível apenas para colaboradores'
      })
    }

    const notifications = await _Notifications2.default.find({
      user: req.userId
    }).sort({ createdAt: 'desc' }).limit(20)

    return res.json(notifications)
  } 
  
  async update(req, res){
    const notifications = await _Notifications2.default.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    )
    return res.json(notifications)
  }
}

exports. default = new NotificationsController();