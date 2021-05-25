import User from '../models/User';
import Notifications from '../schema/Notifications';

class NotificationsController{
  async index( req, res ){

    const checkIsCollaborator = await User.findOne({
      where: { id: req.userId, provider: true }, 
    })

    if (!checkIsCollaborator){
      return res.status(401).json({
        erro: 'Notificação disponível apenas para colaboradores'
      })
    }

    const notifications = await Notifications.find({
      user: req.userId
    }).sort({ createdAt: 'desc' }).limit(20)

    return res.json(notifications)
  } 
  
  async update(req, res){
    const notifications = await Notifications.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    )
    return res.json(notifications)
  }
}

export default new NotificationsController();