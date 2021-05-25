class NotificationsController{
  async index( req, res ){
    return res.json({ message: 'Okay'})
  }  
}

export default new NotificationsController();